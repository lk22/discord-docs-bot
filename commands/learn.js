const axios = require('axios')
const fs = require('fs');
const { url } = require('inspector');
module.exports = {
    name: 'learn',
    description: 'Make DocsBot learning a new path to a current documentation site with a new url',
    execute(message, args, urls) {
        let documentation = urls.filter((url) => url.name === args[0]);
        if (args.length < 1) {
            message.channel.send("I need to learn a name for the documentation");
        } else {
            if (documentation.length) {
                if (args[0] === documentation[0].name) {

                    const documentationCategories = documentation.categories;

                    /**
                     * assume second argument is -category= and third argument is -url to the category
                     */
                    if (args[1].indexOf("-category=") > -1 && args[2].indexOf("-url=") > -1) {
                        
                        const newCategory = (documentationCategories) ? [...documentationCategories, {
                            name: args[1].replace("-category=", ""),
                            url: args[2].replace("-url=", "")
                        }] : [
                                {
                                    name: args[1].replace("-category=", ""),
                                    url: args[2].replace("-url=", "")
                            }
                        ]

                        Object.assign(documentation[0], { categories: newCategory })

                        console.log(documentation);
                        urls.push(documentation[0]);
                        fs.open("documentations.json", 'w', (err) => {
                            if (err) { console.log(err); return; }
                            fs.writeFileSync('documentations.json', JSON.stringify(documentation, null, 2));
                        });

                        return;
                    } else {
                        message.channel.send(`I know the documentation ${args[0]} run /docs ${args[0]}`);
                    }

                } else {
                    documentation[0].name = args[0];
                    message.channel.send(`Documentation ${args[0]} name updated -> ${args[0]}`);
                    return;
                }

                if (args[1] && args[1] != documentation[0].url) {
                    documentation[0].url = args[1];
                    message.channel.send(`Documentation ${args[0]} url updated -> ${args[1]}`); return;
                } else {
                    message.channel.send(`I know the requested url to the documentation ${args[0]} run /docs ${args[0]}`);
                    return;
                }
            } else {
                let newDocumentation = {
                    name: args[0],
                    url: ""
                };

                if ( !args[1] ) {
                    message.channel.send("I need to learn a url path for the documentation");
                } else {
                    newDocumentation.url = args[1];
                    urls.push(newDocumentation);

                    fs.open("documentations.json", 'w', (err) => {
                        if (err) { console.log(err); return; }
                        fs.writeFileSync('documentations.json', JSON.stringify(urls, null, 2));
                    })

                    message.channel.send(`I have now learned the documentation to "${newDocumentation.name}" with following url: "${newDocumentation.url}" you can now run /find git to visit git documentation.`);
                }
            }
        }
    }
}

