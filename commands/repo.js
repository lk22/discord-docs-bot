const axios = require('axios')

module.exports = {
    name: 'repo',
    description: 'Searching for a specific repository via github API integration following by a profile argument',
    execute(message, args) {
        console.log(args)

        if (args[0] === "-h" || args.length < 1) {
            let helpMsg = "You can make a quick lookup on a github repository or a list of repositories if no repository '-r' argument is set";
            const arguments = [
                { flag: "-u", details: "the user to find the repository at" },
                { flag: "-r", details: "The name of the repository to look after, /repo -u=octocat -r=Hello-World" }
            ];
            arguments.map((argument) => {
                helpMsg += argument.flag + " => " + argument.details + "\n";
            });
            message.reply(helpMsg)
            return;
        }

        let endpoint;

        if (args[0] && typeof args[0] !== 'undefined') {
            endpoint = `https://api.github.com/search/repositories?q=${args[0]}`;
            axios.get(endpoint).then(data => {

                const repository = data.data.items.filter((item) => item.name === args[0])

                message.reply(`You searched for following repo: ${repository[0].html_url}`);
            }).catch(err => {
                /**
                 * if not found response returned
                 */
                if (err.response.status === 404) {
                    message.reply("Could not find a repository on that name, try again");
                }
            });
        }
    }
}