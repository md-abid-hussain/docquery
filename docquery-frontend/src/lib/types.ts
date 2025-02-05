
export type RepoInfo = {
    name: string;
    description: string;
    full_name: string;
    homepage?: string;
    image_url: string;
    stargazers_count: number;
    topics: string[];
    html_url: string;
}

export type RawGithubRepoDetails = {
    name: string;
    description: string;
    full_name: string;
    homepage?: string;
    stargazers_count: number;
    topics: string[];
    html_url: string;
    owner: {
        avatar_url: string
    }
}

export type RepositoryDetails = {
    name:string;
    full_name:string;
    files_path:Array<string>;
    repository_url:string;
}

export type IngestionAgentState = {
    repo: RepositoryDetails|null ;
    error: string | null;
    status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";
    total_files:number;
    files_ingested:number;
}

export type QAAgentState = {
    repository_name:string;
    question: string;
}