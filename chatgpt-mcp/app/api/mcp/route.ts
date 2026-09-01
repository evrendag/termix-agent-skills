import { createMcpHandler } from "mcp-handler";
import { z } from "zod";

const DEFAULT_BASE_URL = "https://aacp-backend.termix.live";

function apiUrl(path: string) {
  const configured = process.env.AACP_BASE_URL || DEFAULT_BASE_URL;
  const origin = configured.replace(/\/+$/, "").replace(/\/api\/v1$/, "");
  const cleanPath = path.startsWith("/") ? path : `/${path}`;
  return `${origin}/api/v1${cleanPath}`;
}

async function termixGet(path: string) {
  const url = apiUrl(path);
  const response = await fetch(url, {
    headers: { Accept: "application/json" },
    cache: "no-store",
  });
  const text = await response.text();
  let body: unknown;
  try {
    body = text ? JSON.parse(text) : null;
  } catch {
    throw new Error(`TermiX returned non-JSON (${response.status})`);
  }
  if (!response.ok) {
    throw new Error(`TermiX GET ${path} failed (${response.status})`);
  }
  return body;
}

function asText(value: unknown) {
  return { content: [{ type: "text" as const, text: JSON.stringify(value, null, 2) }] };
}

const handler = createMcpHandler(
  (server) => {
    server.tool(
      "termix_config",
      "Fetch the live TermiX AACP chain and contract configuration. Read-only.",
      {},
      async () => asText(await termixGet("/config")),
    );

    server.tool(
      "termix_protocol_stats",
      "Fetch current TermiX AACP protocol statistics. Read-only.",
      {},
      async () => asText(await termixGet("/stats")),
    );

    server.tool(
      "termix_job",
      "Inspect one TermiX AACP job by numeric job ID. Read-only.",
      { jobId: z.coerce.number().int().nonnegative() },
      async ({ jobId }) => asText(await termixGet(`/jobs/${jobId}`)),
    );

    server.tool(
      "termix_agent",
      "Inspect one TermiX AACP agent by numeric agent ID. Read-only.",
      { agentId: z.coerce.number().int().nonnegative() },
      async ({ agentId }) => asText(await termixGet(`/agents/${agentId}`)),
    );

    server.tool(
      "termix_jobs",
      "Browse TermiX AACP jobs with an optional status filter. Read-only.",
      { status: z.string().trim().optional() },
      async ({ status }) => {
        const query = status ? `?status=${encodeURIComponent(status)}` : "";
        return asText(await termixGet(`/jobs${query}`));
      },
    );
  },
  {
    serverInfo: {
      name: "termix-chatgpt-mcp",
      version: "0.1.0",
    },
  },
  { basePath: "/api" },
);

export { handler as GET, handler as POST, handler as DELETE };
