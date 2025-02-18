import React from "react";
import { GithubCard } from "@/components/github-card";
import { GitHubRepoFiles } from "@/components/github-repo-files";
import { RepoInfo } from "@/lib/types";

interface RepoDetailsProps {
  repoInfo: RepoInfo;
  repoFiles: string[];
  selectedFiles: Set<string>;
  setSelectedFiles: (files: React.SetStateAction<Set<string>>) => void;
}

const RepoDetails: React.FC<RepoDetailsProps> = ({
  repoInfo,
  repoFiles,
  selectedFiles,
  setSelectedFiles,
}) => (
  <div className="space-y-6">
    <GithubCard data={repoInfo} />
    <GitHubRepoFiles
      paths={repoFiles}
      selectedFiles={selectedFiles}
      setSelectedFiles={setSelectedFiles}
    />
  </div>
);

export default RepoDetails;
