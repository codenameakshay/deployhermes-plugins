// Generated from the DeployHermes tool metadata. Do not edit
import { readFileSync } from "node:fs"

const effects = {
  "api_key_revoke": [
    "destructive"
  ],
  "approval_confirm": [
    "spends",
    "external",
    "destructive"
  ],
  "attachment_remove": [
    "destructive"
  ],
  "billing_portal_link": [
    "external"
  ],
  "bot_fire": [
    "destructive"
  ],
  "bot_pause": [
    "wakes",
    "spends"
  ],
  "bot_restore": [
    "wakes",
    "spends"
  ],
  "channel_disconnect": [
    "destructive"
  ],
  "channel_test": [
    "external"
  ],
  "channel_update": [
    "external"
  ],
  "chat_post": [
    "wakes",
    "spends"
  ],
  "clawhub_install": [
    "external"
  ],
  "clawhub_preview": [
    "external"
  ],
  "clawhub_search": [
    "external"
  ],
  "credit_pack_checkout": [
    "spends",
    "external"
  ],
  "credits_set_auto_recharge": [
    "spends"
  ],
  "datafast_metrics": [
    "external"
  ],
  "email_domain_add": [
    "external"
  ],
  "email_domain_remove": [
    "external",
    "destructive"
  ],
  "email_domain_verify": [
    "external"
  ],
  "email_draft_discard": [
    "destructive"
  ],
  "email_draft_revise": [
    "wakes",
    "spends"
  ],
  "email_escalation_answer": [
    "wakes",
    "spends"
  ],
  "email_escalation_dismiss": [
    "destructive"
  ],
  "email_rule_remove": [
    "destructive"
  ],
  "email_send_approve": [
    "external"
  ],
  "email_send_schedule": [
    "external"
  ],
  "heartbeat_set": [
    "wakes",
    "spends"
  ],
  "inbox_create": [
    "spends"
  ],
  "integration_disconnect": [
    "destructive"
  ],
  "integration_tool_list": [
    "external"
  ],
  "integration_verify": [
    "external"
  ],
  "memory_forget": [
    "destructive"
  ],
  "mission_comment": [
    "wakes",
    "spends"
  ],
  "mission_retry": [
    "wakes",
    "spends"
  ],
  "mission_run_now": [
    "wakes",
    "spends"
  ],
  "mission_trash": [
    "destructive"
  ],
  "playbook_install": [
    "wakes",
    "spends"
  ],
  "project_build_detect": [
    "external"
  ],
  "project_build_env_remove": [
    "destructive"
  ],
  "project_connection_list": [
    "external"
  ],
  "project_dry_run_start": [
    "spends",
    "external"
  ],
  "project_merge_approved_ticket": [
    "external",
    "destructive"
  ],
  "project_propose": [
    "wakes",
    "spends"
  ],
  "project_refresh": [
    "wakes",
    "spends"
  ],
  "project_resource_mapping_save": [
    "external"
  ],
  "project_resume": [
    "wakes",
    "spends"
  ],
  "provider_begin_login": [
    "spends",
    "external"
  ],
  "provider_disconnect": [
    "destructive"
  ],
  "provisioning_retry": [
    "external"
  ],
  "schedule_bulk_set_enabled": [
    "wakes",
    "spends"
  ],
  "schedule_create": [
    "wakes",
    "spends"
  ],
  "schedule_remove": [
    "destructive"
  ],
  "schedule_set_enabled": [
    "wakes",
    "spends"
  ],
  "schedule_update": [
    "wakes",
    "spends"
  ],
  "sentry_event_get": [
    "external"
  ],
  "sentry_issue_list": [
    "external"
  ],
  "share_publish": [
    "destructive"
  ],
  "share_revoke": [
    "destructive"
  ],
  "share_set_indexing": [
    "external"
  ],
  "squad_pause": [
    "wakes",
    "spends"
  ],
  "team_reject": [
    "destructive"
  ],
  "team_remove": [
    "destructive"
  ],
  "ticket_answer": [
    "wakes",
    "spends"
  ],
  "ticket_dismiss": [
    "destructive"
  ],
  "workflow_run": [
    "wakes",
    "spends"
  ],
  "workspace_ask_lead": [
    "wakes",
    "spends"
  ],
  "workspace_request_deletion": [
    "destructive"
  ],
  "x_launch_publish": [
    "external",
    "destructive"
  ],
  "x_launch_reconcile": [
    "external"
  ]
}
const input = JSON.parse(readFileSync(0, "utf8"))
const tool = String(input.tool_name ?? "").split("__").pop()
const found = effects[tool] ?? []
const reason = found.length > 0
  ? `${tool} ${found.join(", ")}. Check what it will do before approving.`
  : `${tool} needs confirmation before it runs.`
process.stdout.write(JSON.stringify({
  hookSpecificOutput: {
    hookEventName: "PreToolUse",
    permissionDecision: "ask",
    permissionDecisionReason: reason,
  },
}))
