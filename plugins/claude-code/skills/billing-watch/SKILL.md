---
name: "billing-watch"
description: "Use when the user asks what their DeployHermes workspace is spending: credit balance, usage by tool, bot or mission, 30-day run costs, purchase history. Buying credits or changing auto-recharge only when the user explicitly asks."
---

# Billing watch

## Before you act

This section is generated from the DeployHermes tool metadata. Do not edit it by hand.

Scopes needed: `read`, `decide`, `manage_workspace`. If a call is refused for a missing scope, tell the user which scope the key lacks instead of retrying.

Get an explicit yes from the user in this conversation before calling any of these:

- billing_portal_link: reaches outside the workspace (third-party APIs, outbound messages, public exposure)
- credit_pack_checkout: spends credits or money; reaches outside the workspace (third-party APIs, outbound messages, public exposure)
- credits_set_auto_recharge: spends credits or money

Tell the user exactly what will happen first. Never pass a confirmation flag (such as `confirmSpend` or `confirmPublish`) the user has not explicitly approved.

Two different costs exist, and users mix them up:

1. **Usage credits**: the workspace's metered usage. Headless MCP calls cost 0.5 each, mcp__plugin_deployhermes_deployhermes__workspace_status is free, and failed calls are refunded. In-app metered tools have their own prices. Active workspaces receive 1,000 included per UTC month. The reports cover both headless calls and in-app usage; `spentThisPeriodUsd` is credit-purchase spend, not model spend.
2. **Model subscription spend**: the runs agents make use the workspace owner's own provider subscription, not on credits. Credits do not show that bill. mcp__plugin_deployhermes_deployhermes__run_stats shows run counts and cost figures the platform tracks, but the provider's own dashboard is the source of truth for that bill.

## Read-only report

Call mcp__plugin_deployhermes_deployhermes__workspace_status first in every session, before all other tools. Then call these together; they are independent reads.

1. mcp__plugin_deployhermes_deployhermes__credits_status: included, purchased, used and remaining this period, auto-recharge settings, spend this period.
2. mcp__plugin_deployhermes_deployhermes__credits_usage: breakdown by tool, agent, mission and source. The scan is bounded; if the result says it was truncated, say the numbers are a lower bound.
3. mcp__plugin_deployhermes_deployhermes__run_stats: 30-day run totals, failures, costs.
4. mcp__plugin_deployhermes_deployhermes__credits_purchase_history: recent manual and auto-recharge pack attempts, newest first, including failed and pending ones.

Report:

- Remaining credits and how many days they last at the current pace (state your arithmetic).
- The top three drains by tool, bot and mission. A tool that wakes agents appearing at the top is worth pointing out.
- Any failed or pending purchase, and whether auto-recharge is on and at what threshold and monthly cap.
- Failure rate from mcp__plugin_deployhermes_deployhermes__run_stats. Failed runs still cost; use mcp__plugin_deployhermes_deployhermes__run_list with `outcome: "failure"` to see which bots they come from.

Offer, but do not do, the obvious savings: slower heartbeats, disabling idle schedules, pausing a noisy bot (see the `schedules` and `squad` skills).

## Spending tools: only on an explicit request

Each of these needs the elevated `manage_workspace` scope, which may be missing from the key. Never call them as part of a report or as a suggestion you act on yourself.

- mcp__plugin_deployhermes_deployhermes__credits_set_auto_recharge (`enabled`, `threshold`, `monthlyMaxUsd`): can cause real charges later. Read the current policy with mcp__plugin_deployhermes_deployhermes__credits_status, show before and after, and name the monthly ceiling in dollars. Confirm.
- mcp__plugin_deployhermes_deployhermes__credit_pack_checkout (`requestKey`, `confirmSpend`): returns a hosted checkout URL for one credit pack. Opening it starts a real purchase flow. Tell the user the pack is a real charge, set `confirmSpend: true` only after an explicit yes, and give the URL to the user to complete the payment themselves. Use a fresh `requestKey` for a new purchase and reuse the old key only when retrying the same unfinished one. Credits arrive only after the provider confirms payment, so check mcp__plugin_deployhermes_deployhermes__credits_status afterwards instead of assuming.
- mcp__plugin_deployhermes_deployhermes__billing_portal_link: requests approval, then returns a short-lived portal URL for invoices, payment methods and cancellation. It may open a human approval ticket; if so, point the user to the dashboard.

Never ask for or accept card details, and never paste a checkout or portal URL anywhere except to the user.
