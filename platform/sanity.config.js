import { dashboardTool } from '@sanity/dashboard';
import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import { vercelWidget } from 'sanity-plugin-dashboard-widget-vercel';
import schemaTypes from './schemas';

export default defineConfig({
  title: 'alan-cooks',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  plugins: [
    deskTool(),
    dashboardTool({
      widgets: [vercelWidget()],
    }),
  ],
  schema: {
    types: schemaTypes,
  },
});
