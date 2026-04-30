import {defineCliConfig} from 'sanity/cli'

export default defineCliConfig({
  api: {
    projectId: import.meta.env.VITE_SANITY_PROJECT_ID,
    dataset: import.meta.env.VITE_SANITY_DATASET,
  },
  deployment: {
    appId: import.meta.env.VITE_SANITY_APP_ID,
    autoUpdates: true,
  },
})
