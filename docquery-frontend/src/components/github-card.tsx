import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Link as LinkIcon, Github } from "lucide-react";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface GithubCardProps {
  data: {
    name: string;
    description: string;
    full_name: string;
    homepage?: string;
    image_url: string;
    stargazers_count: number;
    topics: string[];
  };
  className?: string;
}

export function GithubCard({ data, className }: GithubCardProps) {
  const formatStarCount = (count: number) => {
    if (count >= 1000000) return `${(count / 1000000).toFixed(1)}m`;
    if (count >= 1000) return `${(count / 1000).toFixed(1)}k`;
    return count.toString();
  };

  return (
    <Card
      className={cn(
        "w-full transition-all duration-200",
        "hover:shadow-md hover:border-primary/20",
        "bg-card/50 backdrop-blur-sm",
        className,
      )}
    >
      <CardHeader className="flex flex-row items-center gap-4 pb-6">
        <div className="relative h-16 w-16 flex-shrink-0">
          <Image
            src={data.image_url}
            alt={`${data.name} repository`}
            className="rounded-lg object-cover ring-2 ring-border"
            fill
            priority
          />
        </div>
        <div className="flex flex-col gap-1.5 min-w-0">
          <div className="space-y-1">
            <p className="text-sm text-muted-foreground">
              {data.full_name.split("/")[0]}
            </p>
            <h2 className="text-xl font-semibold tracking-tight truncate">
              {data.name}
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <Badge variant="secondary" className="flex items-center gap-1">
              <Star className="h-3.5 w-3.5" />
              {formatStarCount(data.stargazers_count)}
            </Badge>
          </div>
        </div>
      </CardHeader>

      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground line-clamp-2">
          {data.description}
        </p>

        <div className="flex flex-wrap gap-2">
          {data.topics.slice(0, 5).map((topic) => (
            <Badge
              key={topic}
              variant="outline"
              className="text-xs font-medium"
            >
              {topic}
            </Badge>
          ))}
        </div>

        <div className="flex gap-4 pt-2">
          {data.homepage && (
            <a
              href={data.homepage}
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                "flex items-center gap-1.5",
                "text-sm text-muted-foreground",
                "hover:text-foreground transition-colors",
              )}
            >
              <LinkIcon className="h-4 w-4" />
              Website
            </a>
          )}
          <a
            href={`https://github.com/${data.full_name}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              "flex items-center gap-1.5",
              "text-sm text-muted-foreground",
              "hover:text-foreground transition-colors",
            )}
          >
            <Github className="h-4 w-4" />
            View on GitHub
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
