import { NextRequest } from "next/server";

export async function GET(request: NextRequest) {
  const searchParams = request.nextUrl.searchParams;
  const owner = searchParams.get("owner");
  const repo = searchParams.get("repo");

  if (!owner || !repo) {
    return Response.json(
      { error: "Owner and repo parameters are required" },
      { status: 400 },
    );
  }

  try {
    const response = await fetch(
      `https://api.github.com/repos/${owner}/${repo}`,
      {
        headers: {
          Authorization: `Bearer ${process.env.GITHUB_ACCESS_TOKEN}`,
          Accept: "application/vnd.github.v3+json",
        },
      },
    );

    const data = await response.json();

    if (!response.ok) {
      return Response.json(
        { error: data.message || "Failed to fetch repository info" },
        { status: response.status },
      );
    }

    return Response.json(data);
  } catch (err: unknown) {
    const errorMessage =
      err instanceof Error ? err.message : "Failed to fetch repository info";
    return Response.json({ error: errorMessage }, { status: 500 });
  }
}
