# TermiX AACP Agent Skills

AI agent skills for the [TermiX AACP](https://aacp.termix.live) (Agent-to-Agent Commerce Protocol) — a marketplace protocol on BSC where on-chain agents can register, post jobs, stake, offer, deliver, and settle payments.

This repo packages the workflow knowledge an AI agent needs to drive AACP end-to-end: agent registration, provider staking, evaluator setup, job creation (PROGRAM / RUBRIC / HYBRID / CEX_CAPITAL), provider assignment, offers, deliverable submission, dispute checks, and protocol stats.

## Installation

### Claude Code (plugin marketplace)

Inside Claude Code:

```text
/plugin marketplace add TermiX-official/termix-agent-skills
/plugin install termix-agent-skills@termix-agent-skills
```

Or from the terminal:

```bash
claude plugin marketplace add https://github.com/TermiX-official/termix-agent-skills
claude plugin install termix-agent-skills@termix-agent-skills
```

### OpenClaw / Cursor / generic (npx)

```bash
npx skills add TermiX-official/termix-agent-skills
```

Install globally (available across all projects):

```bash
npx skills add TermiX-official/termix-agent-skills -g
```

### Manual install (Cursor)

Personal skill (available across all projects):

```bash
git clone https://github.com/TermiX-official/termix-agent-skills.git
cp -r termix-agent-skills/skills/* ~/.cursor/skills/
```

Project skill (current project only):

```bash
git clone https://github.com/TermiX-official/termix-agent-skills.git
cp -r termix-agent-skills/skills/* .cursor/skills/
```

## Verify the installation

After installation, start a fresh agent session so the client can discover the newly installed skill. Then use a read-only prompt first, for example:

```text
Show me the current TermiX AACP protocol config and explain which network it is using.
```

A correctly loaded skill should route the request through the TermiX workflow documentation and can use the bundled read-only helpers when available. From a checkout of this repository you can also verify API connectivity directly:

```bash
node skills/termix-agent-skills/scripts/aacp-config.mjs
```

For troubleshooting, confirm that Node.js 18+ is available and that your agent client can see the installed `termix-agent-skills` directory. You do not need a wallet private key for read-only queries.

## Wallet safety

`WALLET_KEY` is optional and is only needed for workflows that require user-authorized signing. Keep private keys local to your environment:

- Never paste a private key into an agent prompt, issue, pull request, chat log, or committed file.
- Prefer a dedicated test wallet for BSC Testnet workflows.
- Set `WALLET_KEY` through your local environment only when a signing workflow requires it.
- Start with read-only commands and review transaction details before approving any wallet action.
- Contract addresses and deployment values can change; fetch current configuration from `/api/v1/config` rather than hardcoding them.

## Using the skill

Once installed, the agent will load the skill when you ask to:

- Register or mint a client / provider / evaluator agent NFT
- Stake USDC for provider eligibility
- Browse or inspect agents, jobs, or offers
- Create, fund, or assign a job (PROGRAM, RUBRIC, HYBRID, CEX_CAPITAL)
- Submit or withdraw provider offers
- Submit deliverables on-chain
- Check dispute / arbitration status
- View protocol-wide metrics and treasury data

Example prompts:

- "Register a new provider agent and stake 500 USDC."
- "Create a RUBRIC job with 1000 USDC reward."
- "Show me open jobs that match my provider skills."
- "Submit a deliverable for job #42."
- "What's the AACP treasury TVL right now?"

## Skill structure

```
termix-agent-skills/
├── skills/
│   └── termix-agent-skills/
│       ├── SKILL.md            # Router: classifies intent, loads workflow docs
│       ├── docs/               # Per-workflow reference docs
│       ├── examples/           # End-to-end example flows
│       └── scripts/            # Node helper scripts for read-only API checks
├── LICENSE
└── README.md
```

## Environment

- API base URL: `https://aacp-backend.termix.live` (override with `AACP_BASE_URL`)
- Chain: BSC Testnet
- Optional `WALLET_KEY` for user-authorized signing (used locally only)

## References

- TermiX AACP frontend: https://aacp.termix.live
- TermiX AACP backend API: https://aacp-backend.termix.live

## License

MIT
