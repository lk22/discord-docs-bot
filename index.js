const fileSystem = require('fs');
const dotenv = require('dotenv');
const env = dotenv.config();
const Discord = require('discord.js');
const client = new Discord.Client();

const docs = require('./documentations.json');
const snippets = require('./snippets.json');

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

/**
 * TODO: add snippet command to help list and snippet command to search for a specific snippet in the registry
 */
const commandsList = [
    { name: "/ping", description: "Helping you testing the bots connection status" },
    { name: "/help", description: "Grants you the command list for DocsBot" },
    { name: "/find", description: "Gives you are shortcut to existing documentation from requested arguments" },
    { name: "/list-docs", description: "Listing all documentation shortcuts" } 
];

/**
 * fire a command on a / command message
 */
client.on('message', message => {
    console.log(message);

    /**
     * validate author is not bot or the message starts with "/"
     */
    if (message.content.startsWith(command_prefix) || message.author.bot) {
        return;
    }

    /**
     * create arguments array to use when executing commandsc
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
        docs.map((doc) => {
            list += " " + doc.name + " => " + doc.url + "\n";
        });
        embed.setDescription(list)
        message.channel.send(embed); 
    }

    // if (message.content.indexOf('docs') > -1 || message.content.indexOf('docsbot') > -1 || message.content.indexOf('DocsBot') > -1) {
    //     const greeting = "Hi there im DocsBot, im you fast shortcut to your documentation type /help to see list of commands i can do";
    //     message.reply(greeting);
    // }

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
        client.commands.get('list').execute(message, args, docs, snippets);
    }

    /**
     * if message is /docs
     * executing docs command, generating a shortcut to requested language or framework => /docs laravel blade -> https://laravel.com/docs/blade
     */
    if (command === "find") {
        client.commands.get('docs').execute(message, args, docs, snippets)
    }

    /**
     * if message is /learn
     * executing learn command to tell DocsBot a new path to a documentation site
     */
    if (command === "learn") {
        if (
            message.member.roles.cache.some(role => role.name === "Admins") ||
            message.member.roles.cache.some(role => role.name === "Moderator")
        ) {
            client.commands.get('learn').execute(message, args, docs)
        } else {
            message.reply(
                "You are not allowed to trigger this command request a ressource i need to learn from an admin or moderator member"
            );
        }
    }
})

client.login(process.env.DOCS_BOT_CLIENT_KEY);