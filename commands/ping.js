module.exports = {
    name: 'ping',
    description: 'This is a ping command for testing',
    execute(message, args) {
        message.channel.send('You pinged me! enter "/help" for commands list information');
        if (args.length > 0) {
            message.channel.send(`I dont know what to do with this argument: '${args[0]}'`)
        }
    }
}