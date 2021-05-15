const Discord = require('discord.js');
const fileSystem = require('fs');
const client = new Discord.Client();

const command_prefix = "-";

client.commands = new Discord.Collection();
 
/**
 * scanning through commands folder
 */
const commandFiles = fileSystem.readdirSync('./commands/').filter(file => file.endsWith('.js'));

/**
 * require each found command
 */
for (const file of commandFiles) {
    console.log("Loading command: " + file)
    const command = require(`./commands/${file}`);
 
    client.commands.set(command.name, command);
}

client.once('ready', () => {
    console.log('DocsBot is online!');
})

/**
 * define default messaging embed information
 */
let embed = new Discord.MessageEmbed().setColor('0xff0000');

let urls = [
    { name: "laravel", url: "https://laravel.com/docs" },
    { name: "typescript", url: "https://typescriptlang.org/docs/handbook" },
    { name: "mysql", url: "https://mysql.org/doc" },
    { name: "python", url: "https://docs.python.org" },
    { name: "django", url: "https://docs.djangoproject.com" },
    { name: "c#", url: "https://docs.microsoft.com/en-us/dotnet/csharp" },
    { name: "php", url: "https://php.net/docs" }
    { name: "react", url: "https://reactjs.org/docs" }
    { name: "vue", url: "https://php.net/docs" }
]

/**
 * fire a command on a / command message
 */
client.on('message', message => {

    /**
     * validate author is not bot or the message starts with "/"
     */
    if (message.content.startsWith(command_prefix) || message.author.bot) {
        return;
    }

    /**
     * create arguments array to use when executing commands
     */
    const args = message.content.slice(command_prefix.length).split(" ");
    const command = args.shift().toLowerCase();

    /**
     * if message is /ping
     * executing ping command /commands/ping.js
     */
    if (command === 'ping') {
        client.commands.get('ping').execute(message, args)
    }

    /**
     * if message is /help
     * Showing help for commands list /commands/help.js
     */
    if (command === "help") {
        client.commands.get('help').execute(message, args)
    }

    /**
     * if message is /docs
     * executing docs command, generating a shortcut to requested language or framework => /docs laravel blade -> https://laravel.com/docs/blade
     */
    if (command === "docs") {
        client.commands.get('docs').execute(message, args, urls)
    }

    /**
     * if message is /learn
     * executing learn command to tell DocsBot a new path to a documentation site
     */
    if (command === "learn") {
        client.commands.get('learn').execute(message, args)
    }
})

client.login('ODQzMTYyMzMwMzc1NjUxMzQ4.YJ_2HA.7-0QAS7swkGwEyD3ZCvojB0P7E8');
