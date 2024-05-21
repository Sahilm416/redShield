import { getStreamingResponse } from "find-x-react";

export const runtime = "edge";

export async function POST(req: Request) {
  const { query } = await req.json();
  try {
    return await getStreamingResponse({ query: query });
  } catch (error) {
    console.log(error);
  }
}
