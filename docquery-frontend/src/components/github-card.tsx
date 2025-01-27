import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, Link, Github } from "lucide-react";
import { cn } from "@/lib/utils";

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
    if (count >= 1000) {
      return `${(count / 1000).toFixed(1)}k`;
    }
    return count;
  };

  return (
    <Card className={cn("w-full transition-all hover:shadow-lg", className)}>
      <CardHeader className="flex flex-row items-center gap-4">
        <img
          src={data.image_url}
          alt={`${data.name} repository`}
          className="h-16 w-16 rounded-lg object-cover"
        />
        <div className="flex flex-col">
          <h2 className="text-2xl font-bold text-gray-900">{data.name}</h2>
          <div className="flex items-center gap-2 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <Star className="h-4 w-4" />
              <span>{formatStarCount(data.stargazers_count)}</span>
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-gray-600">{data.description}</p>
        
        <div className="flex flex-wrap gap-2">
          {data.topics.map((topic) => (
            <Badge
              key={topic}
              variant="secondary"
              className="bg-purple-50 text-purple-700 hover:bg-purple-100"
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
              className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
            >
              <Link className="h-4 w-4" />
              Website
            </a>
          )}
          <a
            href={`https://github.com/${data.full_name}`}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-gray-600 hover:text-gray-900"
          >
            <Github className="h-4 w-4" />
            View on GitHub
          </a>
        </div>
      </CardContent>
    </Card>
  );
}