const emojiCharacters = require('../misc/emojicharacters');
const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: ':global',
    description: 'Statistics for world cases, deaths, etc',
    execute(msg, args) {
        (async () => {
            const rawResponse = await fetch('https://coronavirus-monitor.p.rapidapi.com/coronavirus/worldstat.php', {
                method: 'GET',
                headers: {
                    "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                    "x-rapidapi-key": "9b59f34ad9msh2e6730faa54d0b9p1cc2d1jsnf2b3d0fc2c43"
                }
            });
            const content = await rawResponse.json();
            let embedsay = new Discord.RichEmbed()
                .setColor('RANDOM')
                .setTitle('Worldwide statistics')
                .setThumbnail("https://i.imgur.com/TQPun1u.jpg")
                .setDescription("Statistics for world cases, deaths, etc")
                .addField(emojiCharacters.pensive + ' Total cases', content.total_cases.toString(), false)
                .addField(emojiCharacters.crying + ' Total deaths', content.total_deaths.toString(), false)
                .addField(emojiCharacters.dancing_women + ' Total recovered', content.total_recovered.toString(), false)
                .addField(emojiCharacters.new + ' New cases', content.new_cases.toString(), false)
                .addField(emojiCharacters.new + ' New deaths', content.new_deaths.toString(), false)
                .setFooter('Real time COVID-19 StatBot', 'https://i.imgur.com/TQPun1u.jpg');
            msg.channel.send(embedsay);
        })();
    }
}