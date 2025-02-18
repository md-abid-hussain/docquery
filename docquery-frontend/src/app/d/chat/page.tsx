import { prisma } from "@/prisma";
import Link from "next/link";
import GitHubRepoCard from "@/components/github-repo-card";
import SignOut from "@/components/sign-out";
import { Button } from "@/components/ui/button";
import { PlusCircle, Loader2 } from "lucide-react";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function ChatPage() {
  const repositories = await prisma.repositories.findMany();

  if (repositories && repositories.length === 0) {
    return (
      <div className="container mx-auto px-4">
        <div className="min-h-[calc(100vh-61px)] flex flex-col items-center justify-center max-w-md mx-auto text-center space-y-6">
          <div className="space-y-2">
            <h1 className="text-3xl font-bold tracking-tight lg:text-4xl">
              No repositories found
            </h1>
            <p className="text-muted-foreground">
              Get started by ingesting your first repository
            </p>
          </div>

          <Link href="/d/ingest">
            <Button className="gap-2">
              <PlusCircle className="h-4 w-4" />
              Ingest a repository
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  if (repositories) {
    return (
      <div className="container mx-auto px-4 py-6">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8 pb-4 border-b">
          <div className="space-y-1">
            <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
              Available Repositories
            </h1>
            <p className="text-muted-foreground">
              Select a repository to start chatting
            </p>
          </div>
          <div className="flex items-center gap-4 self-start sm:self-center">
            <Link href="/d/ingest">
              <Button variant="outline" className="gap-2">
                <PlusCircle className="h-4 w-4" />
                Add Repository
              </Button>
            </Link>
            <SignOut />
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {repositories.map((repo) => (
            <GitHubRepoCard key={repo.id} repoName={repo.name} />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-61px)] flex items-center justify-center">
      <Loader2 className="h-8 w-8 animate-spin text-muted-foreground" />
    </div>
  );
}
