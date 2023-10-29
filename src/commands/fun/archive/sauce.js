require('dotenv').config();
const { SlashCommandBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, StringSelectMenuBuilder } = require("discord.js");
const axios = require("axios");

const { server } = require("../../data/settings.json");
const { saucenaoapi } = process.env;

module.exports = {
  data: new SlashCommandBuilder()
    .setName("sauce")
    .setDescription("Finds the sauce of the image")
    .addAttachmentOption(option =>
		  option.setName('attachment')
			  .setDescription('Anime frame or manga panel'))
    .addStringOption(option =>
      option.setName('url')
        .setDescription('Anime frame or manga panel')),
  async execute(interaction, client) {

    const imageURL = interaction.options.getString('url') ?? interaction.options.getAttachment('attachment').url;

    const sauceData = await axios.get(`https://saucenao.com/search.php?api_key=${saucenaoapi}&output_type=2&url=${imageURL}`);
    
    const { similarity, thumbnail } = sauceData.data.results[0].header
    const { source, ext_urls, part, est_time } = sauceData.data.results[0].data

    const embed = {
      title: 'Search results returned the follows:',
      thumbnail: {
        url: thumbnail,
      },
      fields: [
        {
          name: 'Similarity',
          value: similarity,
        },
        {
          name: 'Source',
          value: `[${source}](${ext_urls}) |\n- Episode ${part} - ${est_time}`,
        },
        {
          name: 'Author',
          value: 'Some value here',
        },
      ],
    };
    

    interaction.reply({
      embeds: [embed]
    })
    
    console.log(sauceData.data.results[0])
  },
};
