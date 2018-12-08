const first = Date.now();
// Starts
const Discord = require('discord.js');
// Discord.js Package.
const weather = require('weather-js');
// Weather Package.
const low = require('lowdb');
// Lowdb Package.
const fs = require('fs');
// Fs, File Pakcage

// Bot Settings
const config = require('./config.json')
// Config File
const client = new Discord.Client()
// Added new client for bot.
const token = process.env.token;
// Bot toke
var core_prefix = config.prefix
// Bot prefix.
const ownername = config.ownername
// Bot owner name.
const owner = config.owner
// Bot owner id.
const version = 1.7;
// Bot version
const library = 'Node.js';
// Bot Libraly
const FileSync = require('lowdb/adapters/FileSync');
// File Sync lowdb Settings.
const adapter = new FileSync('database.json');
const db = low(adapter);
const ms = require('ms');
const math = require('mathjs');
const moment = require('moment');

// Command for db
db.defaults({
    histoires: []
});

// Cool Down
var cooldown = {};

// File
// Functions　
function hook(channel, title, message, color, avatar) {
    // This function uses quite a few options. The last 2 are optional.

    // Reassign default parameters - If any are blank.
    if (!channel)
        return console.log('Channel not specified.');
    if (!title)
        return console.log('Title not specified.');
    if (!message)
        return console.log('Message not specified.');
    if (!color)
        color = 'd9a744';
    // This is an optional variable. Therefore the default HEX color will be whatever you post there. Mine will be d9a744
    if (!avatar)
        avatar = 'https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png'
    // This is also an optional variable, you can change the default to any icon.

    // We want to remove spaces from color & url, since they might have it on the sides.
    color = color.replace(/\s/g, '');
    avatar = avatar.replace(/\s/g, '');

    // This is the start of creating the webhook
    channel.fetchWebhooks()// This gets the webhooks in the channel
    .then(webhook=>{

        // Fetches the webhook we will use for each hook
        let foundHook = webhook.find('name', 'Webhook');
        // You can rename 'Webhook' to the name of your bot if you like, people will see if under the webhooks tab of the channel.

        // This runs if the webhook is not found.
        if (!foundHook) {
            channel.createWebhook('Webhook', 'https://cdn4.iconfinder.com/data/icons/technology-devices-1/500/speech-bubble-128.png')// Make sure this is the same thing for when you search for the webhook. The png image will be the default image seen under the channel. Change it to whatever you want.
            .then(webhook=>{
                // Finally send the webhook
                webhook.send('', {
                    "username": title,
                    "avatarURL": avatar,
                    "embeds": [{
                        "color": parseInt(`0x${color}`),
                        "description": message
                    }]
                }).catch(error=>{
                    // We also want to make sure if an error is found, to report it in chat.
                    console.log(error);
                    return channel.send('**Something went wrong when sending the webhook. Please check console.**');
                }
                )
            }
            )
        } else {
            // That webhook was only for if it couldn't find the original webhook
            foundHook.send('', {
                // This means you can just copy and paste the webhook & catch part.
                "username": title,
                "avatarURL": avatar,
                "embeds": [{
                    "color": parseInt(`0x${color}`),
                    "description": message
                }]
            }).catch(error=>{
                // We also want to make sure if an error is found, to report it in chat.
                console.log(error);
                return channel.send('**Something went wrong when sending the webhook. Please check console.**');
            }
            )
        }

    }
    )

}

const help = {
    "setnick": {
        title: "setnick",
        description: "*Change the nickname of a user.*\n**Usage**:\n`setnick [user] [new nickname]`\n**Example**:\n`!setnick @๖̶̶̶ۣۣۜۜ͜ζ͜͡ιкнωαη#7071 ikhwan`",
        color: 0x1D82B6
    },
    "ping": {
        title: "ping",
        description: "*Ping the bot*\n**Usage**:\n`ping`\n**Example**:\n`!ping`",
        color: 0x1D82B6
    }, 
    "roll": {
        title: "roll",
        description: "*Roll the dice*\n**Usage**:\n`roll`\n**Example**:\n`!roll`",
        color: 0x1D82B6
    },
    "cat": {
        title: "cat",
        description: "*Find some cute cat pictures*\n**Usage**:\n`cat`\n**Example**:\n`!cat`",
        color: 0x1D82B6
    }, 
    "poll": {
        title: "poll",
        description: "**\n**Usage**:\n``\n**Example**:\n`!`",
        color: 0x1D82B6
    },
    "dog": {
        title: "dog",
        description: "*Find some cute dog pictures*\n**Usage**:\n`dog`\n**Example**:\n`!dog`",
        color: 0x1D82B6
    },

    "mute": {
        title: "mute",
        description: "**\n**Usage**:\n``\n**Example**:\n`!`",
        color: 0x1D82B6
    },
    "prefix": {
        title: "prefix",
        description: "**\n**Usage**:\n``\n**Example**:\n`!`",
        color: 0x1D82B6
    },
    "game": {
        title: "game",
        description: "**\n**Usage**:\n``\n**Example**:\n`!`",
        color: 0x1D82B6
    },
    "help": {
        title: "help",
        description: "**\n**Usage**:\n``\n**Example**:\n`!`",
        color: 0x1D82B6
    },
    "math": {
        title: "math",
        description: "**\n**Usage**:\n``\n**Example**:\n`!`",
        color: 0x1D82B6
    },
    "about": {
        title: "about",
        description: "**\n**Usage**:\n``\n**Example**:\n`!`",
        color: 0x1D82B6
    },
    "purge": {
        title: "purge",
        description: "**\n**Usage**:\n``\n**Example**:\n`!`",
        color: 0x1D82B6
    },
    "warn": {
        title: "warn",
        description: "***\n**Usage**:\n``\n**Example**:\n`!`",
        color: 0x1D82B6
    },
    "uptime": {
        title: "uptime",
        description: "**\n**Usage**:\n``\n**Example**:\n`!`",
        color: 0x1D82B6
    },
    "creation": {
        title: "creation",
        description: "**\n**Usage**:\n``\n**Example**:\n`!`",
        color: 0x1D82B6
    },
    "kick": {
        title: "kick",
        description: "**\n**Usage**:\n``\n**Example**:\n`!`",
        color: 0x1D82B6
    },
    "": {
        title: "ban",
        description: "**\n**Usage**:\n``\n**Example**:\n`!`",
        color: 0x1D82B6
    },
    "": {
        title: "invite",
        description: "**\n**Usage**:\n``\n**Example**:\n`!`",
        color: 0x1D82B6
    },
    "": {
        title: "say",
        description: "**\n**Usage**:\n``\n**Example**:\n`!`",
        color: 0x1D82B6
    },
    "": {
        title: "membercount",
        description: "**\n**Usage**:\n``\n**Example**:\n`!`",
        color: 0x1D82B6
    },
    "": {
        title: "userinfo",
        description: "**\n**Usage**:\n``\n**Example**:\n`!`",
        color: 0x1D82B6
    },
    "": {
        title: "serverinfo",
        description: "**\n**Usage**:\n``\n**Example**:\n`!`",
        color: 0x1D82B6
    },
    "": {
        title: "weather",
        description: "**\n**Usage**:\n``\n**Example**:\n`!`",
        color: 0x1D82B6
    },
    "": {
        title: "setstatus",
        description: "**\n**Usage**:\n``\n**Example**:\n`!`",
        color: 0x1D82B6
    },
    "": {
        title: "setgame",
        description: "**\n**Usage**:\n``\n**Example**:\n`!`",
        color: 0x1D82B6
    },
    "": {
        title: "adv",
        description: "**\n**Usage**:\n``\n**Example**:\n`!`",
        color: 0x1D82B6
    },
    "": {
        title: "reload",
        description: "**\n**Usage**:\n``\n**Example**:\n`!`",
        color: 0x1D82B6
    },
    "": {
        title: "",
        description: "**\n**Usage**:\n``\n**Example**:\n`!`",
        color: 0x1D82B6
    },
    "": {
        title: "",
        description: "**\n**Usage**:\n``\n**Example**:\n`!`",
        color: 0x1D82B6
    }
};

const games = {
    "pc": {
         "r6s": {
             embed: {
                title: "Rainbow Six Siege",
                thumbnail: {url: "https://cdn.mos.cms.futurecdn.net/7JPZ4vWJNZbLhbekpAUvMd-650-80.jpg"},
                description: "**__Description__**\n***Tom Clancy's Rainbow Six Siege*** is a tactical shooter video game developed by Ubisoft Montreal and published by Ubisoft. It was released worldwide for Microsoft Windows, PlayStation 4, and Xbox One on December 1, 2015. The game puts heavy emphasis on environmental destruction and cooperation between players. Each player assumes control of an attacker or a defender in different gameplay modes such as rescuing a hostage defusing a bomb, and taking control of a capture point. The title has no campaign but features a series of short missions that can be played solo. These missions have a loose narrative, focusing on recruits going through training to prepare them for future encounters with the White Masks, a terrorist group that threatens the safety of the world.\n\n**__Release__**\nDecember 1, 2015\n\n**__Developer__**\nUbisoft Montreal.\n\n**__Website__**\n[Rainbow Six Siege](https://rainbow6.ubisoft.com)",
            }
       },
         "ow": {
             embed: {
                title: "Overwatch",
                thumbnail: {url: "https://cdn.mos.cms.futurecdn.net/t3iX3o2552asFXFqmkjgDZ-650-80.jpg"},
                description: "**__Description__***\n**Overwatch*** is a team-based multiplayer first-person shooter video game developed and published by Blizzard Entertainment, which released on May 24, 2016 for PlayStation 4, Xbox One, and Windows. Described as a hero shooter, Overwatch assigns players into two teams of six, with each player selecting from a roster of nearly 30 characters, known as heroes, each with a unique style of play whose roles are divided into three general categories that fit their role. Players on a team work together to secure and defend control points on a map or escort a payload across the map in a limited amount of time. Players gain cosmetic rewards that do not affect gameplay, such as character skins and victory poses, as they play the game. The game was initially launched with casual play, with a competitive ranked mode, various 'arcade' game modes, and a player-customizable server browser subsequently included following its release. Additionally, Blizzard has added new characters, maps, and game modes post-release, all free of charge, with the only additional cost to players being optional loot boxes to earn cosmetic items.\n\n**__Release__**\nMay 24, 2016\n\n**__Developer__**\nBlizzard Entertainment.\n\n**__Website__**\n[Overwatch](https://playoverwatch.com)",
            }
       },
         "fortnite": {
             embed: {
                title: "Fortnite Battle Royale",
                thumbnail: {url: "https://cdn.mos.cms.futurecdn.net/2tQwy2gEsnLtmJfZtNoymY-650-80.jpg"},
                description: "**__Description__***\n**Fortnite*** is an online video game first released in 2017 and developed by Epic Games. It is available as separate software packages having different game modes that otherwise share the same general gameplay and game engine. The game modes include Fortnite: Save the World, a cooperative shooter-survival game for up to four players to fight off zombie-like creatures and defend objects with fortifications they can build, and Fortnite Battle Royale, a free-to-play battle royale game where up to 100 players fight to be the last person standing. Both game modes were released in 2017 as early access titles; Save the World is available only for Windows, macOS, PlayStation 4, and Xbox One, while Battle Royale has been released for those platforms in addition for Nintendo Switch, iOS and Android devices\n\n**__Release__**\nJuly 25, 2017\n\n**__Developer__**\nEpic Games\n\n**__Website__**\n[Fortnite](https://www.epicgames.com/fortnite/)",
            }
       },
         "pubg": {
             embed: {
                title: "PlayerUnknown's Battlegrounds",
                thumbnail: {url: "https://cdn.mos.cms.futurecdn.net/p5xpJzmH4NSNFvSbxbFLEP-650-80.jpg"},
                description: "**__Description__**\n***PlayerUnknown's Battlegrounds (PUBG)*** is an online multiplayer battle royale game developed and published by PUBG Corporation, a subsidiary of South Korean video game company Bluehole. The game is based on previous mods that were created by Brendan PlayerUnknown Greene for other games using the film Battle Royale for inspiration, and expanded into a standalone game under Greene's creative direction. In the game, up to one hundred players parachute onto an island and scavenge for weapons and equipment to kill others while avoiding getting killed themselves. The available safe area of the game's map decreases in size over time, directing surviving players into tighter areas to force encounters. The last player or team standing wins the round.\n\n**__Release__**\nDecember 20, 2017\n\n**__Developer__**\nPUBG Coporation\n\n**__Website__**\n[PlayerUnknowns Battlegrounds](https://www.pubg.com)",
            }
       },
         "rl": {
             embed: {
                title: "Rocket League",
                thumbnail: {url: "https://cdn.mos.cms.futurecdn.net/aDbfB32RFosMfec2cDnBiW-650-80.jpg"},
                description: "**__Description__**\n***Rocket League*** is a vehicular soccer video game developed and published by Psyonix. The game was first released for Microsoft Windows and PlayStation 4 in July 2015, with ports for Xbox One, macOS, Linux, and Nintendo Switch being released later on. In June 2016, 505 Games began distributing a physical retail version for PlayStation 4 and Xbox One, with Warner Bros. Interactive Entertainment taking over those duties by the end of 2017.\n\n**__Release__**\nJuly 7, 2015\n\n**__Developer__**\nPsyonix\n\n**__Website__**\n[Rocket League](https://www.rocketleague.com)",
            }
       },
         "hs": {
             embed: {
                title: "Hearthstone",
                thumbnail: {url: "https://cdn.mos.cms.futurecdn.net/tBWwfiXbRHYgM7TvduewU5-650-80.jpg"},
                description: "**__Description__**\n***Hearthstone***, originally Hearthstone: Heroes of Warcraft, is a free-to-play online collectible card video game developed and published by Blizzard Entertainment. Having been released worldwide on March 11, 2014, Hearthstone builds upon the existing lore of the Warcraft series by using the same elements, characters, and relics. It was first released for Microsoft Windows and macOS, with support for iOS and Android devices being added later. The game features cross-platform play, allowing players on any supported device to compete with one another, restricted only by geographical region account limits.\n\n**__Release__**\nMarch 11, 2014\n\n**__Developer__**\nBlizzard Entertainment\n\n**__Website__**\n[Hearthstone](https://playhearthstone.com/)",

            }
       },
         "lol": {
             embed: {
                title: "League of Legends",
                thumbnail: {url: "https://cdn.mos.cms.futurecdn.net/HWqH72a34wFqPLkeBXJQt6-650-80.jpg"},
                description: "**__Description__**\n***League of Legends (abbreviated LoL)*** is a multiplayer online battle arena video game developed and published by Riot Games for Microsoft Windows and macOS. The game follows a freemium model and is supported by microtransactions, and was inspired by the Warcraft III: The Frozen Throne mod, Defense of the Ancients.[1]\n\n**__Release__**\nOctober 27, 2009\n\n**__Developer__**\nRiot Games\n\n**__Website__**\n[League of Legends]()",
            }
       },
         "gtav": {
             embed: {
                title: "Grand Theft Auto 5",
                thumbnail: {url: "https://cdn.mos.cms.futurecdn.net/Lf9fbStDf37vWxuRpPm4ud-650-80.jpg"},
                description: "**__Description__**\n***Grand Theft Auto V*** is an action-adventure video game developed by Rockstar North and published by Rockstar Games. It was released in September 2013 for PlayStation 3 and Xbox 360, in November 2014 for PlayStation 4 and Xbox One, and in April 2015 for Microsoft Windows. It is the first main entry in the Grand Theft Auto series since 2008's Grand Theft Auto IV. Set within the fictional state of San Andreas, based on Southern California, the single-player story follows three criminals and their efforts to commit heists while under pressure from a government agency. The open world design lets players freely roam San Andreas' open countryside and the fictional city of Los Santos, based on Los Angeles.\n\n**__Release__**\nSeptember 17, 2013\n\n**__Developer__**\nRockstar\n\n**__Website__**\n[Grand Theft Auto 5](https://www.rockstargames.com/V/restricted-content/agegate/form?redirect=https%3A%2F%2Fwww.rockstargames.com%2FV%2F&options=&locale=en_us)",
            }
       },
         "csgo": {
             embed: {
                title: "Counter-Strike: Global Offensive",
                thumbnail: {url: "https://vignette3.wikia.nocookie.net/cswikia/images/5/50/Wiki-background/revision/latest?cb=20151023021401"},
                description: "**__Description__**\n***Counter-Strike: Global Offensive (CS:GO)*** is a multiplayer first-person shooter video game developed by Hidden Path Entertainment and Valve Corporation. It is the fourth game in the Counter-Strike series and was released for Microsoft Windows, OS X, Xbox 360, and PlayStation 3 in August 2012, with the Linux version released in September 2014. The game pits two teams against each other: the Terrorists and the Counter-Terrorists. Both sides are tasked with eliminating the other while also completing separate objectives, the Terrorists, depending on the game mode, must either plant the bomb or defend the hostages, while the Counter-Terrorists must either prevent the bomb from being planted, defuse the bomb, or rescue the hostages. There are eight game modes, all of which have distinct characteristics specific to that mode.\n\n**__Release__**\nAugust 21, 2012\n\n**__Developer__**\nValve Corporation\n\n**__Website__**\n[Counter-Strike: Global Offensive](http://blog.counter-strike.net)",
            }
       },
         "dota": {
             embed: {
                title: "Dota 2",
                thumbnail: {url: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQZk7S5Vh7YfjnrGFSRWPh_kJG9E1xh0LHGpAE7oiGGo_DVNTLrjQ"},
                description: "**__Description__**\n***Dota 2*** is a multiplayer online battle arena (MOBA) video game developed and published by Valve Corporation. The game is a sequel to Defense of the Ancients (DotA), which was a community-created mod for Blizzard Entertainment's Warcraft III: Reign of Chaos and its expansion pack, The Frozen Throne. Dota 2 is played in matches between two teams of five players, with each team occupying and defending their own separate base on the map. Each of the ten players independently controls a powerful character, known as a hero, who all have unique abilities and differing styles of play. During a match, players collect experience points and items for their heroes to successfully defeat the opposing team's heroes in player versus player combat. A team wins by being the first to destroy a large structure located in the opposing team's base, called the Ancient.\n\n**__Release__**\n*Windows*: July 9, 2013\n*Linux/OS X*: July 18, 2013\n\n**__Developer__**\nValve Corporation\n\n**__Website__**\n[Dota 2](http://blog.dota2.com)",
            }
       },
    },
    "mobile": {
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },   
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
    },
    "xbox": {
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
    },
    "playstation": {
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
         "": {
             embed: {
                title: "",
                thumbnail: {url: "www.google.com"},
                description: "**__description__**\n\n\n**__Release__**\n\n\n**__Developer__**\n\n\n**__Website__**\n"
            }
       },
    }
};

function capper(string, option) {
  if (string && string.split) {
    string = string.split("");
    string[0] = string[0].toUpperCase();
    if (option && option == first ) return string.join("");
    string.forEach((x, i)=>{
      if (x == " " && x[i+1]) {
        string[x+i] = string[x+i].toUpperCase();
      }
    });
    return string.join("");
  } else {
    return '';
  }
}

// Const
const Random = ["https://i.imgur.com/BZhCIrX.gif", "https://i.imgur.com/VkCWPV2.gif", "https://i.imgur.com/3X9dmME.gif", "https://i.imgur.com/Gd2pPvf.gif", "https://i.imgur.com/S8b93f1.gif", "https://i.imgur.com/K8IuaSM.gif", "https://i.imgur.com/YB3y4MT.gif", "http://i.imgur.com/OTAeXcf.jpg", "http://i.imgur.com/ZYn8zWH.jpg", "http://i.imgur.com/piDWdUz.jpg", "https://i.imgur.com/aZtGZHN.gif", "https://i.imgur.com/TBShA0f.gif", "https://i.imgur.com/1I5LTqm.gif", "https://i.imgur.com/KDOE0hn.gif", "https://i.imgur.com/1iVFb8H.gif", "https://i.imgur.com/N8ShK7X.gif", "https://i.imgur.com/OlNdzhV.gif", "https://i.imgur.com/4mBnmEy.gif", "https://i.imgur.com/TPinfUc.gif"];

const Dog = ["https://i.imgur.com/xhcCg7a.jpg", "https://i.imgur.com/XMPh4JW.jpg", "https://i.imgur.com/aArK2iB.jpg", "https://i.imgur.com/mT9QBVd.jpg", "https://i.imgur.com/77L3O3j.jpg", "https://i.imgur.com/h9vW5Ul.jpg", "https://i.imgur.com/ZgFwtCJ.jpg", "https://i.imgur.com/EzPOGXv.jpg", "https://i.imgur.com/MfdfllP.jpg", "https://i.imgur.com/am0IK2X.jpg"];

const Roll = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

function randomcolor() {
    return Math.floor(Math.random() * 0xFFFFFF);
}

function permcheck(message, perm) {
    return message.member && message.channel.permissionsFor(message.member).serialize()[(perm ? perm : "VIEW_AUDIT_LOG")] == true ? true : false;
}

// Verify System
client.on('message', (message)=>{
    if (message.channel.id == "514172033882390551" && message.content == "agree") {
        message.delete();
        return message.member.addRole(message.guild.roles.find('name', 'Verified'));
    }
}
)

function simple_waiter(message, text, filter) {
    return new Promise(async function(resolve, reject) {
        filter = filter ? filter : x=>x.author.id == message.author.id
        try {
            var msg = await message.channel.send(text);
            var messages = await message.channel.awaitMessages(filter,{max:1,time:30000,errors:['time']});
            resolve(messages.array()[0]);
        } catch (err) {
            console.log(err);
            msg.delete();
            reject(false);
        }
    }
    );
}

// Quick Commands
client.on('message', async message=>{
    if (!message.guild) return;
    if (db.get(`${message.guild.id}.prefix`).value()) {
        var prefix = db.get(`${message.guild.id}.prefix`).value().toUpperCase();
    } else {
        var prefix = config.prefix;
    }
    if (message.mentions.users.size > 0 && message.mentions.users.first().id == client.user.id) {
      var prefix = `${message.guild.members.get(client.user.id)} `;
    } 
    // Variables - Variables make it easy to call things, since it requires less typing.
    let msg = message.content.toUpperCase();
    // This variable takes the message, and turns it all into uppercase so it isn't case sensitive.
    let sender = message.author;
    // This variable takes the message, and finds who the author is.
    var args = message.content.split(' ').slice(1);
    let argresult = args.join(' ');
    let question = message.content.slice(prefix.length).split(" ").slice(1);
    let cont = message.content.slice(prefix.length).split(" ");
    // This variable slices off the prefix, then puts the rest in an array based off the spaces
    let arg = cont.slice(1);
    // This slices off the command in cont, only leaving the arguments.
  
    // Change Nickname
    if (msg.startsWith(prefix + "SETNICK")) {
        try {
            msg = msg.replace(/\s{2,}/gmi, ' ');
            message.content = message.content.replace(/\s{2,}/gmi, ' ');
            var verification = message.member && message.channel.permissionsFor(message.member).serialize()["MANAGE_NICKNAMES"] == true ? true : false;
            if (message.mentions.users.size > 0) {
                if (!verification)
                    return message.reply("**✋ You don't have permission to use this command!**");
                if (!msg.split(" ")[2])
                    return message.reply("**write a name to change to.**");
                var b = message.content.split(" ");
                b.splice(0, 2);
                var member = await message.guild.members.get(message.mentions.users.first().id).setNickname(b.join(" "));
                await message.channel.send(`${message.mentions.users.first().nickname?message.mentions.users.first().nickname:message.mentions.users.first()}**'s name was changed to ${member.nickname}**`)
            } else if (message.mentions.users.size < 1 && msg.split(" ")[1]) {
                var b = message.content.split(" ");
                b.splice(0, 1);
                var member = await message.member.setNickname(b.join(" "));
                await message.channel.send(`${message.member.nickname?message.member:message.member.user.tag}'s name was changed to ${member.nickname}`)
            } else {
                return message.reply("**You need to mention a user! 👤**")
            }
        } catch (err) {
            message.reply(":warning: there wasn an error changing your nickname");
        }
    }
  
    // Ping
    if (msg.startsWith(prefix + 'PING')) {
        const embed = new Discord.RichEmbed().setDescription(' **Bot Ping is  `' + `${Date.now() - message.createdTimestamp}` + ' MS 📶`**').setColor(0x1D82B6)
        message.channel.send(embed);
        console.log(`${message.author.tag} use the ping command!`)
    }

    // Roll
    if (msg.startsWith(prefix + 'ROLL')) {
        var embed = new Discord.RichEmbed().setDescription(message.author.toString() + '**' + " , You Roll " + "`" + Roll[Math.floor(Math.random() * Roll.length)] + "`" + '**').setColor(0x1D82B6)
        message.channel.send({
            embed
        });
        console.log(`${message.author.tag} use the roll command!`)
    }

    // Animal
    if (msg.startsWith(prefix + 'CAT')) {

        message.channel.sendFile(Random[Math.floor(Math.random() * Random.length)]);
        console.log(`${message.author.tag} use the cat command!`)
    }
    if (msg.startsWith(prefix + 'DOG')) {

        message.channel.sendFile(Dog[Math.floor(Math.random() * Dog.length)]);
        console.log(`${message.author.tag} use the dog command!`)
    }
  
    // Poll
    if (msg.startsWith(prefix + "POLL")) {
        if(!args[0])
          return message.channel.send(`${prefix}poll <question>`);
    
        const embed = new Discord.RichEmbed()
            .setColor(0xffffff)
            .setFooter('✅ Yes')
            .setFooter('❌ No')
            .setFooter('React to vote')
            .setDescription(args.join(' '))
            .setTitle(`Poll created by: ${message.author.username}`);
        
        let msg = await message.channel.send(embed);
      
        await msg.react('✅');
        await msg.react('❌');
    }

    // Mute
    if (msg.startsWith(prefix + "MUTE")) {

        try {
            if (!permcheck(message)) return await message.reply("you do not have permission to use this command.");
            if (!message.guild.members.get(client.user.id).hasPermission("MANAGE_ROLES"))
                return message.channel.send("I do not have `Manage Roles` permissions.");
            if (message.mentions.users.size > 0) {
                args.splice(0, 1);
                if (!args[0])
                    return message.reply("please enter the duration of the mute.");
                var time = ms(args.join(" ")) || 5 * 1000 * 60;
                var mute = message.guild.roles.find('name', 'Muted') ? message.guild.roles.find('name', 'Muted') : await(async()=>{try {var m=await message.guild.createRole({name:'Muted'});await message.guild.channels.map(async x=>{try {await x.overwritePermissions(m,{SEND_MESSAGES:false,VIEW_CHANNEL:true})}catch (err){console.log(err)}});return m;}catch (err){console.log(err)}})();
                var member = message.guild.member(message.mentions.users.first().id);
                if (member.roles > 1) {
                    var roles = (function() {
                        var a = [];
                        member.roles.map(x=>{
                            if (x.name == "@everyone")
                                return;
                            a.push(x.name)
                        }
                        );
                        return a;
                    }
                    );
                    var roles_save = member.roles.filter(x=>{
                        x.name !== "@everyone"
                    }
                    );
                    console.log(roles_save);
                    db.set(`${message.guild.id}.members.${member.id}.mute`, roles).write();
                    await member.removeRoles(roles_save);
                }
                await member.addRoles([message.guild.roles.get(mute.id)]);
                await message.channel.send(`${member} was muted for ${args.join(" ")}`);
                setTimeout(async()=>{
                    try {
                        member.removeRoles([mute]);
                        if (roles)
                            await member.addRoles(roles_save);
                        db.set(`${message.guild.id}.members.${member.id}`).remove('mute').write();
                    } catch (errs) {
                        console.log(errs);
                    }
                }
                , time);
            } else {
                return await message.reply("you didn't mention anyone.");
            }
        } catch (err) {
            if (err.DiscordAPIError == 'Missing Permissions')
                message.channel.send("Apparently I do not have the permissions to do that.");
            console.log(err);
        }
    }

    // Prefix
    if (msg.startsWith(prefix + "PREFIX")) {
        if (!message.member.hasPermission("ADMINISTRATOR"))
            return message.reply("only admins can use this command.");
        if (!args[0])
            return message.channel.send("The prefix for this server is `"+ prefix +"`\n\nYou can also mention the bot instead of using a prefix. Example: `@Champion#8047 help`");
        var confirm = await simple_waiter(message,"Please type in `yes` to confirm.");
        if (confirm.content !== `yes`)
            return await message.channel.send("Seems like no prefix changing would be done today, try again another time.");
        db.set(`${message.guild.id}.prefix`, args[0].toUpperCase()).write();
        await message.channel.send(":white_check_mark: The bot command prefix has been changed to "+ args[0]);
    }

    if (msg.startsWith(prefix + "GAME")) {
        if (!args[0] || !games[args[0].toLowerCase()])
            return message.channel.send(`Correct Syntax: ${prefix}game <${Object.keys(games).join("|")}> <game>`);
        if (args[0].toLowerCase() == "pc" && !args[1] )
            return message.channel.send({
              embed: {
                title: capper(args[0]) + " games",
                color: 0x1D82B6,
                description: (function(){
                  var a = '';
                  Object.keys(games[args[0].toLowerCase()]).forEach((x, i)=>{
                    a += `**${i + 1})** ${games[args[0].toLowerCase()][x].embed && games[args[0].toLowerCase()][x].embed.title ? capper(games[args[0].toLowerCase()][x].embed.title) : capper(x)} ${(games[args[0].toLowerCase()][x].embed && games[args[0].toLowerCase()][x].embed.url ? "(" + games[args[0].toLowerCase()][x].embed.url + ")" : '')}\n[ID]: \`${x}\`\n`
                  });
                  return (a !== '' ? a : 'No games currently added' );
                })()
              }
            })
        if (!Object.keys(games).includes(args[0].toLowerCase())) {
        }
        if (games[args[0].toLowerCase()][args[1].toLowerCase()].embed) games[args[0].toLowerCase()][args[1].toLowerCase()].embed.color = 0x1D82B6;
        return message.channel.send(games[args[0].toLowerCase()][args[1].toLowerCase()]);
    }
  
    // Help
    if (msg.startsWith(prefix + 'HELP')) {
        if (!args[0]) {
            var embed = new Discord.RichEmbed().setAuthor('Champion Commands').addField('**__Help Command__**', '**Help [command]**:  provides help for a command').addField('**__Misc__** »', '**Roll**: Roll the dice.\n**Userinfo**: Get user informations.\n**Serverinfo**: Get server info/stats.\n**Membercount**: Get the server member count.').addField('**__Manager__** »', '~~**listmods**: List moderators~~ :tools:\n**Prefix**: Set prefix for server.\n**Setnick**: Change the nickname of a user.\n**Purge**: Delete a number of messages from a channel.').addField('**__Info__** »', '**About**: Get bot info').addField('**__Moderator__** »', '**Ban**: Ban a member.\n**Kick**: Kick a member.\n**Warn**: Warn a member.\n**Mute**: Mute a member so they cannot type or speak, time limit in minutes.').addField('**__Fun__** »', '**Cat**: Find some cute cat pictures.\n**Dog**: Find some cute dog pictures.\n**Weather**: Get the forecast information for a location.').setColor(0x1D82B6).setThumbnail('https://images-ext-2.discordapp.net/external/L_1jxUimTurAFBToL11TK_LhYfHNDOeCt3GGCg5OwLw/http/i.imgur.com/S8WFdPc.png?width=80&height=80')
            message.author.send({
                embed
            });
            message.channel.send({
                embed: {

                    color: 0x1D82B6,
                    description: `📧 | All Commands is send for your **DM**!`

                }
            })
            console.log(`${message.author.tag} use the help command!`)
        } else if (Object.keys(help).includes(args[0].toLowerCase())) {
            await message.channel.send({embed:help[args[0].toLowerCase()]});
        }
    }

    // Math
    if (msg.startsWith(prefix + 'MATH')) {
    if (!args[0])
      return message.channel.send('Please input a calculation.');
      
    let resp;
      try { 
        resp = math.eval(args.join(' '));
        //return message.channel.send(resp);
      } catch (err) {
        return message.channel.send('Text could not be evaluated.')
        console.log(err)
      }
      
      const embed = new Discord.RichEmbed();
          embed.setColor(0x1D82B6)
          .setTitle('Mathematic Result:')
          .addField('input', args.join(" "))
          .addField('output', resp.toString())
      
      message.channel.send(embed);
    }
    // About
    if (msg.startsWith(prefix + 'ABOUT')) {

        var embed = new Discord.RichEmbed().setAuthor("Bot About »", client.user.avatarURL).addField("Commands »", prefix + "help", true).addField("Version »", version, true).addField("Library »", library).addField("Creator »","๖̶̶̶ۣۣۜۜ͜ζ͜͡ιкнωαη#7071").addField("Servers Count »", `${client.guilds.size}`).addField("Users Count »", `${client.users.size}`).addField("Website »", ':tools:').addField("Invite »", '[Champion/invite](https://discordapp.com/oauth2/authorize?client_id=515942934252748806&permissions=402679878&scope=bot)').addField("Discord »", '[Champion/discord](https://discord.gg/sx2a36p)').addField("Donate »", '[Champion/donate](https://www.patreon.com/gw_bot)').setColor(0x1D82B6).setThumbnail(client.user.avatarURL).setTimestamp().setFooter("Champion About", client.user.avatarURL)
        message.channel.send(embed);
        console.log(`${message.author.tag} use the about command!`)
    }

    // Purge
    if (msg.startsWith(prefix + 'PURGE')) {
        if (!message.member.hasPermission("MANAGE_MESSAGES"))
            return message.channel.sendMessage("**✋ You don't have permission to use this command!**");
        let messagecount = parseInt(args.join(' '));
        message.channel.fetchMessages({
            limit: messagecount
        }).then(messages=>message.channel.bulkDelete(messages));
        message.channel.sendMessage(messagecount + " messages have been purged.");
    }

    if (msg.startsWith(prefix + "WARN")) {
      //  if (!permcheck(message, "KICK_MEMBERS")) return await message.reply("you don't have the permissions to use that.");
      if (args[0] == "setwarn") { db.set(`${message.guild.id}.warn.channel`, message.channel.id).write(); return message.channel.send("**This channel will successfully log warns.**"); }
        if (message.mentions.users.size < 1 || message.mentions.users.first().id == message.author.id)
            return await message.reply("you didn't mention anyone.");
        if (!args[1])
            return message.channel.send("You didn't mention anything to warn");
        args.splice(0,1);
        var member = message.mentions.users.first();
        await member.send(`**Server**: ${message.guild.name}\n**Action**: Warn\n**Reason**: ${args.join(" ")}\n**Actioned by**: ${member.tag}`);
    if (!db.get(`${message.guild.id}.members.${member.id}.warn`).value())
            db.get(`${message.guild.id}.members.${member.id}.warn`, []).write();
        db.get(`${message.guild.id}.members.${member.id}.warn`).push(args.join(" ")).write();
        await message.channel.send(`:white_check_mark: ***${member.tag} has been warned.***`);
      if (db.get(`${message.guild.id}.warn.channel`).value()) {
        if (!message.guild.channels.get(db.get(`${message.guild.id}.warn.channel`).value())) return db.set(`${message.guild.id}.warn`).remove("channel").write();
        await message.channel.send({
          embed:{
            color: 0x1D82B6,
            title: `${member.tag} was warned by ${message.member.user.tag}`,
            description: `${args.join(" ")}`
          }
        })
      }
    }
    
    if (msg.startsWith(prefix + "UPTIME")) {
      message.channel.send({
        embed: {
          title: "Uptime",
          color: 0x1D82B6,
          description: capper(moment.duration((Date.now() - first), 'milliseconds').humanize(), 'first')
        }
      })
    }
  
    if (msg.startsWith(prefix + "CREATION")) {
      message.channel.send({
        embed: {
          title: "I was born:",
          color: 0x1D82B6,
          description: capper(moment.duration((Date.now() - new Date(client.user.createdTimestamp).getTime()), 'milliseconds').humanize() + " ago", 'first')
        }
      })
    }        
    // kick
    if (msg.startsWith(prefix + 'KICK')) {
        const embed = new Discord.RichEmbed();
        let member = message.mentions.members.first();
        let reason = message.content.split(/\s+/g).slice(2).join(" ");
        var guild = message.guild;
        if (message.mentions.users.size === 0) {
            return message.channel.sendMessage(`**${message.author} You need to mention a user! 👤**`).catch(console.error);
        }
        if (message.mentions.users.size > 1) {
            return message.channel.sendMessage(`**${message.author} You can only mention one user at a time! ⏰**`).catch(console.error);
        }
        if (reason.length === 0) {
            return message.channel.sendMessage(`**${message.author} You need to add a reason! 💬**`).catch(console.eror);
        }
        if (!message.member.hasPermission("KICK_MEMBERS"))
            return message.channel.sendMessage("**✋ You don't have permission to use this command!**");
        member.kick(reason);
        embed.setTitle("💨__User Kicked!__").setColor(0x1D82B6).setDescription(`${member} has been kicked!\n Reason: ${reason} `)
        message.channel.send({
            embed
        });

        embed.setTitle("💨__You've been kicked!__").setColor(0x1D82B6).setDescription(`You been kicked on ${guild.name} by ${message.author}!\n Reason: ${reason}`)
        message.mentions.members.first().send({
            embed
        });
    }
    // Ban
    if (msg.startsWith(prefix + 'BAN')) {
        const embed = new Discord.RichEmbed();
        let member = message.mentions.members.first();
        let reason = message.content.split(/\s+/g).slice(2).join(" ");
        var guild = message.guild;
        if (message.mentions.users.size === 0) {
            return message.channel.sendMessage(`**${message.author} You need to mention a user! 👤**`).catch(console.error);
        }
        if (message.mentions.users.size > 1) {
            return message.channel.sendMessage(`**${message.author} You can only mention one user at a time! ⏰**`).catch(console.error);
        }
        if (reason.length === 0) {
            return message.channel.sendMessage(`**${message.author} You need to add a reason! 💬**`).catch(console.eror);
        }
        if (!message.member.hasPermission("BAN_MEMBERS"))
            return message.channel.sendMessage("**✋ You don't have permission to use this command!**");
        member.ban(reason);
        embed.setTitle("💨__User Banned!__").setColor(0x1D82B6).setDescription(`${member} has been banned!\n Reason: ${reason} :hammer:`)
        message.channel.send({
            embed
        });

        embed.setTitle("💨__You've been banned!__").setColor(0x1D82B6).setDescription(`You been banned on ${guild.name} by ${message.author}!\n Reason: ${reason}`)
        message.mentions.members.first().send({
            embed
        });
    }

    // Invite
    if (msg.startsWith(prefix + 'INVITE')) {

        message.delete()

        var embed = new Discord.RichEmbed().setDescription('[GamingWorld Invite Link](https://discordapp.com/api/oauth2/authorize?client_id=515942934252748806&permissions=402679878&scope=bot)').setColor(0x1D82B6)
        message.author.send({
            embed
        });
        message.channel.send({
            embed: {

                color: 0x1D82B6,
                description: `📭 | Bot invite link is send for your **DM**!`

            }
        })
        console.log(`${message.author.tag} use the invite command!`)

    }

    // Say
    if (msg.startsWith(prefix + 'SAY')) {
        message.delete()
        const embed = new Discord.RichEmbed().setAuthor('@' + message.author.username + '  ' + ' ' + 'Saying:').setColor(0x1D82B6).setThumbnail(message.author.avatarURL).setDescription('**' + argresult + '**')
        message.channel.send(embed)
        console.log(`${message.author.tag} use the say command!`)
    }
  
    // Membercount
    if (msg.startsWith(prefix + 'MEMBERCOUNT')) {

        var embed = new Discord.RichEmbed().setAuthor('Members').setDescription(`${message.guild.memberCount} **members on ${message.guild.name} server**`).setColor(0x1D82B6).setTimestamp()
        message.channel.send({
            embed
        });
        console.log(`${message.author.tag} use the membercount command!`)

    }

    // Serverinfo
    if (msg.startsWith(prefix + 'SERVERINFO')) {
        if (!message.channel.guild)
            return;
        const embed = new Discord.RichEmbed().setColor(0x1D82B6).setDescription('**Server Info »**').addField('Server Name »', message.guild.name, true).addField('Server ID »', message.guild.id, true).addField('Server Owner »', message.guild.owner, true).addField('Server Owner ID »', message.guild.owner.id, true).addField('Server Default Role »', message.guild.defaultRole, true).addField('Server Members »', message.guild.memberCount, true).addField('Server Verification Level »', message.guild.verificationLevel, true).addField('Server AFK Channel ID »', +message.guild.afkChannelID, true).addField('Server AFK Channel Timeout »', `${message.guild.afkTimeout / 60} minutes`, true).addField(':beginner: Server Icon URL :beginner: »', `[**Link**](${message.guild.iconURL})`, true).addField('Server Icon ID »', message.guild.icon).setThumbnail(message.guild.iconURL)

        message.channel.send({
            embed
        })
        console.log(`${message.author.tag} use the serverinfo command!`)
    }

    // Userinfo
    if (msg.startsWith(prefix + 'USERINFO')) {
        let member = message.mentions.members.first();
        const embed = new Discord.RichEmbed().setAuthor("User Info »", member.user.avatarURL).setColor(0x1D82B6).addField("UserName »", member.user.tag).addField("Discrim »", member.user.discriminator).addField("ID »", member.user.id).addField("Created At »", member.user.createdAt).addField('Roles »', '`' + member.roles.map(r=>r.name).join(', ') + '`').addField('💚 | Online Count »', `${message.guild.members.filter(m=>m.presence.status == 'online').size}`).addField('💗 | Dnd Count »', `${message.guild.members.filter(m=>m.presence.status == 'dnd').size}`).addField('💛 | Idle Count »', `${message.guild.members.filter(m=>m.presence.status == 'idle').size}`).addField('💜 | Offline Count »', `${message.guild.members.filter(m=>m.presence.status == 'offline').size}`).setThumbnail(member.user.avatarURL).setTimestamp()
        message.channel.sendEmbed(embed);
        console.log(`${message.author.tag} use the userinfo command!`)
    }

    // Weather
    if (msg.startsWith(prefix + 'WEATHER')) {

        weather.find({
            search: args.join(" "),
            degreeType: 'F'
        }, function(err, result) {
            // Make sure you get that args.join part, since it adds everything after weather.
            if (err)
                message.channel.send(err);

            // We also want them to know if a place they enter is invalid.
            if (result === undefined || result.length === 0) {
                message.channel.send('**Please enter a valid location.**')
                // This tells them in chat that the place they entered is invalid.
                return;
                // This exits the code so the rest doesn't run.
            }

            // Variables
            var current = result[0].current;
            // This is a variable for the current part of the JSON output
            var location = result[0].location;
            // This is a variable for the location part of the JSON output

            // Let's use an embed for this.
            const embed = new Discord.RichEmbed().setDescription(`**${current.skytext}**`)// This is the text of what the sky looks like, remember you can find all of this on the weather-js npm page.
            .setAuthor(`Weather for ${current.observationpoint}`)// This shows the current location of the weather.
            .setThumbnail(current.imageUrl)// This sets the thumbnail of the embed
            .setColor(0x1D82B6)// This sets the color of the embed, you can set this to anything if you look put a hex color picker, just make sure you put 0x infront of the hex
            .addField('Timezone', `UTC${location.timezone}`, true)// This is the first field, it shows the timezone, and the true means `inline`, you can read more about this on the official discord.js documentation
            .addField('Degree Type', location.degreetype, true)// This is the field that shows the degree type, and is inline
            .addField('Temperature', `${current.temperature} Degrees`, true).addField('Feels Like', `${current.feelslike} Degrees`, true).addField('Winds', current.winddisplay, true).addField('Humidity', `${current.humidity}%`, true)

            // Now, let's display it when called
            message.channel.send({
                embed
            });
            console.log(`${message.author.tag} use the weather command!`)
        })
    }

    // Setstatus
    if (msg.startsWith(prefix + 'SETSTATUS')) {
        if (!message.member.roles.find("name", "Developer")) {
            // This checks to see if they DONT have it, the "!" inverts the true/false
            message.delete()
            const embed = new Discord.RichEmbed().setDescription('**You need the** \`Bot Moderator\` ** to use this command.**')// This tells the user in chat that they need the role.
            .setColor(0x1D82B6)
            message.channel.send({
                embed
            })
            console.log(`${message.author.tag} want use the setstatus command!`)
            return;
            // this returns the code, so the rest doesn't run.
        }

        client.user.setStatus(argresult)
        message.delete()
        var embed = new Discord.RichEmbed().setDescription(`**Set Bot Status is **` + ' `' + argresult + '`').setColor(0x1D82B6)
        message.channel.send({
            embed
        });
        console.log(`${message.author.tag} use the setstatus command!`)
    }

    // Setgame
    if (msg.startsWith(prefix + 'SETGAME')) {
        if (!message.member.roles.find("name", "Developer")) {
            // This checks to see if they DONT have it, the "!" inverts the true/false
            message.delete()
            const embed = new Discord.RichEmbed().setDescription('**You need the** \`Bot Moderator\` ** to use this command.**')// This tells the user in chat that they need the role.
            .setColor(0x1D82B6)
            message.channel.send({
                embed
            })
            console.log(`${message.author.tag} want use the setgame command!`)
            return;
            // this returns the code, so the rest doesn't run.
        }

        client.user.setGame(argresult)
        message.delete()
        var embed = new Discord.RichEmbed().setDescription(`**Set Bot Game is **` + ' `' + argresult + '`').setColor(0x1D82B6)
        message.channel.send({
            embed
        });
        console.log(`${message.author.tag} use the setgame command!`)
    }

    // Adv
    if (msg.startsWith(prefix + 'ADV')) {

        if (!message.member.roles.find("name", "Developer")) {
            // This checks to see if they DONT have it, the "!" inverts the true/false
            console.log(`${message.author.tag} use the adv command!`)
            return;
            // this returns the code, so the rest doesn't run.
        }

        message.channel.send(`\`\`\`fix
Sending this message.....
\`\`\``)
        client.users.forEach(m=>{

            m.send(argresult)

        }
        )
        console.log(`${message.author.tag} use the adv command!`)
    }

    // Reload
    if (msg.startsWith(prefix + 'RELOAD')) {
        const embed = new Discord.RichEmbed().setDescription('**`Heroku reloaded...`**').setColor(0x1D82B6)
        message.channel.send(embed);
        console.log(`${message.author.tag} use the ping command!`)
    }
}
);


// Bot ready settings
client.on('ready', ()=>{
    console.log(`Bot name : ${client.user.tag}\nBot id : ${client.user.id}\nBot owner: ${ownername}\nBot owner id: ${owner}\nBot token : ${token}\nBot in guilds count : ${client.guilds.size}\nAll users count : ${client.users.size}\nBot prefix : ${core_prefix}`)
    client.user.setStatus('dnd')
    client.user.setActivity('Working on Heroku')
}
)

// Bot Login
client.login(process.env.token);
