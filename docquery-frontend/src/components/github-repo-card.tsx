'use client'

import React, { useEffect, useState } from 'react';
import { RepoInfo, RawGithubRepoDetails } from '@/lib/types';
import { Loader2, Star, XCircle } from 'lucide-react';
import Link from 'next/link';
import { Card } from './ui/card';

interface GitHubRepoCardProps {
    repoName: string;
}

const GitHubRepoCard: React.FC<GitHubRepoCardProps> = ({ repoName }) => {
    const [repoInfo, setRepoInfo] = useState<RepoInfo | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [owner, repo] = repoName.split('/');


    const formatStarCount = (count: number) => {
        if (count >= 1000) {
            return `${(count / 1000).toFixed(1)}k`;
        }
        return count;
    };

    useEffect(() => {
        const fetchRepoInfo = async () => {
            setLoading(true);
            setError(null);

            try {
                
                const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
                if (!response.ok) {
                    throw new Error(response.status === 404 ? 'Repository not found' : 'Failed to fetch repository info');
                }

                const data = await response.json() as RawGithubRepoDetails;

                setRepoInfo({
                    name: data.name,
                    description: data.description ? data.description.length > 150 ? data.description.substring(0, 147) + '...' : data.description : "",
                    full_name: data.full_name,
                    homepage: data.homepage,
                    image_url: data.owner.avatar_url,
                    stargazers_count: data.stargazers_count,
                    topics: data.topics.slice(0, 5),
                    html_url: data.html_url
                });
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchRepoInfo();
    }, [repoName]);

    return (
        <div >
            {loading && (
                <div className='rounded-md flex gap-4 items-center mb-4'>
                    <p>Fetching repository info</p><Loader2 className='animate-spin' />
                </div>
            )}
            {error && (
                <div className='flex gap-1 items-center mb-2'>
                    <XCircle className='text-red-400' />
                    <p className='text-red-500'>An Error occurred: {error}</p>
                </div>
            )}
            {repoInfo && (
                <Link href={`/d/chat/owner/${owner}/repo/${repo}`}><Card className='py-4 px-4 w-full max-w-lg hover:shadow-lg hover:cursor-pointer flex gap-4 items-center'>
                    <img
                        src={repoInfo.image_url}
                        alt={`${repoInfo.name} repository`}
                        className="h-16 w-16 rounded-full object-cover"
                    />
                    <div>
                        <p className='text-sm'>
                            {repoInfo.full_name.split('/')[0]}/
                        </p>
                        <h2 className='text-lg font-bold -mt-2'>{repoInfo.name}</h2>
                        <div className="flex items-center gap-1">
                            <Star className="h-4 w-4" />
                            <span>{formatStarCount(repoInfo.stargazers_count)}</span>
                        </div>
                    </div>
                </Card>
                </Link>
            )}
        </div>
    );
};

export default GitHubRepoCard;