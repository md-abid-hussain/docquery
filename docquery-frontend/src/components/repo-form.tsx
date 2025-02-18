import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface RepoFormProps {
  input: string;
  setInput: (input: string) => void;
  handleSubmit: (e: React.FormEvent) => void;
  loading: boolean;
}

const RepoForm: React.FC<RepoFormProps> = ({
  input,
  setInput,
  handleSubmit,
  loading,
}) => (
  <form onSubmit={handleSubmit} className="mb-4">
    <div className="flex gap-2 flex-wrap">
      <Input
        type="text"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        placeholder="Enter GitHub URL or 'owner/repo'"
        className="w-full min-w-[300px] flex-1"
      />
      <Button type="submit" className="w-full sm:max-w-28" disabled={loading}>
        Get Repo Info
      </Button>
    </div>
  </form>
);

export default RepoForm;
