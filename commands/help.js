module.exports = {
    name: "help",
    description: "Command overview command for explaining DocsBot commands",
    execute(message, args, commands) {
        let commandMsg = "DocsBot is helping you giving you the documentation you are looking for in your working journey \n\n";
        commands.map((command) => {
            commandMsg += command.name + " => " + command.description + "\n";
        });

        message.channel.send(commandMsg);
    }
}