'use client'

import { useState, useEffect } from "react";

interface RepoDetails {
    image_url: string;
}

const useRepoDetails = (owner: string, repo: string) => {
    const [repoDetails, setRepoDetails] = useState<RepoDetails | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchRepoDetails = async () => {
            setLoading(true);
            setError(null);

            try {
                const response = await fetch(`https://api.github.com/repos/${owner}/${repo}`);
                if (!response.ok) {
                    throw new Error(response.status === 404 ? 'Repository not found' : 'Failed to fetch repository info');
                }

                const data = await response.json();
                setRepoDetails({
                    image_url: data.owner.avatar_url,
                });
            } catch (err) {
                setError((err as Error).message);
            } finally {
                setLoading(false);
            }
        };

        fetchRepoDetails();
    }, []); // Empty dependency array to run only once on mount

    return { repoDetails, loading, error };
};

export default useRepoDetails;