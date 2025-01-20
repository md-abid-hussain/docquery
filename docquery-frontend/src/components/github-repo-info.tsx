'use client'

import React, { useEffect, useState } from 'react';
import RepoForm from '@/components/repo-form';
import RepoDetails from '@/components/repo-details';
import { RepoInfo, RawGithubRepoDetails, IngestionAgentState } from '@/lib/types';
import { useCoAgent, useCopilotReadable } from '@copilotkit/react-core';
import { IngestionProgress } from '@/components/ingestion-progess';
import { Loader2, XCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useToast } from '@/hooks/use-toast';
import { ToastAction } from '@/components/ui/toast'
import Link from 'next/link';

export const GitHubRepoInfo = () => {
    const [repoInfo, setRepoInfo] = useState<RepoInfo | null>(null);
    const [repoFiles, setRepoFiles] = useState<string[]>([]);
    const [input, setInput] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());
    const { state, setState, run } = useCoAgent<IngestionAgentState>({
        name: "ingestion_agent",
        initialState: {
            repo: null,
            error: null,
            total_files: 0,
            files_ingested: 0,
            status: "PENDING"
        },

    });

    useCopilotReadable({
        description:"use ingestion agent for this ",
        value:"ingestion_agent"
    })

    const { toast } = useToast()

    useEffect(() => {
        if (repoInfo && selectedFiles.size) {
            setState({
                repo: {
                    name: repoInfo.name,
                    full_name: repoInfo.full_name,
                    files_path: selectedFiles.size ? Array.from(selectedFiles) : repoFiles,
                    repository_url: repoInfo.html_url
                },
                error: null,
                status: "PENDING",
                total_files: selectedFiles.size,
                files_ingested: 0
            });
        }
    }, [selectedFiles, repoInfo]);

    const fetchRepoInfo = async (owner: string, repo: string) => {
        setState({
            repo: null,
            error: null,
            status: "PENDING",
            total_files: 0,
            files_ingested: 0
        })
        setRepoInfo(null)
        setSelectedFiles(new Set());
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
                description: data.description,
                full_name: data.full_name,
                homepage: data.homepage,
                image_url: data.owner.avatar_url,
                stargazers_count: data.stargazers_count,
                topics: data.topics,
                html_url: data.html_url
            });
            fetchRepoFiles(owner, repo);
        } catch (err) {
            setError((err as Error).message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        if(state.status == "COMPLETED" && repoInfo?.full_name){

            const [owner, repo] = repoInfo.full_name.split('/')

            toast({
                title:`Chat to ${repo}?`,
                description:'Ingestion success',
                action:(
                    <Link href={`/d/chat/owner/${owner}/repo/${repo}`}><ToastAction altText='navigate to chat'>Chat</ToastAction></Link>
                )
            })
        }
    },[state.status])

    const fetchRepoFiles = async (owner: string, repo: string) => {
        try {
            const response = await fetch(`https://api.github.com/repos/${owner}/${repo}/git/trees/main?recursive=1000`);
            if (!response.ok) {
                throw new Error('Failed to fetch repository files');
            }

            const data = await response.json() as { tree: { path: string }[] };
            const filePaths = data.tree
                .filter(file => !file.path.startsWith('.') && /\.mdx?$/.test(file.path) && !/\/\./.test(file.path))
                .map(file => file.path);

            setRepoFiles(filePaths);
        } catch (err) {
            setError((err as Error).message);
        }
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        const urlPattern = /https:\/\/github\.com\/([^\/]+)\/([^\/]+)/;
        const match = input.match(urlPattern);
        if (match) {
            fetchRepoInfo(match[1], match[2]);
        } else {
            const [owner, repo] = input.split('/');
            fetchRepoInfo(owner, repo);
        }
    };

    const runIngestion = () => {
        setState({ ...state, status: "RUNNING", files_ingested: 0 });
        run();
    }

    return (
        <div className='p-4 max-w-4xl mx-auto'>
            <RepoForm input={input} setInput={setInput} handleSubmit={handleSubmit} loading={loading} />
            {loading && <div className='rounded-md flex gap-4 items-center mb-4'>
                <p>Fetching repository info</p><Loader2 className='animate-spin' />
            </div>}
            {error && <div className='flex gap-1 items-center mb-2'> <XCircle className='text-red-400' /> <p className='text-red-500'>An Error occured: {error}</p></div>}
            {repoInfo && (
                <RepoDetails
                    repoInfo={repoInfo}
                    repoFiles={repoFiles}
                    selectedFiles={selectedFiles}
                    setSelectedFiles={setSelectedFiles}
                />
            )}
            <IngestionProgress status={state.status} total_files={state.total_files} files_ingested={state.files_ingested} error={state.error} />
            <Button className='w-full mt-2' onClick={() => runIngestion()} disabled={selectedFiles.size === 0}>
                {selectedFiles.size ? `Start Ingesting ${selectedFiles.size} files` : "Select file to Ingest"}
            </Button>
        </div>
    );
};