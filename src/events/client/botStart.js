const fs = require("fs");

const { server, user } = require("../../data/settings.json");

module.exports = {
  name: "ready",
  once: true,
  async execute(_) {
    console.log(`🕊️ Armin has awoken`);
  },
};
