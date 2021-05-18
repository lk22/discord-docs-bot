const Discord = require('discord.js');

const dns = require('dns');
const { URL } = require('url');

let embed = new Discord.MessageEmbed().setColor('0xff0000');

module.exports = {
    name: "docs",
    description: "docs command to grant you the shortcut to you searching documentation",
    execute(message, args, urls) {
        console.log(args);
        let documentation = urls.filter((url) => url.name === args[0]) // documentation url
        // console.log(documentation[0].categories);
        if (args.length < 1 || documentation.length < 1) {
            message.channel.send(`I dont know that you are looking for "${args[0]}" if you are sure the documentation exists i can learn the way via my /learn command`);
        } else {
            let documentation = urls.filter((url) => url.name === args[0])[0]; // documentation url
            if (documentation) {
                const name = documentation.name;
                let url = documentation.url;
                const categories = documentation.categories;

                let embedTitle = args[0];

                if (args[1] === "--list" && categories.length || !args[1] && categories.length) {
                    let categoryList = `I found ${categories.length} categories on ${args[0]} \n\n`;
                    categories.map((category) => {
                        categoryList += "- " + category.name + "\n";
                    });

                    let categoryEmbed = embed;
                    categoryEmbed.setTitle(args[0] + " categories");
                    categoryEmbed.setDescription(categoryList);
                    message.channel.send(categoryEmbed);

                } else if (args[0] && args[1]) {
                    const category = documentation.categories.filter((cat) => cat.name === args[1]);

                    if (category[0].name === args[1] && category[0].links) {
                        let subCategoryList = `I found ${category[0].links.length} in your request \n`;
                        
                        category[0].links.map((link) => {
                            subCategoryList += link.name + " => " + link.url + "\n";
                        });

                        let subCategoryEmbed = embed;
                        subCategoryEmbed.setTitle(args[1] + " categories");
                        subCategoryEmbed.setDescription(subCategoryList);
                        message.channel.send(subCategoryEmbed);
                    }
                } else {
                    embedTitle += " documentation";
                    embed.setTitle(embedTitle);
                    embed.setColor("0xff0000");
                    embed.setURL(url)
                    message.channel.send(`You requested following documentation ${args[0]} ${(args[1]) ? args[1] : ''}`);
                    message.channel.send(embed);
                }
                // else if (args[1]) {
                //     url += "/" + args[1];
                //     url += (documentation.prefix) ? documentation.prefix : "";
                //     embedTitle += " " + args[1]
                // } else if (args > 1) {
                //     args.map((argument) => {
                //         url += "/" + argument;
                //         embedTitle += " " + argument;
                //     });
                // }
            }
        }
    }
}