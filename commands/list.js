const Discord = require('discord.js');

module.exports = {
    name: "list",
    description: "Listing all documentation shortcuts",
    execute(message, args, urls, snippets) {
        let embed = new Discord.MessageEmbed();
        
        embed.setColor('0xff0000');
        embed.setTitle('Documentation list');

        /**
         * if first command contains -s flag for snippets list all registered snippets
         */
        if (args[0] == args[0].indexOf('-s')) {
            const snippetsCount = snippets.length;
            let list = "I found follwoing snippets for you i have " + snippetsCount + "snippets in my registry";

            snippets.map((snippet) => {
                list += " " + snippet.name + " => " + snippet.content + "\n";
            });
            embed.setDescription(list);
            message.channel.send(embed);
            return false;
        } else {
            const count = urls.length;
            let list = "i found following documentations for you i found " + count + " documentations in my registry \n";
            urls.map((url) => {
                list += " " + url.name + " => " + url.url + "\n";
            });
    
            embed.setDescription(list)
            message.reply(embed);
        }

        
    }
}