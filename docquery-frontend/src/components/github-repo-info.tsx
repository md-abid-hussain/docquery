"use client";

import React, { useEffect, useState } from "react";
import RepoForm from "@/components/repo-form";
import RepoDetails from "@/components/repo-details";
import {
  RepoInfo,
  RawGithubRepoDetails,
  IngestionAgentState,
} from "@/lib/types";
import { useCoAgent } from "@copilotkit/react-core";
import { IngestionProgress } from "@/components/ingestion-progess";
import {
  ArrowRight,
  Loader2,
  XCircle,
  GitBranch,
  RefreshCw,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { ToastAction } from "@/components/ui/toast";
import Link from "next/link";
import { Card } from "./ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export const GitHubRepoInfo = () => {
  const [repoInfo, setRepoInfo] = useState<RepoInfo | null>(null);
  const [repoFiles, setRepoFiles] = useState<string[]>([]);
  const [input, setInput] = useState("");
  const [branchInput, setBranchInput] = useState("main");
  const [loading, setLoading] = useState(false);
  const [loadingFiles, setLoadingFiles] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

  const { state, setState, run } = useCoAgent<IngestionAgentState>({
    name: "ingestion_agent",
    initialState: {
      repo: null,
      error: null,
      total_files: 0,
      files_ingested: 0,
      status: "PENDING",
    },
  });

  const { toast } = useToast();

  useEffect(() => {
    if (repoInfo && selectedFiles.size) {
      setState({
        repo: {
          name: repoInfo.name,
          full_name: repoInfo.full_name,
          files_path: selectedFiles.size
            ? Array.from(selectedFiles)
            : repoFiles,
          repository_url: repoInfo.html_url,
          branch: branchInput,
        },
        error: null,
        status: "PENDING",
        total_files: selectedFiles.size,
        files_ingested: 0,
      });
    }
  }, [selectedFiles, repoInfo, branchInput]);

  const fetchRepoInfo = async (owner: string, repo: string) => {
    setState({
      repo: null,
      error: null,
      status: "PENDING",
      total_files: 0,
      files_ingested: 0,
    });
    setRepoInfo(null);
    setSelectedFiles(new Set());
    setLoading(true);
    setError(null);
    setBranchInput("main"); // Reset to default branch

    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}`,
      );
      if (!response.ok) {
        throw new Error(
          response.status === 404
            ? "Repository not found"
            : "Failed to fetch repository info",
        );
      }

      const data = (await response.json()) as RawGithubRepoDetails;
      setRepoInfo({
        name: data.name,
        description: data.description,
        full_name: data.full_name,
        homepage: data.homepage,
        image_url: data.owner.avatar_url,
        stargazers_count: data.stargazers_count,
        topics: data.topics,
        html_url: data.html_url,
      });

      // Fetch files from the default branch
      fetchRepoFiles(owner, repo, "main");
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (state.status === "COMPLETED" && repoInfo?.full_name) {
      const [owner, repo] = repoInfo.full_name.split("/");

      toast({
        title: "Repository Ingested Successfully!",
        description: `You can now start chatting with ${repo}`,
        action: (
          <ToastAction altText="Navigate to chat">
            <Link
              href={`/d/chat/owner/${owner}/repo/${repo}`}
              className="flex items-center gap-2"
            >
              Start Chat
              <ArrowRight className="h-4 w-4" />
            </Link>
          </ToastAction>
        ),
      });
    }
  }, [state.status]);

  const fetchRepoFiles = async (
    owner: string,
    repo: string,
    branch: string,
  ) => {
    setRepoFiles([]);
    setSelectedFiles(new Set());
    setLoadingFiles(true);
    setError(null);

    try {
      const response = await fetch(
        `https://api.github.com/repos/${owner}/${repo}/git/trees/${branch}?recursive=1000`,
      );
      if (!response.ok) {
        throw new Error(
          `Failed to fetch repository files from branch '${branch}'`,
        );
      }

      const data = (await response.json()) as { tree: { path: string }[] };
      const filePaths = data.tree
        .filter(
          (file) =>
            !file.path.startsWith(".") &&
            /\.mdx?$/.test(file.path) &&
            !/\/\./.test(file.path),
        )
        .map((file) => file.path);

      setRepoFiles(filePaths);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoadingFiles(false);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const urlPattern = /https:\/\/github\.com\/([^\/]+)\/([^\/]+)/;
    const match = input.match(urlPattern);
    if (match) {
      fetchRepoInfo(match[1], match[2]);
    } else {
      const [owner, repo] = input.split("/");
      fetchRepoInfo(owner, repo);
    }
  };

  const handleBranchSubmit = () => {
    if (repoInfo) {
      const [owner, repo] = repoInfo.full_name.split("/");
      fetchRepoFiles(owner, repo, branchInput);
    }
  };

  const runIngestion = () => {
    setState({
      ...state,
      status: "RUNNING",
      files_ingested: 0,
      repo: {
        ...state.repo!,
        branch: branchInput,
      },
    });
    run();
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex flex-col items-center justify-center p-4">
      <Card className="w-full max-w-4xl p-6 space-y-6">
        <div className="space-y-2 text-center">
          <h1 className="text-2xl font-bold tracking-tight">Add Repository</h1>
          <p className="text-muted-foreground">
            Enter a GitHub repository URL or owner/name to start ingesting
            documentation
          </p>
        </div>

        <RepoForm
          input={input}
          setInput={setInput}
          handleSubmit={handleSubmit}
          loading={loading}
        />

        {/* Loading State */}
        {loading && (
          <div className="flex items-center justify-center gap-2 py-4">
            <Loader2 className="h-5 w-5 animate-spin text-primary" />
            <p className="text-sm text-muted-foreground">
              Fetching repository info...
            </p>
          </div>
        )}

        {/* Error State */}
        {error && (
          <div className="flex items-center gap-2 p-4 rounded-lg bg-destructive/10 text-destructive">
            <XCircle className="h-5 w-5 flex-shrink-0" />
            <p className="text-sm font-medium">{error}</p>
          </div>
        )}

        {/* Repository Details */}
        {repoInfo && (
          <div className="space-y-6">
            {/* Branch Input */}
            <div className="space-y-4">
              <div className="flex items-center gap-2">
                <GitBranch className="h-4 w-4 text-muted-foreground" />
                <Label htmlFor="branch-input" className="text-sm font-medium">
                  Branch Name
                </Label>
              </div>

              <div className="flex gap-2">
                <Input
                  id="branch-input"
                  placeholder="Enter branch name (e.g., main, develop, feature/docs)"
                  value={branchInput}
                  onChange={(e) => setBranchInput(e.target.value)}
                  className="flex-1"
                />
                <Button
                  onClick={handleBranchSubmit}
                  disabled={!branchInput || loadingFiles}
                  variant="outline"
                >
                  {loadingFiles ? (
                    <RefreshCw className="h-4 w-4 animate-spin" />
                  ) : (
                    "Load Files"
                  )}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">
                Enter the exact branch name containing the documentation files
                you want to ingest.
              </p>
            </div>

            {loadingFiles && (
              <div className="flex items-center justify-center gap-2 py-4">
                <Loader2 className="h-5 w-5 animate-spin text-primary" />
                <p className="text-sm text-muted-foreground">
                  Loading files from branch &#39;{branchInput}&#39;...
                </p>
              </div>
            )}

            <RepoDetails
              repoInfo={repoInfo}
              repoFiles={repoFiles}
              selectedFiles={selectedFiles}
              setSelectedFiles={setSelectedFiles}
            />

            <div className="space-y-4">
              <IngestionProgress
                status={state.status}
                total_files={state.total_files}
                files_ingested={state.files_ingested}
                error={state.error}
              />

              <div className="flex flex-col gap-2">
                <div className="text-sm">
                  <span className="font-medium">Current Branch: </span>
                  <span className="font-mono bg-slate-100 px-1.5 py-0.5 rounded text-xs">
                    {branchInput}
                  </span>
                </div>

                <Button
                  className="w-full"
                  size="lg"
                  onClick={() => runIngestion()}
                  disabled={selectedFiles.size === 0}
                >
                  {selectedFiles.size ? (
                    <span className="flex items-center gap-2">
                      Start Ingesting {selectedFiles.size} files
                      <ArrowRight className="h-4 w-4" />
                    </span>
                  ) : (
                    "Select files to ingest"
                  )}
                </Button>
              </div>
            </div>
          </div>
        )}
      </Card>
    </div>
  );
};
