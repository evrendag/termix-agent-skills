export const metadata = {
  title: "TermiX ChatGPT MCP Bridge",
  description: "Read-only TermiX AACP MCP bridge",
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
