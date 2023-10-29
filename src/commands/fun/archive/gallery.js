const { SlashCommandBuilder } = require("discord.js");

const { server } = require("../../data/settings.json");

const { albums } = require("../../data/database.json");
const baseUrl = "https://cubari.moe";

module.exports = {
  data: new SlashCommandBuilder()
    .setName("gallery")
    .setDescription("View a frame image gallery, gif gallery, and more!")
    .addStringOption(option =>
		  option.setName('album')
			  .setDescription('What album would you like to see? Use /album list to see what albums there are')
        .setRequired(true))
    .addStringOption(option =>
      option.setName('category'))
    .addStringOption(option =>
      option.setName('seasontag')),
  async execute(interaction, client) {
    
    const album = albums[interaction.options.getString('album')];
    if (!album) return interaction.reply('Please attach a valid album')

    

        // Find a valid chapter
        let chapter = Object.values(chapters).filter((ch) => ch.chapter === chapterInput) 

        if (!chapter[0]) return await interaction.reply({ content: "🚫 Couldn't find the chapter you were looking for~ Try some other", ephemeral: true });
    
        let pages = chapter[0].pages;
    
        chapter = async (isNewChapter) => {
    
          if (isNewChapter) pages = Object.values(chapters).filter((ch) => ch.chapter === chapterInput)[0].pages;
    
          const embeds = {
            title: Object.values(chapters).filter((ch) => ch.chapter === chapterInput)[0].title, 
            description: `[Link](${baseUrl}/read/mangasee/${mangaID}/${chapterInput}/${pageInput}) | Ch: ${chapterInput} | Page: ${pageInput + 1}/${pages.length}`,
            image: { url: pages[pageInput] },
            color: 0x1e1f22
          };
          const components = {
            "type": 1,
            "components": [
                {
                  "type": 2,
                  "label": "<<",
                  "style": 2,
                  "custom_id": "previousChapter",
                  "disabled": chapterInput === Object.keys(chapters)[0]
                },
                {
                  "type": 2,
                  "label": "⟵",
                  "style": 2,
                  "custom_id": "previousPage"
                },
                {
                  "type": 2,
                  "label": "⟶",
                  "style": 2,
                  "custom_id": "nextPage"
                },
                {
                  "type": 2,
                  "label": ">>",
                  "style": 2,
                  "custom_id": "nextChapter",
                  "disabled": isEphemeral ? false : chapterInput === chapters[Object.keys(chapters).at(-1)].chapter || !mangaChannel && chapterInput >= spoilerLimit - 1
                },
                {
                  "type": 2,
                  "label": "🗙",
                  "style": 4,
                  "custom_id": "Exit"
                }
            ]
          }
    
          return { pages, embeds, components }
        }
    
        const { embeds, components } = await chapter();
        const message = await interaction.reply({
          embeds: [embeds],
          components: [components],
          fetchReply: true,
          ephemeral: isEphemeral
        });
    
        function Read() {
          message.awaitMessageComponent({ time: 300000, errors: ['time'] })
        .then(async (collected) => {
          const buttonID = collected.customId;
          let isNewChapter = false;
    
          if (buttonID === "Exit") return interaction.deleteReply();
    
          if (buttonID === "previousPage") {
            if (pageInput === 0) pageInput = pages.length - 1;
              else pageInput--;
          } else if (buttonID === "nextPage") {
            if (pageInput === pages.length - 1) pageInput = 0;
              else pageInput++;
          }
    
          const chapterKeys = Object.keys(chapters);
          const inputTest = Object.entries(chapters).filter((ch) => ch[1].chapter === chapterInput)[0][0]
    
          if (buttonID === "previousChapter") {
            chapterInput = chapters[chapterKeys[chapterKeys.indexOf(`${inputTest}`) - 1]].chapter, pageInput = 0;
    
            isNewChapter = true;
          } else if (buttonID === "nextChapter") {
            chapterInput = chapters[chapterKeys[chapterKeys.indexOf(`${inputTest}`) + 1]].chapter, pageInput = 0;
    
            isNewChapter = true;
          }
    
          const { embeds, components } = await chapter(isNewChapter);
    
          collected.update({
            embeds: [embeds],
            components: [components],
          });
          
          Read();
        })
        .catch((e) => {});
        }
    
        Read();
    
  },
};