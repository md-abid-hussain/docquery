import { Button } from "@/components/ui/button";
import Header from "@/components/dashboard/header";
import { signIn } from "@/auth";
import { Github } from "lucide-react";

export default function SignIn() {
  return (
    <div className="min-h-screen bg-slate-50">
      <Header />
      <div className="container mx-auto px-4">
        <div className="flex min-h-[calc(100vh-5rem)] items-center justify-center">
          <div className="w-full max-w-md space-y-8 rounded-xl bg-white p-8 shadow-lg">
            <div className="text-center">
              <h1 className="text-2xl font-bold tracking-tight text-gray-900">
                Welcome to DocQuery
              </h1>
              <p className="mt-2 text-sm text-gray-600">
                Pleaase sign in with GitHub to start exploring repositories
              </p>
            </div>

            <form
              className="mt-8 space-y-6"
              action={async () => {
                "use server";
                await signIn("github", { redirectTo: "/d/chat" });
              }}
            >
              <Button
                type="submit"
                className="w-full flex items-center justify-center gap-2 h-11"
                variant="outline"
              >
                <Github className="h-5 w-5" />
                Continue with GitHub
              </Button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
