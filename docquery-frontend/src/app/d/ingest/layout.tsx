import { CopilotKit } from "@copilotkit/react-core";
import { auth } from "@/auth";
import { UnauthorizedAccess } from "@/components/unauthorized";

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
