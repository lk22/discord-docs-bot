module.exports = {
    name: 'learn',
    description: 'Make DocsBot learning a new path to a current documentation site with a new url',
    execute(message, args, urls) {
        let documentation = urls.filter((url) => url.name === args[0]);
        if (args.length < 1) {
            message.channel.send("I found no url argument to learn please provide an url i need to learn to update my documentation list");
        } else {
            /**
             * check for existing documentation name and url existence
             */
            if (documentation.name === args[0]) {
                message.channel.send(`I allready know that documentation run /docs ${args[0]}`);
            }
        }

        

        // else if (documentation.url === args[1]) {
        //     message.channel.send()
        // }
    }
}