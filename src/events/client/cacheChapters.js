// const fs = require("fs");
// const axios = require("axios");

// const { server, user } = require("../../data/settings.json");

// const mangaID = "Shingeki-No-Kyojin";
// const baseUrl = "https://cubari.moe";

// module.exports = {
//   name: "ready",
//   once: true,
//   async execute(_) {
//     const mangaSee = await axios.get(`${baseUrl}/read/api/mangasee/series/${mangaID}`);

//     const mangaDex = (await axios({
//       method: "GET",
//       url: `https://api.mangadex.org/manga/304ceac3-8cdb-4fe7-acf7-2b6ff7a60613/feed`,
//       params: {
//         translatedLanguage: ["en"],
//         includeExternalUrl: 0
//       },
//     })).data.data;

//     const { chapters } = mangaSee.data;
//     const newChapters = {}
    
//     await new Promise(async (resolve) => {
//       for (const chapter in chapters) {
//           const MDchapter = mangaDex.filter((content) => content.attributes.chapter === chapters[chapter].title.slice(8))[0];
//           // MDchapter && console.log(MDchapter.attributes.chapter, MDchapter.attributes.title)

//           newChapters[chapter] = {

//             chapter: chapters[chapter].title.slice(8),
//             title: MDchapter ? MDchapter.attributes.title : chapters[chapter].title,
//             groups: chapters[chapter].groups,
//             pages: (await axios.get(`${baseUrl}${chapters[chapter].groups[1]}`)).data

//           };
          
//           console.log(chapter)
          
//           if (chapter === "141") return resolve();

//       }
//     })

//     fs.writeFileSync('./src/data/chapters.json', JSON.stringify(newChapters, null, 2));
//   },
// };

