import { CopilotKit } from "@copilotkit/react-core";
import { auth } from "@/auth";

const ADMIN_USERS = process.env.NEXT_PUBLIC_ADMIN_USERS?.split(",") || [];

export default async function IngestionPageLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await auth();

  if (!session?.user?.email || !ADMIN_USERS.includes(session.user.email)) {
    return <UnauthorizedAccess />;
  }

  return (
    <CopilotKit
      runtimeUrl="/api/copilotkit"
      showDevConsole={false}
      agent="ingestion_agent"
    >
      {children}
    </CopilotKit>
  );
}

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
            Sorry, you don&apos;t have permission to access this page. This area is
            restricted to administrators only.
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
