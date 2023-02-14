const { defineConfig } = require("cypress");

module.exports = defineConfig({
  e2e: {
    baseUrl: "https://furbo.sk/waw",
    setupNodeEvents(on, config) {
      // implement node event listeners here
    },
  },
});
