const { SlashCommandBuilder } = require("discord.js");

const { server } = require("../../data/settings.json");
const beastResponses = require("../../data/beastResponses.json");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("beast")
    .setDescription("Sends a message as Beast Titan")
    .addUserOption(option =>
		  option.setName('user')
			  .setDescription('Whether to attach a user or not'))
    .addNumberOption(option =>
      option.setName('rule')
        .setDescription('What rule would you like to mention here?')
        .addChoices(
					{ name: 'No NSFW', value: 1 },
					{ name: 'No spam', value: 2 },
					{ name: 'Be respectful', value: 3 },
          { name: 'No advertising', value: 4 },
					{ name: 'No problematic content', value: 5 },
					{ name: 'Keep it readable', value: 6 },
          { name: 'No spoilers', value: 7 },
					{ name: 'Abide by the topic of each channel', value: 8 },
					{ name: 'No sockpuppetry or impersonation', value: 9 },
          { name: 'No shitposting or meme/topic overuse', value: 10 },
				))
    .addStringOption(option =>
      option.setName('text')
        .setDescription("If there's no specific rule, then add another description")),
  async execute(interaction, client) {

    const user = interaction.options.getUser('user');
    const rule = interaction.options.getNumber('rule');
    const text = interaction.options.getString('text');

    if (!(rule || text)) return interaction.reply({
      content: "✋ There was no input to the message, please, try again.",
      ephemeral: true
    })

    const webhook = await (client.fetchWebhook('1155403844788953098', 'fkYfldRuGH3e_echvvxVkt6R1RhWT4DkkRWILCXrxPnXVYHAVb7gucrKthr47YWN9vIm')
      .then(webhook => {return webhook})
      .catch(console.error));

    if (webhook.channelId !== interaction.channelId) {
      await webhook.edit({
        channel: interaction.channelId,
      })
        .catch(console.error);
    }

    const embed = {
      color: 0xffcd4d,
      description: text
    };

    let content;

    if (rule) {
      content = `👉 <#${server.ruleChannel}> 👇`
      
      embed.title = Object.keys(beastResponses[rule])[0], embed.description = Object.values(beastResponses[rule])[0]
    }

    if (user) content = rule ? `${user} ` + content : `${user}`;

    webhook.send({ content: content, embeds: [embed] });
  },
};