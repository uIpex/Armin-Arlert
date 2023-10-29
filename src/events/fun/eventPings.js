// const fs = require("fs");

// const { Events } = require('discord.js');
// const { server, user } = require("../../data/settings.json");

// const eventRoles = require("../../data/eventRoles.json");

// module.exports = {
//   name: "ready",
//   once: true,
//   async execute(_, client) {
    
//     client.on(Events.GuildScheduledEventCreate, (event) => {
//       event.guild.roles.create({
//         name: event.name,
//         color: '#ffffff',
//         mentionable: true,
//       })
//         .then(role => {
//           eventRoles[event.id] = role.id;
          
//           fs.writeFileSync("./src/data/eventRoles.json", JSON.stringify(eventRoles, null, 2));
//         })
//         .catch(console.error);
//     });

//     client.on(Events.GuildScheduledEventDelete, (event) => {
//       event.guild.roles.delete(eventRoles[event.id])
//         .catch(console.error);

//       delete eventRoles[event.id];
//       fs.writeFileSync("./src/data/eventRoles.json", JSON.stringify(eventRoles, null, 2));
//     });

//     client.on(Events.GuildScheduledEventUpdate, (oldEvent, newEvent) => {
//       if (newEvent.status === 3)
//         newEvent.guild.roles.delete(eventRoles[newEvent.id])
//           .catch(console.error)
        
//         delete eventRoles[newEvent.id];
//         fs.writeFileSync("./src/data/eventRoles.json", JSON.stringify(eventRoles, null, 2));
//     });

//     client.on(Events.GuildScheduledEventUserAdd, async (event, user) => {
//       if (event.creatorId === user.id) return;

//       (await event.guild.members.fetch(user.id)).roles.add(eventRoles[event.id]);
//     });

//     client.on(Events.GuildScheduledEventUserRemove, async (event, user) => {
//       (await event.guild.members.fetch(user.id)).roles.add(eventRoles[event.id]);
//     });

//   },
// };