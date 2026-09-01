export default function Home() {
  return (
    <main style={{ fontFamily: "system-ui", maxWidth: 760, margin: "64px auto", padding: 24 }}>
      <h1>TermiX ChatGPT MCP Bridge</h1>
      <p>Read-only MCP bridge for TermiX AACP.</p>
      <p>MCP endpoint: <code>/api/mcp</code></p>
      <p>No wallet private keys are stored by this bridge.</p>
    </main>
  );
}
