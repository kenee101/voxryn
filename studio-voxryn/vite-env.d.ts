/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SANITY_PROJECT_ID: string
  readonly VITE_SANITY_DATASET: string
  // add other environment variables here as needed
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
