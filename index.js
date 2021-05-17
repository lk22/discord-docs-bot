const fileSystem = require('fs');
const dotenv = require('dotenv');
const env = dotenv.config();
const Discord = require('discord.js');
const client = new Discord.Client();

const docs = require('./documentations.json');

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

const commandsList = [
    { name: "/ping", description: "Helping you testing the bots connection status" },
    { name: "/help", description: "Grants you the command list for DocsBot" },
    { name: "/find", description: "Gives you are shortcut to existing documentation from requested arguments" },
    { name: "/learn", description: "Makes DocsBot learn new documentations with a path to the learning docs" },
    { name: "/list-docs", description: "Listing all documentation shortcuts" } 
];
 

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
     * let DocsBot listen for documentation related words in a message
     */
    if (
        message.content.indexOf('Documentation') > -1 ||
        message.content.indexOf('documentation') > -1 ||
        message.content.indexOf('Dokumentation') > -1 ||
        message.content.indexOf('dokumentation') > -1
    ) {
        embed.setTitle('Documentation list');
        let list = "I see you mentioned documentation in you message, i found following documentations for you \n";
        urls.map((url) => {
            list += " " + url.name + " => " + url.url + "\n";
        });
        embed.setDescription(list)
        message.channel.send(embed); 
    }

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
        client.commands.get('help').execute(message, args, commandsList)
    }

    /**
     * if command is /list
     * list all know documentations
     */
    if (command === "list-docs") {
        client.commands.get('list').execute(message, args, docs);
    }

    /**
     * if message is /docs
     * executing docs command, generating a shortcut to requested language or framework => /docs laravel blade -> https://laravel.com/docs/blade
     */
    if (command === "find") {
        client.commands.get('docs').execute(message, args, docs)
    }

    /**
     * if message is /learn
     * executing learn command to tell DocsBot a new path to a documentation site
     */
    if (command === "learn") {
        client.commands.get('learn').execute(message, args, docs)
    }
})

client.login(process.env.DOCS_BOT_CLIENT_KEY);
