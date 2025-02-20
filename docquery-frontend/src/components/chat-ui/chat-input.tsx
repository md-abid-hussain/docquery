import { InputProps } from "@copilotkit/react-ui";
import { Button } from "@/components/ui/button";
import { Send, Database } from "lucide-react";
import { cn } from "@/lib/utils";
import { Switch } from "@/components/ui/switch";

interface ExtendedInputProps extends InputProps {
  isStorageEnabled: boolean;
  onStorageToggle: (enabled: boolean) => void;
}

export function ChatInput({
  inProgress,
  onSend,
  isStorageEnabled,
  onStorageToggle,
}: ExtendedInputProps) {
  const handleSubmit = (value: string) => {
    if (value.trim()) onSend(value);
  };

  return (
    <div
      className={cn("fixed bottom-0 left-0 right-0 bg-white border-t", "py-4")}
    >
      <div className="container mx-auto">
        <div className="flex items-center gap-2 mb-2">
          <Database className="h-4 w-4 text-zinc-500" />
          <span className="text-sm text-zinc-600">Store messages locally</span>
          <Switch
            checked={isStorageEnabled}
            onCheckedChange={onStorageToggle}
            className="ml-auto"
          />
        </div>
        <div className="flex items-center gap-4">
          <input
            type="text"
            placeholder="Ask about the repository..."
            className={cn(
              "flex-1 p-3 rounded-lg",
              "bg-zinc-50 border border-zinc-200",
              "text-sm text-zinc-900 placeholder:text-zinc-500",
              "focus:outline-none focus:ring-2 focus:ring-primary/20",
              "disabled:opacity-50 disabled:cursor-not-allowed",
            )}
            disabled={inProgress}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                handleSubmit(e.currentTarget.value);
                e.currentTarget.value = "";
              }
            }}
          />
          <Button
            size="icon"
            disabled={inProgress}
            onClick={(e) => {
              const input =
                e.currentTarget.parentElement?.querySelector("input");
              if (input) {
                handleSubmit(input.value);
                input.value = "";
              }
            }}
            className={cn(
              "rounded-full h-11 w-11",
              "bg-primary hover:bg-primary/90",
              "disabled:opacity-50",
            )}
          >
            <Send className="h-5 w-5 text-white" />
          </Button>
        </div>
      </div>
    </div>
  );
}
