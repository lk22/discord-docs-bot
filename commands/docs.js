const Discord = require('discord.js');

const dns = require('dns');

let embed = new Discord.MessageEmbed().setColor('0xff0000');

module.exports = {
    name: "docs",
    description: "docs command to grant you the shortcut to you searching documentation",
    execute(message, args, urls) {
        // console.log(urls.filter((url) => url.name === args[0])[0].name)

        if (args.length < 1) {
            message.channel.send("I could not figure out what to lookup for your request");
        } else {
            let documentation = urls.filter((url) => url.name === args[0])[0].url; // documentation url

            let embedTitle = args[0];

            if (args[1]) {
                documentation += "/" + args[1];
                embedTitle += " " + args[1]
            }

            embedTitle += " documentation";

            // if (args.length > 0) {
            //     for (let i = 1; i < args.length; i++) {
            //         console.log(i)
            //         console.log(args[i]);
            //         if (i === args[i]) {
            //             documentation += "/" + args[i];
            //         }
            //     }
            // }
            console.log(documentation);
            
            embed.setTitle(embedTitle);
            embed.setColor("0xff0000");
            embed.setURL(documentation)
            message.channel.send(`You requested following documentation ${args[0]} ${(args[1]) ? args[1] : ''}`);
            message.channel.send(embed);
        }
    }
}