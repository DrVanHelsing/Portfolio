# Ongoing Project 
## started: August 2025


# Telkom AI Call Centre Management Solution

Comprehensive, multi-project solution for AI-assisted customer engagement with real-time supervision and a cross-platform mobile client.

- Backend API: ASP.NET Core (.NET8)
- Supervisor Dashboard: React (Vite) hosted by ASP.NET Core (.NET9)
- Mobile App: .NET MAUI (.NET9) for Android, iOS, Windows, Mac Catalyst
- Shared Library: Multi-target (.NET8 / .NET9)

This repository is designed as a sample/starting point for building a production-capable AI-assisted call centre solution. It includes real-time SignalR hubs, REST APIs, a React supervisor dashboard, a MAUI mobile client, and integration points for Cognitive Services and telemetry.

---

Table of contents

- Overview
- Projects
- Architecture
- Features
- Text Analytics
- Tech stack & prerequisites
- Getting started (local development)
- Configuration
- Development notes (hubs, APIs, client)
- Testing
- Build & publish
- CI/CD
- Troubleshooting
- Security & secrets
- Performance & scaling
- Contributing
- Roadmap
- License

---

Overview

Telkom AI Call Centre Management Solution demonstrates how to combine modern .NET server-side APIs, real-time SignalR communication, a React-based supervisor dashboard, and a cross-platform MAUI client to build an AI-assisted contact centre platform. The solution focuses on:

- Real-time monitoring and supervision of active sessions
- Orchestration of chat/voice sessions and session life-cycle management
- Integration with speech and cognitive services for transcription, translation, and AI-assisted responses
- A responsive React dashboard for supervisors, with offline/override settings support
- A mobile app for agents and users using .NET MAUI


Projects

| Project | Type | Target(s) | Purpose |
|---|---|---|---|
| `TelkomAI.Shared` | Class Library | net8.0; net9.0 | Shared DTOs, models and helpers used by server and client projects |
| `TelkomAI.ApiOrchestrator` | ASP.NET Core API + SignalR | net8.0 | Chat orchestration, session state, analytics, health endpoints, SignalR hubs |
| `TelkomAI.ReactDashboard` | ASP.NET Core host + React (Vite) | net9.0 + Node20 | Supervisor dashboard (SignalR + REST), Vite frontend under `ClientApp` |
| `TelkomSupportApp` | .NET MAUI | net9.0-android; net9.0-ios; net9.0-maccatalyst; net9.0-windows10.0.19041.0 | Cross-platform mobile client for agents/users |


Architecture

```mermaid
flowchart LR
 subgraph Clients
 A[MAUI App] -- SignalR + REST --> B
 C[React Dashboard] -- SignalR + REST --> B
 end
 subgraph Backend (.NET8)
 B[API Orchestrator]
 B <-- EF Core --> D[(SQL DB)]
 B -- Cognitive Services --> E[Azure]
 B -- SignalR Hubs --> A
 B -- SignalR Hubs --> C
 end
```

Primary hubs/endpoints

- SignalR chat hub: `/chathub` (used for user/agent chat sessions and relayed events)
- SignalR supervisor hub: `/supervisorhub` (real-time session monitoring and controls)
- REST API root (example): `/api/*` (session management, analytics, health checks)


Features

This solution includes a broad set of features across the backend, supervisor dashboard and the mobile agent app. Key functionality:

- Real-time session events and monitoring via SignalR
- Session orchestration and lifecycle APIs (create, join, transfer, end)
- Integration stubs for Azure Cognitive Services (Speech, Language, Text Analytics)
- Supervisor dashboard with live updates, filters, override settings and role-based controls
- Mobile client for agents with connectivity to REST and SignalR
- Configurable environment-specific settings and local overrides
- Export/Import of dashboard settings (JSON)
- Analytics and reporting endpoints and example UI views


Text Analytics

The solution provides text analytics capabilities (via pluggable providers such as Azure Text Analytics) and the dashboard exposes these insights for supervisors and analysts. Typical text analytics features included or easily enabled by the integration:

- Sentiment analysis (overall session sentiment and per-utterance sentiment)
- Key phrase extraction (identify important terms/topics in calls/chats)
- Named entity recognition (identify people, organizations, locations, numbers)
- Language detection and translation helpers (when transcripts cross locales)
- Conversation summarization / auto-generated notes (for supervisor review or CRM integration)
- Topic classification and clustering for grouping related sessions
- Detection of presence of contact‑sensitive or escalation terms (customizable rules)

Where available, analytics are surfaced in the React dashboard under the following areas:

- `Sentiment Analytics` — live and historical sentiment trends, per-session breakdowns
- `Transcripts` — transcript viewer with highlighted entities, key phrases and sentiment markers
- `AI Insights` — suggested summaries, topic clusters, and action items derived from conversations
- `Call Metrics` — KPIs enriched with text analytics results (e.g., % of negative sentiment calls)


Tech stack & prerequisites

- .NET8 SDK (server) and .NET9 SDK (dashboard host + MAUI targets where applicable)
- Node20+ and npm for the React `ClientApp`
- Visual Studio2022/2029 or VS Code for development (with MAUI workloads if building the mobile app)
- SQLite / SQL Server / LocalDB for development database (EF Core migrations supported)
- (Optional) Azure account for Cognitive Services, SignalR Service and App Service hosting

Recommended dev tools

- dotnet CLI: `dotnet` (8/9)
- Node & npm: `node`, `npm`
- VS Code or Visual Studio with MAUI workloads
- Postman or HTTP client for API testing


Getting started (local development)

1) Clone and restore

```bash
git clone <repo-url>
cd <repo-root>
dotnet restore
npm --version # ensure npm is installed
```

2) Build

```bash
dotnet build
```

3) Run API locally

```bash
dotnet run --project TelkomAI.ApiOrchestrator
# default hosted at https://localhost:7001 (see project launch settings)
```

4) Run React Supervisor Dashboard host (server + Vite proxy)

- Start the ASP.NET Core host (this exposes the SignalR endpoints used by the dashboard proxy):

```bash
dotnet run --project TelkomAI.ReactDashboard
# host typically runs at https://localhost:7002
```

- Start the Vite frontend (development experience)

```bash
cd TelkomAI.ReactDashboard/ClientApp
npm install
npm run dev
# visit http://localhost:44447 (proxyed to host for API/hub calls)
```

5) Run MAUI mobile client (example: Android)

- Open `TelkomSupportApp` in Visual Studio and run on your target device/emulator
- Ensure app configuration points to correct API base URL (see Configuration section)


Configuration

There are multiple configuration layers:

- `appsettings.json` (project host defaults)
- Environment variables (prefixed as appropriate for ASP.NET Core)
- Browser localStorage overrides (dashboard `SettingsPage`) — `api_base_url`, `supervisor_hub_url`, `dark_mode`, etc.

Example API `appsettings.json` (server)

```json
{
 "ConnectionStrings": {
 "DefaultConnection": "Server=(localdb)\\MSSQLLocalDB;Database=TelkomAI;Trusted_Connection=True;"
 },
 "AzureServices": {
 "SpeechService": {
 "SubscriptionKey": "<KEY>",
 "Region": "southafricanorth",
 "Endpoint": "https://<your-speech>.cognitiveservices.azure.com/"
 }
 }
}
```

React Dashboard host settings (`TelkomAI.ReactDashboard/appsettings.json`)

```json
{
 "ApiSettings": { "BaseUrl": "https://localhost:7001" },
 "Azure": { "SignalR": { "ConnectionString": "" } }
}
```

MAUI client configuration (example `appsettings` or embedded configuration)

```json
{
 "TelkomAI": {
 "ApiBaseUrl": "https://localhost:7001",
 "DeviceApiBaseUrl": "http://<PC_LAN_IP>:7001",
 "DefaultLanguage": "en-ZA",
 "SupportedLanguages": ["en-ZA","af-ZA","zu-ZA","xh-ZA"]
 }
}
```

Local dashboard overrides

The React dashboard supports per-browser overrides via `localStorage` keys used by the `SettingsPage`:

- `api_base_url` — override API base URL
- `supervisor_hub_url` — override supervisor hub URL (wss/wss)
- `dark_mode`, `auto_refresh`, `refresh_interval`, `notifications`

These override the environment values when present.

Dashboard functionality (detailed)

The supervisor dashboard is designed for supervisors, analysts and administrators. Functionality exposed in the UI includes:

- Live Sessions: real-time list of active sessions with filters (agent, queue, priority, sentiment)
- Session Detail: open a session to view full transcript, realtime events, participant metadata and connected devices
- Takeover / Intervention: supervisors can join or take over a session (chat or voice) and send messages/actions
- Call Recording & Playback: access recorded audio when available, with timeline synced to transcript
- Transcripts: searchable transcript viewer with highlights for sentiment, entities, key phrases and timestamps
- Sentiment Analytics: per-utterance and session-level sentiment scoring, trends and alerts on negative calls
- AI Insights: automated summaries, suggested next actions, recommended responses and topic clusters
- Call Metrics & Dashboards: KPIs (AHT, CSAT proxies, sentiment distribution, dropped call rates) with date range and aggregation controls
- Search & Filtering: full-text search across transcripts, metadata filters, tags and saved queries
- Alerts & Notifications: configure thresholds (sentiment, keywords, SLA) to surface problematic sessions
- User & Agent Management (UI shortcuts): quick access to agent status, presence and assignment controls
- Settings & Overrides: per-browser local overrides, JSON import/export of dashboard settings
- Annotation & Notes: supervisors can annotate sessions for QA and handoff to CRM or ticketing systems
- Export / Reporting: export transcripts, metrics and selected session data to JSON/CSV for downstream analysis
- Integrations: webhooks and connectors for CRM, BI or ticketing systems (stubs / examples included)

Target dashboard users

- Supervisors: live monitoring, takeover controls, coaching and annotations
- Quality Analysts: transcript review, annotation, and historical analytics
- Operations / Managers: KPIs, trends and reporting views
- Developers / Integrators: use provided APIs and webhooks to extend or extract data


Mobile app functionality (detailed)

The mobile app (`TelkomSupportApp`) is designed for agents and mobile-first users. Core features include:

- Agent Login & Presence: sign in, set availability (available, wrap-up, away) and presence syncing to the dashboard
- Assigned Sessions: list of assigned chats/calls with priority and basic metadata
- Call Handling: accept/reject calls, mute/unmute, hold, transfer and hang-up controls for voice sessions
- Chat Messaging: real-time chat with customers, typing indicators and message receipts
- Suggested Responses: AI-assisted quick replies and canned response insertion based on conversation context
- Live Transcript View: see live transcription during calls (when enabled) with timestamps
- Post-call Actions: add tags, notes, escalate or create tickets from a completed session
- Offline Mode & Resilience: queued messages and local caching for transient connectivity
- Device API Support: use `DeviceApiBaseUrl` for device-specific interactions and testing with emulators
- Diagnostics & Logs: lightweight diagnostics view to help troubleshoot connectivity issues
- Localization: support for configured languages and local formats

Target mobile app users

- Agents: primary users for handling inbound/outbound customer interactions
- Field Technicians / Mobile Operators: handle sessions while on the move, escalate to supervisors
- Customers (optional client view): lightweight client to interact with automated assistants or agents


Development notes

SignalR hubs

- `/chathub` — primary chat/events hub for agents and clients
- `/supervisorhub` — dashboard hub used for live supervision, list updates and controls

When connecting the dashboard or mobile client, prefer using the configured `ApiBaseUrl` and the hub relative path. The dashboard `ClientApp` uses Vite proxy settings in `ClientApp/vite.config.js` to route `/hub` and `/api` requests to the ASP.NET Core host during development.

Database & EF Core migrations

- The API project uses EF Core for persistence (see `TelkomAI.ApiOrchestrator`)
- Create and apply migrations locally using:

```bash
dotnet ef migrations add InitialCreate -p TelkomAI.ApiOrchestrator -s TelkomAI.ApiOrchestrator
dotnet ef database update -p TelkomAI.ApiOrchestrator -s TelkomAI.ApiOrchestrator
```

Logging & telemetry

- Server-side logging uses the built-in ASP.NET Core logging abstractions. You can add Application Insights or other providers as needed.
- The dashboard exposes client-side errors to console and can be wired to Sentry/LogRocket for production front end monitoring.


Testing

- Unit tests: Add xUnit / NUnit projects to test server-side services and shared DTOs.
- Integration tests: Use `WebApplicationFactory<>` or a test host to exercise controllers and hubs.
- End-to-end: Use Playwright / Cypress for the React UI and unit/instrumented tests for MAUI via device farms.


Build & publish

Manual publish example

```bash
# API
dotnet publish TelkomAI.ApiOrchestrator -c Release -f net8.0 -o publish-api

# React dashboard host (the build should also produce the Vite frontend into wwwroot)
dotnet publish TelkomAI.ReactDashboard -c Release -f net9.0 -o publish-dashboard
```

Notes for React Dashboard production build

- `npm run build` in `ClientApp` outputs the production assets which are copied into `TelkomAI.ReactDashboard/wwwroot` by the host build/publish pipeline. Ensure Node tooling is available in CI or pre-built assets are committed or produced during publish.


CI/CD

- A sample GitHub Actions workflow can be found in `.github/workflows/` (if present). The repository contains an example `deploy-dashboard.yml` that builds and deploys the dashboard to Azure App Service using `azure/webapps-deploy@v3`.
- Secrets to configure in GitHub: `AZUREAPPSERVICE_PUBPROFILE` (or use service principal / `azure/webapps-deploy@v3` alternatives).
- For more robust deployment use separate pipelines for API and dashboard, containerize when necessary, and use staging slots for zero-downtime deploys.


Troubleshooting

- CORS or proxy failures: verify origins and proxy target in `TelkomAI.ReactDashboard/Program.cs` and `ClientApp/vite.config.js`.
- SignalR connection issues: ensure the hub paths are available and not blocked by reverse proxies; confirm correct wss/ws URLs.
- Mobile device to local API: use `DeviceApiBaseUrl` with your PC LAN IP or use `adb reverse tcp:7001 tcp:7001` for Android emulators.
- Invalid config or missing Azure keys: the API will generally return authorization or4xx/5xx errors for missing external service credentials. Provide stub/mock values for local development.


Security & secrets

- Do not commit keys, credentials, or publish profiles to source control.
- Use environment variables or secret stores (Azure Key Vault) in production to manage credentials for Cognitive Services and other external systems.
- Use HTTPS in all production endpoints and validate CORS origins strictly for the dashboard host.


Performance & scaling

- For scale-out consider using Azure SignalR Service to offload WebSocket connections and enable multiple API instances.
- Cache frequently-read data and paginate real-time lists when the number of concurrent sessions is large.
- Monitor telemetry for hotspots and scale the database and API tier appropriately (read replicas, connection pooling).


Contributing

Contributions are welcome. Suggested contribution workflow:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/some-feature`
3. Add tests where applicable
4. Open a pull request with a clear description and testing steps

Coding standards

- Use `dotnet format` and follow consistent naming and architecture patterns for services, controllers, and SignalR hubs.


Roadmap & ideas

- Implement production-ready authentication and authorization for APIs and hubs (JWT / OpenID Connect)
- Add end-to-end test coverage for SignalR flows
- Offline-first features for the mobile client
- Advanced AI features: sentiment analysis, summarization, call transcripts, and auto-suggest responses
- Multi-tenant support and per-tenant configuration


Acknowledgements

- Built with .NET, ASP.NET Core, SignalR, React + Vite, and .NET MAUI


Contact and support

- For issues and feature requests open an issue in the repository
- For collaboration contact the repository maintainers via PRs and issues


License

MIT (or the repository license file). See `LICENSE` for details.


Notes

This README aims to be a thorough, practical guide to the repository. If you want additional sections (detailed API reference, hub message contract examples, or MAUI client architecture diagrams), tell me which area to expand and I will add it.
