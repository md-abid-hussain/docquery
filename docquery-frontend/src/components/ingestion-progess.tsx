import { Progress } from "@/components/ui/progress";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { FileText, CheckCircle2, Loader2, Clock, XCircle } from "lucide-react";

type IngestionProgressProps = {
    status: "PENDING" | "RUNNING" | "COMPLETED" | "FAILED";
    total_files: number;
    files_ingested: number;
    error: string | null;
}

export function IngestionProgress({ status, total_files, files_ingested, error }: IngestionProgressProps) {
  
    if(!total_files) {
        return null
    }
    
    const getStatusIcon = () => {
    switch (status) {
      case "PENDING":
        return <Clock className="h-5 w-5 text-yellow-500 animate-pulse" />;
      case "RUNNING":
        return <Loader2 className="h-5 w-5 text-blue-500 animate-spin" />;
      case "COMPLETED":
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case "FAILED":
        return <XCircle className="h-5 w-5 text-red-500" />;
    }
  };

  const getStatusMessage = () => {
    switch (status) {
      case "PENDING":
        return "Waiting for ingestion...";
      case "RUNNING":
        return "Ingestion is running...";
      case "COMPLETED":
        return "Ingestion completed successfully";
      case "FAILED":
        return error || "Ingestion failed";
    }
  };

  const progressValue = total_files !== 0 
    ? (files_ingested / total_files) * 100 
    : 0;

  const getProgressColor = () => {
    switch (status) {
      case "FAILED":
        return "bg-red-500";
      case "COMPLETED":
        return "bg-green-500";
      default:
        return "bg-primary";
    }
  };

  return (
    <Card className="w-full mt-2 hover:shadow-xl">
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="flex items-center gap-2">
            <FileText className="h-5 w-5 text-gray-500" />
            File Ingestion Progress
          </span>
          {getStatusIcon()}
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <p className={`text-sm font-medium ${status === "FAILED" ? "text-red-500" : "text-gray-500"}`}>
            {getStatusMessage()}
          </p>
          <Progress 
            value={progressValue} 
            className="h-2"
            indicatorClassName={getProgressColor()}
          />
        </div>
        
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Total Files</p>
            <p className="text-2xl font-bold">{total_files}</p>
          </div>
          <div className="space-y-1">
            <p className="text-sm font-medium text-gray-500">Files Ingested</p>
            <p className="text-2xl font-bold">{files_ingested}</p>
          </div>
        </div>

        {status === "FAILED" && error && (
          <div className="mt-4 p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </CardContent>
    </Card>
  );
}