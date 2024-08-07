const { defineConfig } = require("cypress");

module.exports = defineConfig({
  projectId: 'wmy213',
  e2e: {
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
