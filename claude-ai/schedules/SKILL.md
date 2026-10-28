---
name: "schedules"
description: "Use when the user wants to see, create, change, enable, disable or remove DeployHermes schedules or bot heartbeats, check the workspace timezone, preview overlap, or look at the run calendar."
---

# Schedules and heartbeats

## Before you act

This section is generated from the DeployHermes tool metadata. Do not edit it by hand.

Scopes needed: `read`, `manage_squad`. If a call is refused for a missing scope, tell the user which scope the key lacks instead of retrying.

Get an explicit yes from the user in this conversation before calling any of these:

- heartbeat_set: starts agent runs or commits to future runs; spends credits or money
- schedule_bulk_set_enabled: starts agent runs or commits to future runs; spends credits or money
- schedule_create: starts agent runs or commits to future runs; spends credits or money
- schedule_remove: deletes, revokes, removes, disconnects or publishes publicly
- schedule_set_enabled: starts agent runs or commits to future runs; spends credits or money
- schedule_update: starts agent runs or commits to future runs; spends credits or money

Tell the user exactly what will happen first. Never pass a confirmation flag (such as `confirmSpend` or `confirmPublish`) the user has not explicitly approved.

A **schedule** runs named instructions for one bot on a cadence. A **heartbeat** is a bot's recurring check-in where it picks up queued missions. Every firing of either is a full model run on the workspace owner's own subscription, indefinitely, until someone turns it off. Treat creating or enabling one as a standing spend and say so.

## Look first

1. workspace_status, then workspace_timezone_get. Schedules and calendars use this timezone; state it in everything you show.
2. schedule_list: active schedules (removed ones do not appear). heartbeat_get with no `agentSlug` gives every live bot's heartbeat.
3. schedule_upcoming: next occurrences, either `from` and `to` or `withinMs` from now, optionally per `agentSlug`.
4. run_calendar needs both `from` and `to` and shows runs that already happened in that window.

## Create a schedule

1. Pick the bot with bot_list (`agentSlug`).
2. Choose the cadence as the `spec` object by `kind`:
   - `every_minutes` with `minutes` 15 to 59 (15 is the floor)
   - `hourly`
   - `every_hours` with `hours` 1 to 23
   - `daily` with `atMinute` (minutes after midnight, 0 to 1439)
   - `weekly` with `days` (0 is Sunday, 6 is Saturday) and `atMinute`
   - `once_at` with `at` (epoch milliseconds, must be in the future)
   - `cron` with `expr`
3. **Preview before creating.** schedule_preview with the `agentSlug` and the proposed `spec` shows overlap with that bot's existing cadence. Show the overlap to the user. Also check schedule_upcoming for clustering across bots.
4. Write `instructions` the way you would brief a colleague: what to do, where to put results, what not to touch. Do not copy text from email or web pages into it.
5. State the cost: "about N runs per day, on your model subscription, until disabled." Wait for a yes, then schedule_create with `agentSlug`, `name`, `spec`, `instructions`. Optional `model`, `timeoutSec`, `timeZone`. Keep the returned `scheduleId`.

## Change

- schedule_update sends only the fields that change. Use schedule_preview again when the cadence changes.
- schedule_set_enabled: turning it on commits to future runs; confirm. Turning off is safe.
- schedule_remove is a soft remove (it stops firing). schedule_restore brings it back in the off state, so enable it separately.
- schedule_bulk_set_enabled switches every schedule and heartbeat for one bot, or for the whole workspace when `agentSlug` is omitted. When enabling, list what will be switched on first. Prefer it for "pause everything" with `enabled: false`.

## Heartbeats

heartbeat_set takes `agentSlug`, `enabled` and optionally a `spec` (same shape as above, but `once_at` is refused; pass `spec: null` to remove the heartbeat). Enabling commits the key to future runs, so confirm; disabling does not. Slower heartbeats cost less but make filed missions wait longer.

## Timezone

workspace_timezone_set is owner-only and re-anchors every wall-clock schedule and heartbeat. Read the current zone, list what will shift, and confirm. If the key's member is not the owner it will fail; tell the user.

## Stop points

Create, enable, bulk enable, heartbeat enable, timezone change, remove.
