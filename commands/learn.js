module.exports = {
    name: 'learn',
    description: 'Make DocsBot learning a new path to a current documentation site with a new url',
    execute(message, args, urls) {
        let documentation = urls.filter((url) => url.name === args[0]);

        if (args.length < 1) {
            message.channel.send("I need to learn a name for the documentation");
        } else {
            if (documentation.length) {
                if (args[0] === documentation[0].name) {
                    message.channel.send(`I know the documentation ${args[0]} run /docs ${args[0]}`);
                } else {
                    documentation[0].name = args[0];
                    message.channel.send(`Documentation ${args[0]} name updated -> ${args[0]}`);
                    return;
                }

                if (args[1] && args[1] != documentation[0].url) {
                    documentation[0].url = args[1];
                    message.channel.send(`Documentation ${args[0]} url updated -> ${args[1]}`); return;
                } else {
                    message.channel.send(`I know the requested url to the documentation ${args[0]} run /docs ${args[0]}`);
                    return;
                }
            } else {
                let newDocumentation = {
                    name: args[0],
                    url: ""
                };

                if ( !args[1] ) {
                    message.channel.send("I need to learn a url path for the documentation");
                } else {
                    newDocumentation.url = args[1];
                    urls.push(newDocumentation);
                    message.channel.send(`I have now learned the documentation to "${newDocumentation.name}" with following url: "${newDocumentation.url}"`);
                }
            }
        }
    }
}