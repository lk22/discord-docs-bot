module.exports = {
    name: 'learn',
    description: 'Make DocsBot learning a new path to a current documentation site with a new url',
    execute(message, args) {
        if (args.length < 1) {
            message.channel.send("I found no url argument to learn please provide an url i need to learn to update my documentation list");
        } else {
            message.channel.send("")
        }
    }
}