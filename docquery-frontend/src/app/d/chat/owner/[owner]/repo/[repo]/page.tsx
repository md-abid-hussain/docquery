"use client";

import { useParams } from "next/navigation";
import { CopilotKit } from "@copilotkit/react-core";
import { RawGithubRepoDetails } from "@/lib/types";
import { Loader2 } from "lucide-react";
import useRepoDetails from "@/hooks/useRepoDetails";
import { useSession } from "next-auth/react";
import { ChatInterface } from "@/components/chat-ui/chat-interface";
import { cn } from "@/lib/utils";

const ChatRepoPage = () => {
  const { owner, repo } = useParams();
  const { repoDetails, loading: isLoadingRepo } = useRepoDetails(
    owner as string,
    repo as string,
  );
  const { data: session, status: sessionStatus } = useSession();

  // Handle initial loading states
  if (!owner || !repo || sessionStatus === "loading" || isLoadingRepo) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex justify-center items-center">
        <Loader2 className="h-12 w-12 animate-spin text-primary/60" />
      </div>
    );
  }

  return (
    <div className={cn("min-h-[calc(100vh-5rem)]")}>
      <CopilotKit
        runtimeUrl="/api/copilotkit"
        showDevConsole={false}
        agent="qa_agent"
        threadId={`${owner}/${repo}/${session?.user?.id}`}
      >
        <ChatInterface
          owner={owner as string}
          repo={repo as string}
          repoDetails={repoDetails as RawGithubRepoDetails}
        />
      </CopilotKit>
    </div>
  );
};

export default ChatRepoPage;
