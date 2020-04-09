const emojiCharacters = require('../misc/emojicharacters');
const Discord = require('discord.js');

module.exports = {
    name: ':help',
    description: 'Help!',
    execute(msg, args) {
        let embedsay = new Discord.RichEmbed()
            .setColor('RANDOM')
            .setTitle('COVID-19 StatBot Command List')
            .setThumbnail("https://i.imgur.com/TQPun1u.jpg")
            .setDescription("Version 1.0.0")
            .addField(emojiCharacters.globe + 'Global stats', ':global', true)
            .addField(emojiCharacters.barchart + 'Country stats', ':stats [Country]', true)
            .setFooter('Real time COVID-19 StatBot', 'https://i.imgur.com/TQPun1u.jpg');
        msg.channel.send(embedsay);
    }
}