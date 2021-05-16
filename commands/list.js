const Discord = require('discord.js');

module.exports = {
    name: "list",
    description: "Listing all documentation shortcuts",
    execute(message, args, urls) {
        let embed = new Discord.MessageEmbed();
        
        embed.setColor('0xff0000');
        embed.setTitle('Documentation list');
        const count = urls.length;
        let list = "i found following documentations for you i found " + count + " documentations in my registry \n";
        urls.map((url) => {
            console.log(url)
            list += " " + url.name + " => " + url.url + "\n";
        });

        embed.setDescription(list)
        message.channel.send(embed);
    }
}