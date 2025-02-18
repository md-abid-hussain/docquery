"use client";

import { useState, useEffect, memo } from "react";
import { AssistantMessageProps } from "@copilotkit/react-ui";
import { Markdown } from "@copilotkit/react-ui";
import { Loader2 } from "lucide-react";
import Image from "next/image";

interface AssistantMessageComponentProps extends AssistantMessageProps {
  name: string;
  url?: string;
}

// Debounce hook to delay value updates
const useDebounce = (value: string | undefined, delay: number) => {
  const [debouncedValue, setDebouncedValue] = useState(value);

  useEffect(() => {
    const timer = setTimeout(() => setDebouncedValue(value), delay);
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
};

const AssistantMessageComponentBase = ({
  name,
  url,
  message,
  isLoading,
}: AssistantMessageComponentProps) => {
  const debouncedMessage = useDebounce(message, 100);

  return (
    <div className="relative flex items-end gap-3 flex-row">
      <div className="rounded-full bg-primary/10 flex items-center justify-center">
        {url ? (
          <Image
            src={url}
            className="h-10 w-10 rounded-full"
            alt="assistant"
            height={40}
            width={40}
          />
        ) : (
          <span className="text-lg font-medium text-primary p-4">C</span>
        )}
      </div>
      <div className="flex flex-col items-start max-w-[70%]">
        <span className="text-sm font-medium text-muted-foreground mb-1">
          {name}
        </span>
        <div className="rounded-2xl px-4 py-3 w-full bg-secondary">
          {debouncedMessage && <Markdown content={debouncedMessage || ""} />}
          {isLoading && <Loader2 size={20} className="animate-spin" />}
        </div>
      </div>
    </div>
  );
};

export const AssistantMessageComponent = memo(AssistantMessageComponentBase);
