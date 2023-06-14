import { defineConfig } from 'sanity';
import { deskTool } from 'sanity/desk';
import schemas from './schemas/schema';

export default defineConfig({
  title: 'alan-cooks',
  projectId: 'edb0ptmz',
  dataset: 'production',
  plugins: [deskTool()],
  schema: {
    types: schemas,
  },
});
