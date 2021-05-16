const Discord = require('discord.js');

const dns = require('dns');
const { URL } = require('url');

let embed = new Discord.MessageEmbed().setColor('0xff0000');

module.exports = {
    name: "docs",
    description: "docs command to grant you the shortcut to you searching documentation",
    execute(message, args, urls) {
        let documentation = urls.filter((url) => url.name === args[0]) // documentation url

        if (args.length < 1 || documentation.length < 1) {
            message.channel.send(`I dont know that you are looking for "${args[0]}" if you are sure the documentation exists i can learn the way via my /learn command`);
        } else {
            let documentation = urls.filter((url) => url.name === args[0])[0]; // documentation url
            if (documentation) {
                const name = documentation.name;
                let url = documentation.url;  

                let embedTitle = args[0];

                if (args[1]) {
                    url += "/" + args[1];
                    url += (documentation.prefix) ? documentation.prefix : "";
                    embedTitle += " " + args[1]
                }

                if (args > 1) {
                    args.map((argument) => {
                        url += "/" + argument;
                        embedTitle += " " + argument;
                    });
                }

                embedTitle += " documentation";
                embed.setTitle(embedTitle);
                embed.setColor("0xff0000");
                embed.setURL(url)
                message.channel.send(`You requested following documentation ${args[0]} ${(args[1]) ? args[1] : ''}`);
                message.channel.send(embed);
            }
        }
    }
}