import React from 'react';
import { GithubCard } from '@/components/GithubCard';
import { GitHubRepoFiles } from '@/components/GithubRepoFiles';
import { RepoInfo } from '@/lib/types';

interface RepoDetailsProps {
    repoInfo: RepoInfo;
    repoFiles: string[];
    selectedFiles: Set<string>;
    setSelectedFiles: (files: React.SetStateAction<Set<string>>) => void;
}

const RepoDetails: React.FC<RepoDetailsProps> = ({ repoInfo, repoFiles, selectedFiles, setSelectedFiles }) => (
    <div className='flex flex-col gap-2'>
        <GithubCard data={{ ...repoInfo }} />
        <GitHubRepoFiles paths={repoFiles} selectedFiles={selectedFiles} setSelectedFiles={setSelectedFiles} />
    </div>
);

export default RepoDetails;