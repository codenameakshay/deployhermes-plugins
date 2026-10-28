# DeployHermes plugins

Skills and agents that run a DeployHermes workspace from your own AI assistant. This repository is generated from the DeployHermes source. Do not edit it by hand.

Version 0.1.3. Licensed under MIT. More at https://deploy-hermes.com.

## Before you start

Create an API key in the DeployHermes app under Settings, API keys. Skills and agents read your workspace and can start runs that spend credits, so the plugins ask before any tool that wakes agents, spends, reaches outside the workspace or deletes. OAuth sign-in is not available yet.

## Install

The quickest way is the CLI, which writes native config and never stores your key unless you pass `--write-key`:

```bash
npx @deployhermes/cli install claude-code   # or codex, cursor, vscode
```

### Claude Code

```bash
claude plugin marketplace add codenameakshay/deployhermes-plugins
claude plugin install deployhermes@deployhermes-plugins
```

Claude Code asks for your API key and keeps it in the system keychain.
Use Claude Code v2.1.295 or later and install Node.js. The confirmation hook blocks risky tools if Node.js or the hook fails. Tools without risky effects do not run the hook.

### Codex

```bash
codex plugin marketplace add codenameakshay/deployhermes-plugins
export DEPLOYHERMES_API_KEY=<your key>
```

Install the plugin from the Codex plugin browser. Then add the MCP server to `~/.codex/config.toml`:

```toml
[mcp_servers.deployhermes]
url = "https://deploy-hermes.com/mcp/v1"
bearer_token_env_var = "DEPLOYHERMES_API_KEY"
```

Codex plugins cannot ship subagents, so agents arrive as skills.

### Cursor

Set `DEPLOYHERMES_API_KEY` in the environment Cursor starts from, then add this repository as a plugin marketplace, or copy `plugins/cursor/mcp.json` to `~/.cursor/mcp.json`.

### VS Code

Run `npx @deployhermes/cli install vscode --scope project` for the Local harness. User-profile auto-install is unavailable until the CLI can safely select a profile. VS Code asks for the key through a masked prompt. Servers using this input prompt are not forwarded to Copilot harness sessions. The `plugins/agent-plugins` folder follows the Agent Plugins 1.0 layout and carries no credentials; authentication is client-managed and OAuth is not available yet.

### Claude.ai and Claude Desktop

Zip each folder under `claude-ai/` and upload it in Settings, Capabilities, Skills. Claude.ai connectors need OAuth, which DeployHermes does not offer yet, so the skills have no tools to call there until it ships.

### ChatGPT

ChatGPT cannot present custom API keys. It needs OAuth, which arrives in a later release.

## Layout

```
.claude-plugin/marketplace.json   Claude Code marketplace
.agents/plugins/marketplace.json  Codex marketplace
.cursor-plugin/marketplace.json   Cursor marketplace
plugins/claude-code/              Claude Code plugin
plugins/codex/                    Codex plugin
plugins/cursor/                   Cursor plugin
plugins/agent-plugins/            Agent Plugins 1.0 plugin
claude-ai/<skill>/                One folder per skill, ready to zip
```
