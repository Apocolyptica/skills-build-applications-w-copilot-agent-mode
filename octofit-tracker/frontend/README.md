# OctoFit Tracker Frontend

React 19 + Vite presentation tier. Navigation uses `react-router-dom`, styling uses Bootstrap.

## Configuration

The frontend reads the API location from Vite environment variables via `import.meta.env`.

When running in GitHub Codespaces, `VITE_CODESPACE_NAME` **must be defined**, for example in
`octofit-tracker/frontend/.env.local` (git-ignored; see `.env.example`):

```bash
VITE_CODESPACE_NAME=your-codespace-name
```

In a Codespaces terminal the value is available as `$CODESPACE_NAME`:

```bash
echo "VITE_CODESPACE_NAME=$CODESPACE_NAME" > octofit-tracker/frontend/.env.local
```

| `VITE_CODESPACE_NAME` | API base URL                                  |
| --------------------- | --------------------------------------------- |
| set                   | `https://<name>-8000.app.github.dev`          |
| unset                 | `http://localhost:8000` (local development)   |

Restart the Vite dev server after changing env files. The localhost fallback only works when the
browser runs on the same machine as the API; in Codespaces, define `VITE_CODESPACE_NAME`.

## API endpoints used

`/api/activities/`, `/api/leaderboard/`, `/api/teams/`, `/api/users/`, `/api/workouts/`

## Scripts

```bash
npm run dev --prefix octofit-tracker/frontend     # http://localhost:5173
npm run build --prefix octofit-tracker/frontend
npm run lint --prefix octofit-tracker/frontend
```
