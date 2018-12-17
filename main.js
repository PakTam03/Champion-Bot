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

function randomcolor() {
    return Math.floor(Math.random() * 0xFFFFFF);
}

function permcheck(message, perm) {
    return message.member && message.channel.permissionsFor(message.member).serialize()[(perm ? perm : "CHANGE_NICKNAME")] == true ? true : false;
}

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
     if (!message.guild)
        return;
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
                await message.member.setNickname(b.join(" "));
                return message.reply("Resetted your Nickname.")
            }
        } catch (err) {
            message.reply(":warning: there wasn an error changing your nickname");
        }
    }

    // Ping
    if (msg.startsWith(prefix + 'PING')) {
        const embed = new Discord.RichEmbed().setDescription(':ping_pong: **Pong!** `' + `${Date.now() - message.createdTimestamp}` + 'ms`').setColor(0xFF0000)
        message.channel.send(embed);
        console.log(`${message.author.tag} use the ping command!`)
    }

    // Mute
    if (msg.startsWith(prefix + "MUTE")) {

        try {
            if (!permcheck(message))
                return await message.reply("you do not have permission to use this command.");
            if (!message.guild.members.get(client.user.id).hasPermission("MANAGE_ROLES"))
                return message.channel.send("I do not have `Manage Roles` permissions.");
            if (message.mentions.users.size > 0) {
                args.splice(0, 1);
                if (!args[0])
                    return message.reply("please enter the duration of the mute.");
                var time = ms(args.join(" ")) || 5 * 1000 * 60;
                var mute = message.guild.roles.find('name', 'Muted') ? message.guild.roles.find('name', 'Muted') : await(async()=>{try {var m=await message.guild.createRole({name:'Muted'});await message.guild.channels.map(async x=>{try {await x.overwritePermissions(m,{SEND_MESSAGES:true,VIEW_CHANNEL:true,ADMINISTRATOR:true})}catch (err){console.log(err)}});return m;}catch (err){console.log(err)}})();
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
            return message.channel.send("The prefix for this server is `" + prefix);
        var confirm = await simple_waiter(message,"Please type in `yes` to confirm.");
        if (confirm.content !== `yes`)
            return await message.channel.send("Seems like no prefix changing would be done today, try again another time.");
        db.set(`${message.guild.id}.prefix`, args[0].toUpperCase()).write();
        await message.channel.send(":white_check_mark: The bot command prefix has been changed to "+args[0]);
    }

    // Help
    if (msg.startsWith(prefix + 'HELP')) {
        if (!args[0]) {
            var embed = new Discord.RichEmbed().setAuthor('RMT Commands').addField('Command list', '**Ping**: Pong!.\n**Say**: Say to current channel.\n**Membercount**: Check how many members on the server.\n**Prefix**: Change bot prefix.\n**Warn**: Warning users.\n**Kick**: Kick users.\n**Ban**: Ban users.\n**Mute**: Mute users.').setColor(0x1D82B6).setThumbnail('https://images-ext-2.discordapp.net/external/L_1jxUimTurAFBToL11TK_LhYfHNDOeCt3GGCg5OwLw/http/i.imgur.com/S8WFdPc.png?width=80&height=80')
            message.channel.send({
                embed
            });

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
        embed.setColor(0x1D82B6).setTitle('Mathematic Result:').addField('input', args.join(" ")).addField('output', resp.toString())

        message.channel.send(embed);
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
        if (args[0] == "setwarn") {
            db.set(`${message.guild.id}.warn.channel`, message.channel.id).write();
            return message.channel.send("**This channel will successfully log warns.**");
        }
        if (message.mentions.users.size < 1 || message.mentions.users.first().id == message.author.id)
            return await message.reply("you didn't mention anyone.");
        if (!args[1])
            return message.channel.send("You didn't mention anything to warn");
        args.splice(0, 1);
        var member = message.mentions.users.first();
        await member.send(`**Server**: ${message.guild.name}\n**Action**: Warn\n**Reason**: ${args.join(" ")}\n**Actioned by**: ${member.tag}`);
        if (!db.get(`${message.guild.id}.members.${member.id}.warn`).value())
            db.get(`${message.guild.id}.members.${member.id}.warn`, []).write();
        db.get(`${message.guild.id}.members.${member.id}.warn`).push(args.join(" ")).write();
        await message.channel.send(`:white_check_mark: ***${member.tag} has been warned.***`);
        if (db.get(`${message.guild.id}.warn.channel`).value()) {
            if (!message.guild.channels.get(db.get(`${message.guild.id}.warn.channel`).value()))
                return db.set(`${message.guild.id}.warn`).remove("channel").write();
            await message.channel.send({embed:{color:0x1D82B6,title:`${member.tag} was warned by ${message.member.user.tag}`,description:`${args.join(" ")}`}})
        }
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
}
);


// Bot ready settings
client.on('ready', ()=>{
    console.log(`Bot name : ${client.user.tag}\nBot id : ${client.user.id}\nBot owner: ${ownername}\nBot owner id: ${owner}\nBot token : ${token}\nBot in guilds count : ${client.guilds.size}\nAll users count : ${client.users.size}\nBot prefix : ${core_prefix}`)
    client.user.setStatus('online')
}
)

// Bot Login
client.login(process.env.token);
