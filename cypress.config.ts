import { defineConfig } from 'cypress';

export default defineConfig({
  projectId: 'r12irm',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
    video: true
  },
});
