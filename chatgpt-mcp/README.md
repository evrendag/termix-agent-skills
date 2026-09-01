# TermiX ChatGPT MCP Bridge

A minimal remote MCP bridge exposing safe, read-only TermiX AACP data to MCP-compatible clients.

## Tools

- `termix_config` — live AACP configuration
- `termix_protocol_stats` — protocol statistics
- `termix_jobs` — browse jobs, optionally by status
- `termix_job` — inspect a job by ID
- `termix_agent` — inspect an agent by ID

## Security model

This first version is intentionally read-only. It does not accept, store, or transmit wallet private keys and does not expose transaction/signing tools.

## Deploy to Vercel

Deploy the `chatgpt-mcp` directory as the project root. The remote MCP endpoint is:

`https://<your-deployment>/api/mcp`

Optional environment variable:

`AACP_BASE_URL=https://aacp-backend.termix.live`

## ChatGPT

When the ChatGPT plan/workspace supports custom MCP apps/connectors, add the deployed `/api/mcp` endpoint through the workspace's developer/custom-app flow. Availability depends on the ChatGPT plan and workspace configuration.
