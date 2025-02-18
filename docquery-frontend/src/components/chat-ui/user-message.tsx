import { UserMessageProps } from "@copilotkit/react-ui";
import { User } from "lucide-react";

export const UserMessageComponent = ({ message }: UserMessageProps) => {
  return (
    <div className="relative flex items-center gap-3 mb-4 flex-row-reverse">
      <div className="rounded-full bg-primary/10 flex items-center justify-center">
        <User size={44} className="p-2" />
      </div>
      <div className="flex flex-col items-end max-w-[70%]">
        <span className="text-sm font-medium text-muted-foreground mb-1">
          {"You"}
        </span>
        <div className="rounded-2xl px-4 py-3 w-full bg-[#3b82f6] text-white">
          {message}
        </div>
      </div>
    </div>
  );
};
