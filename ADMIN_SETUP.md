# Admin setup

`/admin/contacts` is protected by a password and reads data through server routes.
The browser never queries `contact_submissions` directly.

## Environment variables (Vercel, Production and Preview)

| Name | Notes |
| --- | --- |
| `ADMIN_PASSWORD` | Long and unique (16+ characters). Changing it signs everyone out. |
| `SUPABASE_SERVICE_ROLE_KEY` | Supabase project settings, API. **Server only**: never give it a `NEXT_PUBLIC_` prefix. |

If either is missing the admin page shows "Admin is not configured" and serves nothing.

## Rollout order

1. Add both env vars in Vercel.
2. Deploy this branch.
3. Sign in at `/admin/contacts` and confirm submissions load.
4. Run `supabase_lockdown_contact_submissions.sql` in the Supabase SQL editor.
5. Submit a test inquiry on `/contact` to confirm the form still works.
6. In a private window with no password cookie, `/api/admin/contacts` should return 401.

## Notes

- Login attempts are throttled per server instance only. Serverless instances do not share
  memory, so treat this as a speed bump and rely on a long password.
- Sessions last 8 hours.
