import { XOctagon } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";

export function UnauthorizedAccess() {
  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-destructive">
            <XOctagon className="h-6 w-6" />
            Unauthorized Access
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-2">
          <p className="text-muted-foreground">
            Sorry, you don&apos;t have permission to access this page. This area
            is restricted to administrators only.
          </p>
        </CardContent>
        <CardFooter>
          <Link href="/d/chat" className="w-full">
            <Button className="w-full" variant="outline">
              Return to Chat
            </Button>
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}
