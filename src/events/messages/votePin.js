const { server } = require("../../data/settings.json");

const pinLimit = 4;

module.exports = {
  name: "messageReactionAdd",
  async execute(messageReaction, user) {
    if (messageReaction.emoji.name !== "📌") return; // Must be a 📌 reaction
    if ((await messageReaction.users.fetch()).size < pinLimit) return; // If it's less than the pin limit

    messageReaction.users.reaction.remove();
    messageReaction.message.pin();
  },
};