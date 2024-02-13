import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import schemaTypes from './schemas';

export default defineConfig({
  title: 'alan-cooks',
  projectId: process.env.SANITY_STUDIO_PROJECT_ID,
  dataset: process.env.SANITY_STUDIO_DATASET,
  plugins: [deskTool()],
  schema: {
    types: schemaTypes,
  },
});
