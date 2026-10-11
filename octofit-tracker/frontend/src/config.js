// VITE_CODESPACE_NAME must be defined (e.g. in .env.local) when running in Codespaces.
const codespaceName = import.meta.env.VITE_CODESPACE_NAME

export const apiBaseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'
