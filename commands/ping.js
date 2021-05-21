module.exports = {
    name: 'ping',
    description: 'This is a ping command for testing',
    execute(message, args) {
        const author = message.author.username;

        const reply = (args.length > 0)
            ? `${author}: I dont know what to do with this argument: '${args[0]}'`
            : 'Hi ' + author + ' You pinged me! enter "/help" for commands list information'

        message.reply(reply)
    }
}