# CareerPilot AI

Your Career. Our Intelligence. Always Applying.

CareerPilot AI is a career automation command-centre interface built on the repository’s TanStack Start stack. The current workspace is a disconnected product preview: sample records are labeled, and actions that require a backend do not claim success.

## Run locally

```sh
bun install
bun run dev
```

The preview is available at `http://localhost:8080` in the Lovable development environment. Use the navigation to explore overview, Mission Control, Source Explorer, Job Discovery, applications, manual actions, Resume Studio, cover letters, communications, interviews, analytics, career insights, security, integrations, usage, settings, and onboarding.

## Backend integration status

The requested FastAPI service, API base URL, OpenAPI schema, authentication flow, and event-stream contract were not included in the repository. No backend calls, authentication, file uploads, background workers, email delivery, application submissions, or live operational status are implemented. A website address can be validated locally, but no website is contacted. The emergency-stop control explains that no stop request was sent.

Supply the existing OpenAPI document and deployment connection details before wiring the API. Keep the service as the source of truth; do not infer undocumented endpoints. A discovered website must not be treated as authorized for monitoring or application submission. Automatic submission must remain off until explicit user authorization and platform permission are confirmed.

## Verification

```sh
bunx vitest run
```

The current checks cover route availability and application-submission authorization guards. Backend integration, real user authentication, uploads, background jobs, event reconnection, and end-to-end application lifecycle remain unverified because no backend contract is connected.