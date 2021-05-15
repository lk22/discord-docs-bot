module.exports = {
    name: "help",
    description: "Command overview command for explaining DocsBot commands",
    execute(message, args) {
        console.log(args);
        message.channel.send(
            "DocsBot is helping you giving you the documentation you are looking for in your working journey \n\n /ping => // helping you testing the bots connection status if you get pong back you know its online\n /help => // grants you the command list for DocsBot \n /docs {language/framework} // gives you are shortcut to the defined documentation"
        );
    }
}