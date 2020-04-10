const emojiCharacters = require('../misc/emojicharacters');
const Discord = require('discord.js');
const fetch = require('node-fetch');

module.exports = {
    name: ':stats',
    description: 'Cases of COVID-19 by country',
    execute(msg, args) {
        if(!args[0]){
            let embedsay = new Discord.RichEmbed()
                .setColor('#FF0000')
                .setTitle('Something is wrong here...')
                .setDescription('Check the command syntax')
                .addField('!stats [country]', "To get a country statistics!", true)
            msg.channel.send(embedsay);
        } else {
            let country_name = args.join(' ');
            (async () => {
                const rawResponse = await fetch('https://coronavirus-monitor.p.rapidapi.com/coronavirus/cases_by_country.php', {
                    method: 'GET',
                    headers: {
                        "x-rapidapi-host": "coronavirus-monitor.p.rapidapi.com",
                        "x-rapidapi-key": "9b59f34ad9msh2e6730faa54d0b9p1cc2d1jsnf2b3d0fc2c43"
                    }
                });
                const content = await rawResponse.json();
                let country_stat = undefined;
                for (let i = 0; i < content.countries_stat.length; i++) {
                    if (content.countries_stat[i].country_name === country_name) {
                        country_stat = content.countries_stat[i];
                    }
                }
                if(country_stat){
                    let embedsay = new Discord.RichEmbed()
                        .setColor('RANDOM')
                        .setTitle(country_stat.country_name.toString())
                        .setThumbnail("https://i.imgur.com/TQPun1u.jpg")
                        .setDescription("Statistics relating to the epidemiological situation in " + country_stat.country_name.toString())
                        .addField(emojiCharacters.pensive + ' Total cases', country_stat.cases.toString(), false)
                        .addField(emojiCharacters.crying + ' Total deaths', country_stat.deaths.toString(), false)
                        .addField(emojiCharacters.dancing_women + ' Total recovered', country_stat.total_recovered.toString(), false)
                        .addField(emojiCharacters.new + ' New cases', country_stat.new_cases.toString(), false)
                        .addField(emojiCharacters.new + ' New deaths', country_stat.new_deaths.toString(), false)
                        .addField(emojiCharacters.sad + ' Serious critical', country_stat.serious_critical.toString(), false)
                        .addField(emojiCharacters.mask + ' Active cases', country_stat.active_cases.toString(), false)
                        .setFooter('Real time COVID-19 StatBot', 'https://i.imgur.com/TQPun1u.jpg');
                    msg.channel.send(embedsay);
                }else{
                    let embedsay = new Discord.RichEmbed()
                        .setColor('#FF0000')
                        .setTitle('Something is wrong here...')
                        .setDescription('unable to get country')
                    msg.channel.send(embedsay);   
                }
                
            })();
        }
    }
}