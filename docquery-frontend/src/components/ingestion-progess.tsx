import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle2, Loader2, Clock, XCircle } from "lucide-react";
import { cn } from "@/lib/utils";
import { JSX } from "react";

type Status = "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";

interface IngestionProgressProps {
  status: Status;
  total_files: number;
  files_ingested: number;
  error: string | null;
}

const statusConfig: Record<
  Status,
  {
    icon: JSX.Element;
    message: string;
    color: string;
  }
> = {
  PENDING: {
    icon: <Clock className="h-5 w-5 text-yellow-500 animate-pulse" />,
    message: "Waiting for ingestion...",
    color: "bg-primary",
  },
  RUNNING: {
    icon: <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />,
    message: "Ingestion is running...",
    color: "bg-primary",
  },
  COMPLETED: {
    icon: <CheckCircle2 className="h-5 w-5 text-green-500" />,
    message: "Ingestion completed successfully",
    color: "bg-green-500",
  },
  FAILED: {
    icon: <XCircle className="h-5 w-5 text-red-500" />,
    message: "Ingestion failed",
    color: "bg-red-500",
  },
};

export function IngestionProgress({
  status,
  total_files,
  files_ingested,
  error,
}: IngestionProgressProps) {
  if (!total_files) return null;

  const config = statusConfig[status];
  const progressValue = (files_ingested / total_files) * 100;

  return (
    <Card className="w-full transition-all duration-200 hover:shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="flex items-center justify-between text-lg">
          <span className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-muted-foreground" />
            File Ingestion Progress
          </span>
          {config.icon}
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <p
              className={cn(
                "text-sm font-medium",
                status === "FAILED" ? "text-red-500" : "text-muted-foreground",
              )}
            >
              {error || config.message}
            </p>
            <span className="text-sm font-medium text-muted-foreground">
              {Math.round(progressValue)}%
            </span>
          </div>

          <Progress
            value={progressValue}
            className={cn(
              "h-2 transition-all duration-500",
              status === "FAILED" && "bg-red-100",
              status === "COMPLETED" && "bg-green-100",
            )}
            indicatorClassName={cn("transition-all duration-500", config.color)}
          />
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-muted-foreground">
              Total Files
            </p>
            <p
              className={cn(
                "text-2xl font-bold",
                status === "FAILED" ? "text-red-600" : "text-foreground",
              )}
            >
              {total_files}
            </p>
          </div>
          <div className="space-y-1.5">
            <p className="text-sm font-medium text-muted-foreground">
              Files Ingested
            </p>
            <p
              className={cn(
                "text-2xl font-bold",
                status === "COMPLETED" ? "text-green-600" : "text-foreground",
              )}
            >
              {files_ingested}
            </p>
          </div>
        </div>

        {status === "FAILED" && error && (
          <div
            className={cn(
              "p-3 rounded-md",
              "bg-red-50 border border-red-200",
              "animate-in fade-in duration-300",
            )}
          >
            <p className="text-sm text-red-600 leading-relaxed">{error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
