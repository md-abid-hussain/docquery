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
import { useCopilotMessagesContext } from "@copilotkit/react-core";
import { TextMessage } from "@copilotkit/runtime-client-gql";
import { useEffect, useState } from "react";

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
  const [isStorageEnabled, setIsStorageEnabled] = useState(() => {
    // Check if there's a saved preference
    const saved = localStorage.getItem("chatStoragePreference");
    return saved ? JSON.parse(saved) : true;
  });
  const { messages, setMessages } = useCopilotMessagesContext();
  const storageKey = `copilot-messages-${owner}-${repo}`;

  // Load messages from localStorage on initial render
  useEffect(() => {
    if (!isStorageEnabled) {
      return;
    }
    const storedMessages = localStorage.getItem(storageKey);
    if (storedMessages) {
      try {
        const parsedMessages = JSON.parse(storedMessages);
        const reconstructedMessages = parsedMessages
          .map((message: TextMessage) => {
            switch (message.type) {
              case "TextMessage":
                return new TextMessage({
                  id: message.id,
                  role: message.role,
                  content: message.content,
                  createdAt: message.createdAt,
                });
              default:
                console.warn(`Unknown message type: ${message.type}`);
                return null;
            }
          })
          .filter(Boolean);

        setMessages(reconstructedMessages);
      } catch (error) {
        console.error("Error loading messages from localStorage:", error);
        localStorage.removeItem(storageKey);
      }
    }
  }, [setMessages, storageKey]);

  // Save messages to localStorage when they change
  useEffect(() => {
    if (!isStorageEnabled) {
      localStorage.removeItem(storageKey);
      return;
    }
    if (messages.length > 0) {
      const serializedMessages = messages.map((message) => ({
        ...message,
        type: message.constructor.name,
      }));
      localStorage.setItem(storageKey, JSON.stringify(serializedMessages));
    }
  }, [messages, owner, repo, storageKey]);

  // Add this effect to save the preference
  useEffect(() => {
    localStorage.setItem(
      "chatStoragePreference",
      JSON.stringify(isStorageEnabled),
    );
  }, [isStorageEnabled]);

  const { state, setState } = useCoAgent<QAAgentState>({
    name: "qa_agent",
    initialState: {
      question: "",
      repository_name: `${owner}/${repo}`,
      branch: repoDetails.default_branch,
      messages: [],
    },
  });

  const avatarUrl = repoDetails?.owner?.avatar_url;

  // Loading state check
  if (!owner || !repo) {
    return (
      <div className="min-h-[calc(100vh-5rem)] flex justify-center items-center">
        <Loader2 className="h-8 w-8 animate-spin text-primary/60" />
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-[calc(100vh-5rem)]">
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

      <div className="flex-1 bg-zinc-50/50">
        <div className="px-2 md:container mx-auto">
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
            Input={(props) => (
              <ChatInput
                {...props}
                isStorageEnabled={isStorageEnabled}
                onStorageToggle={(enabled) => {
                  setIsStorageEnabled(enabled);
                }}
              />
            )}
          />
        </div>
      </div>
    </div>
  );
};
