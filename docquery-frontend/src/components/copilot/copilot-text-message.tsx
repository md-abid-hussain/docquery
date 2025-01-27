import React from "react";
import { User } from "lucide-react";
import { RenderMessageProps } from "@copilotkit/react-ui";
import { Markdown } from "./markdown";

interface MessageAvatarProps {
    role: string;
    url?: string;
}

interface AssistantProps {
    imageUrl: string;
    repoName: string;
}

interface CopilotTextMessageProps {
    renderMessageProps: RenderMessageProps;
    repoProps: AssistantProps;
}

const MessageAvatar = ({ role, url }: MessageAvatarProps) => {
    if (role === "user") {
        return (
            <div className="h-10 w-10 rounded-full bg-secondary flex items-center justify-center">
                <User className="h-6 w-6 text-secondary-foreground" />
            </div>
        );
    }

    return (
        <div className="rounded-full bg-primary/10 flex items-center justify-center">
            {url ? <img src={url} className="h-10 w-10 rounded-full" alt="assistant" /> : <span className="text-lg font-medium text-primary">C</span>}
        </div>
    );
};

const CopilotTextMessage = ({ renderMessageProps, repoProps }: CopilotTextMessageProps) => {
    const { message, isCurrentMessage, inProgress } = renderMessageProps;
    const { repoName, imageUrl } = repoProps;

    if (!message.isTextMessage()) {
        return null;
    }

    if (message.role === "user") {
        return (
            <div className="group relative flex items-center gap-3 px-4 py-2 animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out opacity-70 flex-row-reverse">
                <MessageAvatar role="user" />
                <div className="flex flex-col items-end max-w-[70%]">
                    <span className="text-sm font-medium text-muted-foreground mb-1">
                        {"You"}
                    </span>
                    <div className="rounded-2xl px-4 py-3 w-full bg-primary text-primary-foreground">
                        {message.content}
                    </div>
                </div>
            </div>
        );
    }

    if (message.role === "assistant") {
        return (
            <div>
                {isCurrentMessage && inProgress && !message.content ? (
                    <p>Loading</p>
                ) : (
                    <div className="group relative flex items-end gap-3 px-4 py-2 animate-in fade-in slide-in-from-bottom-2 duration-300 ease-out opacity-70 flex-row">
                        <MessageAvatar role="assistant" url={imageUrl} />
                        <div className="flex flex-col items-start max-w-[70%]">
                            <span className="text-sm font-medium text-muted-foreground mb-1">
                                {repoName}
                            </span>
                            <div className="rounded-2xl px-4 py-3 w-full bg-secondary">
                                <Markdown content={message.content} />
                            </div>
                        </div>
                    </div>
                )}
            </div>
        );
    }

    return null;
};

export default CopilotTextMessage;