"use client";

import React, { useEffect, useState } from "react";
import { RawGithubRepoDetails } from "@/lib/types";
import { Star, ExternalLink, AlertCircle } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Skeleton } from "./ui/skeleton";
import { cn } from "@/lib/utils";

interface GitHubRepoCardProps {
  repoName: string;
  className?: string;
}

const GitHubRepoCard: React.FC<GitHubRepoCardProps> = ({
  repoName,
  className,
}) => {
  const [repoInfo, setRepoInfo] = useState<RawGithubRepoDetails | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [owner, repo] = repoName.split("/");

  const formatNumber = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}m`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  useEffect(() => {
    const fetchRepoInfo = async () => {
      if (!owner || !repo) {
        setError("Invalid repository name");
        return;
      }

      setLoading(true);
      setError(null);

      try {
        const response = await fetch(`/api/github?owner=${owner}&repo=${repo}`);

        if (!response.ok) {
          const error = await response.json();
          throw new Error(
            error.message ||
              (response.status === 404
                ? "Repository not found"
                : response.status === 403
                  ? "API rate limit exceeded"
                  : "Failed to fetch repository info"),
          );
        }

        const data = await response.json();
        setRepoInfo(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    fetchRepoInfo();
  }, [owner, repo]);

  if (loading) {
    return (
      <Card className={cn("p-4", className)}>
        <div className="flex gap-4 items-center">
          <Skeleton className="h-16 w-16 rounded-full" />
          <div className="space-y-2 flex-1">
            <Skeleton className="h-4 w-[200px]" />
            <Skeleton className="h-4 w-[150px]" />
            <Skeleton className="h-4 w-[100px]" />
          </div>
        </div>
      </Card>
    );
  }

  if (error) {
    return (
      <Card
        className={cn("p-4 border-destructive/50 bg-destructive/10", className)}
      >
        <div className="flex items-center gap-2 text-destructive">
          <AlertCircle className="h-5 w-5" />
          <p className="font-medium">{error}</p>
        </div>
      </Card>
    );
  }

  if (!repoInfo) return null;

  return (
    <Card
      className={cn(
        "p-4 group relative",
        "transition-all duration-200",
        "hover:shadow-md hover:border-primary/20",
        className,
      )}
    >
      {/* Main card link */}
      <Link
        href={`/d/chat/owner/${owner}/repo/${repo}`}
        className="absolute inset-0 z-10"
        aria-label={`Chat about ${repoInfo.full_name}`}
      />

      {/* Card content */}
      <div className="flex gap-4 items-start h-full relative">
        <Image
          src={repoInfo.owner.avatar_url}
          alt={`${repoInfo.name} repository`}
          width={64}
          height={64}
          className="rounded-full ring-2 ring-border flex-shrink-0"
          priority
        />

        <div className="flex-1 min-w-0 flex flex-col">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-sm text-muted-foreground">
                {repoInfo.full_name.split("/")[0]}
              </p>
              <h2 className="text-xl font-semibold truncate">
                {repoInfo.name}
              </h2>
            </div>

            {/* GitHub link */}
            <div
              onClick={(e) => {
                e.preventDefault();
                window.open(repoInfo.html_url, "_blank", "noopener,noreferrer");
              }}
              className="p-2 hover:bg-accent rounded-full cursor-pointer relative z-20"
              role="button"
              aria-label="Open in GitHub"
            >
              <ExternalLink className="h-5 w-5" />
            </div>
          </div>

          <p className="text-sm text-muted-foreground mt-1 line-clamp-2 flex-grow">
            {repoInfo.description || "No description available"}
          </p>

          <div className="flex flex-wrap gap-2 mt-auto pt-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5" />
              {formatNumber(repoInfo.stargazers_count)}
            </Badge>

            {repoInfo.topics.slice(0, 3).map((topic) => (
              <Badge key={topic} variant="outline">
                {topic}
              </Badge>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};

export default GitHubRepoCard;
