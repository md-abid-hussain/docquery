import { prisma } from "@/lib/prisma"
import Link from "next/link"
import GitHubRepoCard from "@/components/github-repo-card"

export default async function ChatPage(){

    const repositories = await prisma.repositories.findMany()

    if(repositories && repositories.length == 0){
        return <div className="p-4 min-h-[calc(100vh-61px)] flex flex-col items-center justify-center">
            <h1 className="text-3xl font-semibold lg:text-4xl">No repositories found</h1>
            
            <Link className="p-2 rounded-md bg-zinc-800 text-white block w-full max-w-72 mt-4 text-center" href="/d/ingest">Ingest a repository</Link>
        </div>
    }

    if (repositories) {
        return (
            <div className="p-4 min-h-[calc(100vh-90px)]">
                <h1 className="text-2xl mb-8">Available repository to chat</h1>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {repositories.map((repo) => (
                    <GitHubRepoCard key={repo.id} repoName={repo.name} />
                ))}
                </div>
            </div>
        )
    }

    return <div>Loading</div>
}