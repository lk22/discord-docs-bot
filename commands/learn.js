const axios = require('axios')
const fs = require('fs');
const { url } = require('inspector');
module.exports = {
    name: 'learn',
    description: 'Make DocsBot learning a new path to a current documentation site with a new url',
    execute(message, args, urls) {
        console.log(args);
        let documentation = urls.filter((url) => url.name === args[0]);
        if (args.length < 1) {
            message.reply("I need to learn a name for the documentation");
        } else {
            if (documentation.length) {
                if (args[0] === documentation[0].name) {

                    const documentationCategories = documentation[0].categories;

                    /**
                     * assume second argument is -category= and third argument is -url to the category
                     */
                    if (args[1].indexOf("-c=") > -1 && args[2].indexOf("-u=") > -1) {
                        const categoryVal = args[1].replace("-c=", "");
                        const newCategory = (documentationCategories) ? [...documentationCategories, {
                            name: categoryVal,
                            url: args[2].replace("-u=", "")
                        }] : [
                            {
                                name: categoryVal,
                                url: args[2].replace("-u=", "")
                            }
                        ];
                        
                        Object.assign(documentation[0], { categories: newCategory });

                        fs.open("documentations.json", 'w', (err) => {
                            if (err) { console.log(err); return; }
                            fs.writeFileSync('documentations.json', JSON.stringify(urls, null, 2));
                        });

                        return;
                    } else if (args[1].indexOf('-c=') > -1 && args[2].indexOf('-sc=') > -1 && args[3].indexOf('-u=') > -1) {
                        const categoryVal = args[1].replace("-c=", "")
                        const subCategoryName = args[2].replace("-sc=", "")
                        const subCategory = documentation[0].categories.filter((category) => category.name === categoryVal);

                        const links = subCategory[0].links;

                        const newSubCategory = [
                            ...links,
                            {
                                name: subCategoryName,
                                url: args[3].replace("-u=", "")
                            }
                        ];

                        Object.assign(links, newSubCategory);
                        
                        fs.open("documentations.json", 'w', (err) => {
                            if (err) { console.log(err); return; }
                            fs.writeFileSync('documentations.json', JSON.stringify(urls, null, 2));
                        });
                        return;
                    } else {
                        message.reply(`I know the documentation ${args[0].replace('-c=', '')} run /find ${args[0].replace('-c=', '')}`);
                        return;
                    }
                } else {
                    documentation[0].name = args[0];
                    message.reply(`Documentation ${args[0]} name updated -> ${args[0]}`);
                    return;
                }
            } else {
                let newDocumentation = {
                    name: args[0],
                    url: ""
                };

                if ( !args[1] ) {
                    message.reply("I need to learn a url path for the documentation");
                } else {
                    newDocumentation.url = args[1];
                    urls.push(newDocumentation);

                    fs.open("documentations.json", 'w', (err) => {
                        if (err) { console.log(err); return; }
                        fs.writeFileSync('documentations.json', JSON.stringify(urls, null, 2));
                    })

                    message.reply(`I have now learned the documentation to "${newDocumentation.name}" with following url: "${newDocumentation.url}" you can now run /find git to visit git documentation.`);
                }
            }
        }
    }
}

