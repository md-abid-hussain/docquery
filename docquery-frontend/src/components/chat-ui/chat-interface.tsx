"use client";

import Image from "next/image";
import { QAAgentState, RawGithubRepoDetails } from "@/lib/types";
import { useCoAgent } from "@copilotkit/react-core";
import { CopilotChat } from "@copilotkit/react-ui";
import { Loader2, ArrowLeft, MessageSquare } from "lucide-react";
import { AssistantMessageComponent } from "./assistant-message";
import { UserMessageComponent } from "./user-message";
import { cn } from "@/lib/utils";
import { ChatInput } from "./chat-input";

interface ChatInterfaceProps {
  owner: string;
  repo: string;
  repoDetails: RawGithubRepoDetails;
}

export const ChatInterface = ({
  owner,
  repo,
  repoDetails,
}: ChatInterfaceProps) => {
  const { state, setState } = useCoAgent<QAAgentState>({
    name: "qa_agent",
    initialState: {
      question: "",
      repository_name: `${owner}/${repo}`,
      messages: [],
    },
  });

  // Loading state check
  if (!owner || !repo) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary/60" />
      </div>
    );
  }

  const avatarUrl = repoDetails?.owner?.avatar_url;

  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)]">
      {/* Chat Header */}
      <div className="sticky top-16 z-10 bg-white border-b shadow-sm">
        <div className="container mx-auto">
          <div className="flex items-center gap-4 py-4">
            <button
              onClick={() => window.history.back()}
              className="p-2 hover:bg-zinc-100 rounded-full transition-colors"
              aria-label="Go back"
            >
              <ArrowLeft className="h-5 w-5 text-zinc-600" />
            </button>

            <div className="flex items-center gap-3">
              {avatarUrl ? (
                <Image
                  src={avatarUrl}
                  alt={`${owner}/${repo}`}
                  width={40}
                  height={40}
                  className="rounded-full ring-2 ring-zinc-100"
                  priority
                />
              ) : (
                <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
              )}

              <div className="flex flex-col">
                <h1 className="font-semibold leading-none">{repo}</h1>
                <p className="text-sm text-zinc-500 mt-1">{owner}</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Chat Content */}
      <div className="flex-1 bg-zinc-50/50">
        <div className="container mx-auto">
          <CopilotChat
            labels={{
              title: "Repository Assistant",
              initial: `Hi! 👋 I'm here to help you with the ${repo} repository. What would you like to know?`,
            }}
            className={cn(
              "min-h-full rounded-lg bg-white shadow-sm",
              "border border-zinc-200 mt-4",
            )}
            onSubmitMessage={(message) => {
              setState({
                ...state,
                question: message.trim(),
              });
            }}
            UserMessage={UserMessageComponent}
            AssistantMessage={(props) => (
              <AssistantMessageComponent
                {...props}
                name={repo}
                url={avatarUrl}
              />
            )}
            Input={ChatInput}
          />
        </div>
      </div>
    </div>
  );
};
