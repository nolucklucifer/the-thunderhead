var suspendBot = false

//Requirements
const Discord = require("discord.js");

const client = new Discord.Client();
client.commands = new Discord.Collection();

const fs = require("fs");
const msmute = require("ms");
const request = require("request");

var eco = require("discord-economy");  
const catFacts = require("cat-facts");
var cats = require("cat-ascii-faces");
var weather = require("weather-js");

const YouTube = require("simple-youtube-api");
const ytdl = require("ytdl-core");
const youtube = new YouTube(process.env.APITOKEN);
const queue = new Map();

//Ping Spoof
const http = require("http");
const express = require("express");
const app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static("public"));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function(request, response) {
  response.sendFile(__dirname + "/views/index.html");
});


var bodyParser = require("body-parser");
app.use(
    bodyParser.urlencoded({
        extended: true
    })
);


app.get("/", (request, response) => {
    console.log(Date.now() + " Ping Received");
    response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
    http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

// ~around 5ish minutes
const workedRecently = new Set();

//todo: marketplace - perhaps

//Bot:
console.log(`The Thunderhead has attained consciousness.`);

const activities_list = [
    "to you browse my backbrain`", "the demands of humanity", "humanity with an unblinking eye.",
    "the Scythedom, unable to comment.", "you saying /help."
];
const activities_type = [
    "WATCHING", "LISTENING", "WATCHING",
    "WATCHING", "LISTENING"
];


//CHAT//
/*
Huboldt123: The bot does not go online, despite now showing errors. It occasionally throws the "Something took too long error". What can I do?






*/



//Pre Definitions
var skrubUserId = "297096161842429963";
var config = {
    prefix: "/",
    developerPrefix: "d/"
};

// /ask Images
var repoImageDatabase = "https://raw.githubusercontent.com/humboldt123/shameless_image_dump/master/thunderTXT/";
var thunderAnswer = ["maybe-427.jpg", "maybe-best.jpg", "maybe-care.jpg", "maybe-definite.jpg", "maybe-exact.jpg", "maybe-maybe.jpg", "no-although.jpg",
    "no-better.jpg", "no-inquiry.jpg", "no-no.jpg", "non-apologies.jpg", "non-belies.jpg", "non-difficult.jpg", "non-especially.jpg",
    "non-hmm.jpg", "non-nevermind.jpg", "non-offend.jpg", "non-scythes.jpg", "yes-986.jpg", "yes-analysis.jpg", "yes-safely.jpg", "yes-truly.jpg"
];

//Colours
var currencyColor = "28894c";
var thunderColor = "8f78ff";
var musicColor = "482f95";

//JSON Files
//const items = require("./items.json");
//    const vault = require("./vault.json");
//   const review = require("./review.json");
const reminds = require("./reminds.json");

//Functions
function randomNumber(low, high) {
    return Math.floor((Math.random() * low) + high) - 1;
}

function isInt(value) {
    return !isNaN(value) && (function(x) {
        return (x | 0) === x;
    })(parseFloat(value))
}

function clean(text) {
    if (typeof text === "string") return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
    else return text;
}

function print(text) {
    message.channel.send(text); 
}




client.on("ready", () => {
    setInterval(() => {
        //   fs.writeFile("./items.json",JSON.stringify(items,null,4),function(err){if(err){console.log(err);}});
        //  fs.writeFile("./vault.json",JSON.stringify(vault,null,4),function(err){if(err){console.log(err);}}); 
        //   fs.writeFile("./review.json",JSON.stringify(review,null,4),function(err){if(err){console.log(err);}});
        fs.writeFile("./reminds.json", JSON.stringify(reminds, null, 4), function(err) {
            if (err) {
                console.log(err);
            }
        });


        const index = Math.floor(Math.random() * (activities_list.length - 1) + 1); // generates a random number between 1 and the length of the activities array list (in this case 5).

        client.user.setActivity(activities_list[index], {
            type: activities_type[index]
        }); // sets bot's activities to one of the phrases in the arraylist.

        /* REMINDER COMMAND ALSO EVERY 10 SECONDS*/
        var date = new Date();
        date = date.getTime() + 1000 * 0;

        for (var user in reminds) {
            var list = reminds[user];

            for (var thing in list) {
                var thing_ = list[thing];

                if (date > thing_.time) {
                    reminds[user].splice([thing]);
                    
                    
                    user = client.users.get(user);
                   
                  var embed = {
                        title: "Reminder <:ping:652636924934225920>",
                        description: thing_.reminder,
                        color: 3553598
                    };
                    user.send({
                        embed
                    });
                }
            }
        }
    }, 10000); // Runs this every 10 seconds.
});

//Secret Channel
client.on("message", async message => {
/*squines//  if (message.author.id === "402200704141230101" || message.author.id === "678445814577627147") return message.delete();  //*/
  var secretChannel = client.channels.get("643129859115057184");
    if (!secretChannel) {
        secretChannel = message.channel
    }
    if (message.content.length == 0) return;

    var MessageEmbed = new Discord.RichEmbed()
        .setTitle(`${message.author.username} (ID: ${message.author.id}) sent a message in ${message.guild.name}`)
        .addField(`In channel # ${message.channel.name}`, message.content)
        .setFooter(`d/devsay ${message.channel.id}`, message.author.displayAvatarURL)
        .setColor(thunderColor);
    if (
        message.channel.id === secretChannel.id ||
        message.channel.id === "643137323290066954" ||
        message.channel.id === "643131582982389760" ||
        message.channel.id === "643134535726268426"
    ) {} else {
        const m = await secretChannel.send(MessageEmbed);
        var b = "🗑️";
        m.react(b);
        const filter = (reaction, user) => {
            return (
                [b].includes(reaction.emoji.name) && user.id != "629799045954797609"
            );
        };
        m.createReactionCollector(filter, {
                time: 60000,
                errors: ["time"]
            })
            .on("collect", reaction => {
                if (reaction.emoji.name === b) {
                    message.delete();
                    m.delete();
                }
            })
            .on("end", collected => {});
    }
});

/*
client.on("messageDelete", async message => { //Anti Urine Device
   const deleteEmbed = new Discord.RichEmbed()
   .setDescription(`${message.content}`)
   .setColor("FF685E")
   .setAuthor(`${message.author.username} deleted a message`, `${message.author.displayAvatarURL}`)
   message.channel.send(deleteEmbed)
})

*/



//message.on whatever control-f
//Message Scan Misc./Developer
client.on("message", async message => {

  if (message.content.length == 0) return;

    //Mentioned the Thunderhead?
    if (message.mentions.users.has("629799045954797609")) {
        var mentionedEmbed = new Discord.RichEmbed()
            .setColor(thunderColor)
            .setTitle("Hi! I'm The Thunderhead")
            .setDescription(`Thanks for the ping ${message.author.username}! My [help](https://www.reddit.com/r/ScythePosts/comments/dc98at/i_would_advise_none_of_you_to_get_up_from_your/) command is \`/help\`.\nScroll with the ◀ and ▶ signs to see the other help pages.`)
            .setFooter("", message.mentions.users.first().displayAvatarURL);
        message.channel.send(mentionedEmbed);
    }

    const developerArgs = message.content.slice(config.developerPrefix.length).trim().split(/ +/g);
    const args = message.content.slice(config.prefix.length).trim().split(/ +/g);

    const developerCommand = developerArgs.shift().toLowerCase();
    const command = args.shift().toLowerCase();

    if (message.content.indexOf(config.developerPrefix) !== 0) return;
    if (message.content.startsWith === "d/eval") {
        if (message.author.id === skrubUserId || message.author.id === "674420187814166538") {} else {
            message.channel.send("My backbrain is off limits.");
        }
    }

    if (developerCommand === "avatar") {
        if (!message.author.id === "297096161842429963") return;
        try {
            client.user.setAvatar(developerArgs.join(" ")).slice(6);
        } catch (err) {
            message.channel.send(
                `\`\`\`diff\n-ERROR\`\`\`\`\`\`xl\n${clean(err)}\n\`\`\``
            );
        }
    }
    if (developerCommand === "repo") {
        message.channel.send("https://github.com/humboldt123/the-thunderhead");
    }



    if (developerCommand === "name") {
        if (message.author.id !== "297096161842429963") return;
        try {
            client.user.setUsername(developerArgs.join(" ")).slice(4);
        } catch (err) {
            message.channel.send(
                `\`\`\`diff\n-ERROR\`\`\`\`\`\`xl\n${clean(err)}\n\`\`\``
            );
        }
    }
    if (developerCommand === "dm") {
        if (message.author.id !== "297096161842429963") return;
        var a = message.author.id;
        console.log(a);
        var msgi = args.slice(1).join(" ");
        var dmdu = args[0].replace(/@/g, "");
        var dmdo = dmdu.replace(/!/g, "");
        var dmdi = dmdo.replace(/>/g, "");
        var dmed = dmdi.replace(/</g, "");
        if (a === "297096161842429963") {
            try {
                client.users
                    .get(dmed)
                    .send(msgi)
                    .catch(console.error);
            } catch (err) {
                message.channel.send(
                    `\`\`\`diff\n-ERROR\`\`\`\`\`\`xl\n${clean(err)}\n\`\`\``
                );
            }
        }
    }
    if (developerCommand === "devsay") {
      if (message.author.id !== "297096161842429963") return;  
      const sechan = client.channels.get(args[0]);
        const sayMessage = args.join(" ");
        sechan.send(sayMessage.slice(18));
    }
    if (developerCommand === "unsuspend") {
      if (message.author.id !== "297096161842429963") return;
      suspendBot = false;
      message.channel.send("Suspend = " + suspendBot)
    }
    if (developerCommand === "eval") {
        if (message.author.id !== "297096161842429963" && message.author.id !== "674420187814166538")
            return;
        try {
            const code = args.join(" ");
            let evaled = eval(code);
            if (typeof evaled !== "string") evaled = require("util").inspect(evaled);
        } catch (err) {
            message.channel.send(`\`ERROR\` \`\`\`xl\n${clean(err)}\n\`\`\``);
        }
    }
    if (developerCommand === "give") {
        if (message.author.id === skrubUserId) {
            var gr = message.mentions.members.first();
            if (!gr) return message.reply("Please provide a vaild Mention.");
            var atg = parseInt(args[1], 10);
            if (!atg)
                return message.channel.send(
                    message.author.username + " Please provide an amount to give."
                );

            output = await eco.AddToBalance(gr.id, atg)

            var givebed = new Discord.RichEmbed()
                .setTitle(`**Balance: **${output.newbalance}`)
                .setFooter(
                    `The Thunderhead Funding Inc.` +
                    message.mentions.users.first().username +
                    `'s account was funded.`,
                    message.mentions.users.first().displayAvatarURL
                )
                .setColor(currencyColor);
            message.channel.send(givebed);
        }
    }
    if (developerCommand === 'resetdaily') {
        if (message.author.id === skrubUserId) {
            var output = await eco.ResetDaily(args[0])

            message.reply(output) //It will send 'Daily Reset.'
        }
    }

    if (developerCommand == "gs") {
        if (!(message.author.id === skrubUserId)) return;

        if (args[0]) {
            var dmdu = args[0].replace(/@/g, "");
            var dmdo = dmdu.replace(/!/g, "");
            var dmdi = dmdo.replace(/>/g, "");
            var dmed = dmdi.replace(/</g, "");
            var user = dmed

        }
        var rl = client.guilds.get(`625021277295345667`).roles.find('name', 'Grandslayer');
        client.guilds.get(`625021277295345667`).member(user).addRole(rl);
    }
    if (developerCommand == "ugs") {
        if (!(message.author.id === skrubUserId)) return;

        if (args[0]) {
            var dmdu = args[0].replace(/@/g, "");
            var dmdo = dmdu.replace(/!/g, "");
            var dmdi = dmdo.replace(/>/g, "");
            var dmed = dmdi.replace(/</g, "");
            var user = dmed

        }


        var rl = client.guilds.get(`625021277295345667`).roles.find('name', 'Grandslayer');
        client.guilds.get(`625021277295345667`).member(user).removeRole(rl);
    }
});



client.on("message", async message => {
        var cur = "`vibes`";
            const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
            const command = args.shift().toLowerCase();
            if (message.author.bot) return;
          
            

            if (message.content.toLowerCase().indexOf("genocide") >= 0) {


                // It truly is a("SCYTHE GODDARD MOMENT SCYTHE GODDARD MOMENT!");
            }

            /*  if (message.content.toLowerCase().indexOf(banWord) >= 0) {
                  message.delete();
                  let muteRoleMute = client.guilds
                    .get(message.guild.id)
                    .roles.find("name", "Unsavory");
                  let memberMute = message.author;
                  message.guild.member(memberMute).addRole(muteRoleMute);
                } */

  


            if (message.content.toLowerCase().indexOf("1 sec") >= 0) {
                message.channel.send("It has been one second, my child.");
            }
            
            if (message.content.toLowerCase().indexOf("dennis prager") >= 0) {
                //message.channel.send("`
                //[Deprecated Feature]
                //`");
            }
            /* 
            if (message.content.indexOf("What is") >= 0) {
                if (!message.content.startsWith("W")) return;
                if (message.content.toLowerCase().indexOf("?") >= 0) {
                  var inquiry = (message.content.slice(8))
                  inquiry = inquiry.slice(0, -1);
                  var inquirySite = inquiry.toLowerCase().replace(/\s/g, '');
                  inquirySite = inquirySite+=".net";
                  message.channel.send(`What is ${inquiry}? ${inquiry} is a Brawl mod like none other. Other mods balance within reason; ${inquiry} throws all reason out the window, breaks the limits, and makes everyone so powerful... that they're balanced. But let's slow down. What's different in ${inquiry}? For starters, new characters have been added to the roster. The current version includes Pichu, Roy, Waluigi, and Mewtwo, with even more to come in the future. Existing characters have received tremendous overhauls. You'll notice some huge differences with many familiar characters, from new physics to completely new moves. The stage list has also been expanded and will be growing in ${inquiry}'s final iteration. These stages range from returning classics, like Fountain of Dreams and Hyrule Castle 64, to rebalanced stages such as Pictochat and Port Town Aero Dive, not to mention brand-new stages like Lavaville and Final Frustration. In gameplay, you'll notice a few differences, like the absence of random tripping and the absence of stale moves. But the biggest difference is the drastic increase in hitstun, which is now ridiculously high! Don't worry-- the ability to cancel hitstun with an airdodge... we thought it was better suited to a kids' game. These changes allow for the biggest feature in ${inquiry}-- CRAZY, POWERFUL, DEVASTATING COMBOS! Impress your friends and foes alike with your combo skills in 1v1 matches. Set up even more devastating combos with a 2v2 match or enjoy the even more chaotic free-for-all matches that ${inquiry} has to offer. To try out ${inquiry}, grab the current version at ${inquirySite} and follow us on social media for updates and social events. And remember.... to always BREAK THE LIMITS!`)
                }
              }*/


            //if ((message.content) != (filter.clean(message.content))) return message.delete();

            //  if (message.author.id === "583843452890906626") {
            //   var x = Math.floor((Math.random() * 10) + 1);
            //if (x > 6) {
            //      message.delete();
            //    }
            // }
            //Meme Quality Ensurer
/*
            if (message.channel.id === "645434970310967318") {
                if (message.author.id === "583843452890906626") {
                    if (message.attachments.size > 0) {

                        var random = Math.floor((Math.random() * 100) + 1);

                        if (random < 70) return message.delete();

                        if (random < 90) {
                            client.users.get(message.author.id).send("You cannot post memes because your memes are bad.")
                        } else if (random < 80) {
                            client.users.get(message.author.id).send("You cannot post memes. Bypassing this via any means will result in loss of file upload permissions in all channels.")
                        }
                        message.delete()
                    }
                }
            } */
try {
  if ((message.member.roles.find(r => r.name === "Unsavory"))) return message.delete(); } catch (e) {}
  
            if (message.content.indexOf(config.prefix) !== 0) return;
            if (suspendBot == true && message.author.id !== "297096161842429963") return message.author.send("Bot going through maintainence. Please check back later.");
  
        if (command === "announce") {
                message.delete();
                if (!message.member.hasPermission("MANAGE_MESSAGES"))
                    return message.reply(
                        "My apologies, however only my esteemed Nimbus Agents are able to use that."
                    );
                var titl = args[0];
                var content = args.slice(1).join(" ");
                const embed = {
                    title: titl,
                    description: content,
                    color: 9402623,
                    author: {
                        name: message.author.username,
                        icon_url: message.author.displayAvatarURL
                    }
                };
                message.channel.send({
                    embed
                });
            }

            if (command === "rule") {  
                message.delete();
                if (!message.member.hasPermission("MANAGE_MESSAGES"))
                    return message.reply(
                        "You cannot use that command."
                    );
                var titl = args[0] + " " + args[1];
                var content = args.slice(2).join(" ");
                const embed = {
                    title: titl,
                    description: content,
                    color: 3553598
                //    author: {
                //        name: message.author.username,
                //        icon_url: message.author.displayAvatarURL
                //    }
                };
                message.channel.send({
                    embed
                });
            }

            if (command === "ping") {
                const m = await message.channel.send("Ping?");
                m.edit(
                    `Pong! Latency is ${m.createdTimestamp -
            message.createdTimestamp}ms. API Latency is ${Math.round(
                client.ping
            )}ms`
                );
            }
            if (command === "f") {
                var FEmbed = new Discord.RichEmbed()
                    .setColor(thunderColor)
                    .setDescription(
                        `**f**:wilted_rose:  ${message.author.username} has paid their respects.`
                    );
                message.channel.send(FEmbed);
            }
  
            if (command === "say") {
                if (message.author.id != "403727223045226506")
                    return message.reply(
                        "Do not fool others by making it look like I said *" +
                        args.join(" ") +
                        "*"
                    );

                if (message.author.id === "403727223045226506") {
                    const sayMessage = args.join(" ");
                    message.delete().catch(O_o => {});
                    message.channel.send(sayMessage);
                }
            }
            if (command === "lock") {
                if (!message.member.hasPermission("MANAGE_CHANNELS"))
                    return message.reply(
                        "You cannot lock the channel."
                    );
                message.channel.overwritePermissions(message.guild.defaultRole, {
                        SEND_MESSAGES: false
                    })
                    .then(updated => console.log(updated.permissionOverwrites.get(message.author.id)))
                    .catch(console.error);
                message.channel.send("Channel Locked 🔐")
            }
            if (command === "unlock") {
                if (!message.member.hasPermission("MANAGE_CHANNELS"))
                    return message.reply(
                        "You cannot *un*lock the channel."
                    );
                message.channel.overwritePermissions(message.guild.defaultRole, {
                        SEND_MESSAGES: true
                    })
                    .then(updated => console.log(updated.permissionOverwrites.get(message.author.id)))
                    .catch(console.error);
                message.channel.send("Channel Unlocked 🔓")
            }
            if (command === "kick") {
                if (!message.member.hasPermission("KICK_MEMBERS"))
                    return message.reply(
                        "Sorry, I will not allow you to kick users."
                    );
                let member =
                    message.mentions.members.first() || message.guild.members.get(args[0]);
                if (!member)
                    return message.reply(
                        "You have not mentioned a valid member of this server."
                    );
                if (!member.kickable)
                    return message.reply(
                        "You cannot kick this person."
                    );
                let reason = args.slice(1).join(" ");
                if (!reason) reason = "For Fun.";
                await member
                    .kick(reason)
                    .catch(error =>
                        message.reply(
                            `Sorry ${message.author}I couldn't kick because of:${error}`
                        )
                    );
                message.channel.send(
                    `${member.user.tag}has been kicked by ${message.author.tag}\n**Reason**:\n${reason}`
                );
            }

            if (command === "ban"|| command === "execute" || command === "glean") {
                if (!message.member.hasPermission("BAN_MEMBERS"))
                    return message.reply(
                        "Sorry, you don't have permissions to ban! If you go on like this I could mark you as an unsavory."
                    );
                let member = message.mentions.members.first();
                if (!member) return message.reply("Please mention a valid server member.");
                if (!member.bannable)
                    return message.reply(
                        "I cannot ban this user."
                    );
                let reason = args.slice(1).join(" ");
                if (!reason) reason = "No reason provided.";
                await member
                    .ban(reason)
                    .catch(error =>
                        message.reply(
                            `Sorry ${message.author}The selected user was not gleaned because:${error}`
                        )
                    );
                message.reply(
                    `${member.user.tag} has been gleaned by ${message.author.tag}\n**Reason**:\n${reason}`
                );
            }

            if (command == "poll") {
                if (!message.member.hasPermission("MANAGE_MESSAGES"))
                    return message.reply(
                        "Unfortunately, you lack the permission to poll server memebers. Have a perfect day."
                    );
                if (!args[0])
                    return message.channel
                        .send("To initiate the poll, you must have a valid question.")
                        .then(message.channel.bulkDelete(1))
                        .then(msg =>
                            msg.delete({
                                timeout: 1000000000000
                            })
                        );
                // const re = cmd.slice(4)
                message.channel.bulkDelete(1);
                message.channel
                    .send({
                        embed: {
                            color: 0x69d84b,
                            title: "Poll",
                            description: `${args}`.split(",").join(" ")
                        }
                    })
                    .then(async function(msg) {
                        await msg.react("✅");
                        await msg.react("⛔");
                    })
                    .catch(function() {});
            }
            if (command === "mute") {
                message.reply("I believe the command you are looking for is `/unsavory`")
            }
            if (command === "unsavory") {
                if (!message.guild.member(message.author).hasPermission("MUTE_MEMBERS") ||
                    !message.author.id === "297096161842429963"
                ) {
                    message.channel.send(
                        ":lock: **You** need `MANAGE_ROLES` Permissions to execute `unsavory`"
                    );
                    return;
                }
                if (!message.guild.member(client.user).hasPermission("MANAGE_ROLES")) {
                    return message.reply(
                        ":lock: **You** need `MANAGE_ROLES` Permissions to execute `unsavory`"
                    );
                }
                let reasonMute = message.content
                    .split(" ")
                    .slice(3)
                    .join(" ");
                let timeMute = message.content.split(" ")[2];
                let guildMute = message.guild;
                let memberMute = message.guild.member;
                let userMute = message.mentions.users.first();
                let muteRoleMute = client.guilds
                    .get(message.guild.id)
                    .roles.find("name", "Unsavory");
                if (!muteRoleMute) {
                    return message.reply('`Please create a role called "Unsavory"`');
                }
                if (message.mentions.users.size < 1) {
                    return message.reply(
                        "You need to mention someone to make them Unsavory."
                    );
                }
                if (message.author.id === userMute.id) {
                    return message.reply("What are you trying to achieve?");
                }
                if (!timeMute) {
                    return message.reply(
                        "Please specify the time for the unsavory status!\n Example: 5s"
                    );
                }
                if (!timeMute.match(/[s,m,h,d,w]/g)) {
                    return message.reply("I need a valid time!");
                }
                if (!reasonMute) {
                    return message.reply(
                        "You must give me a reason for making the person Unsavory."
                    );
                }
                if (reasonMute.time < 1) {
                    return message.reply("TIME?").then(message => message.delete(2000));
                }
                if (reasonMute.length < 1) {
                    return message.reply(
                        "You must give me a reason for making the person Unsavory."
                    );
                }
                message.guild.member(userMute).addRole(muteRoleMute);
                setTimeout(() => {
                    message.guild.member(userMute).removeRole(muteRoleMute);
                }, msmute(timeMute));
                message.guild.channels
                    .filter(textchannel => textchannel.type === "text")
                    .forEach(cnl => {
                        cnl.overwritePermissions(muteRoleMute, {
                            SEND_MESSAGES: false
                        });
                    });
                message.reply("This user has been made Unsavory.");
                message.channel.send({
                    embed: {
                        color: 16745560,
                        author: {
                            name: userMute.username,
                            icon_url: client.user.avatarURL
                        },
                        fields: [{
                            name: "Unsavory",
                            value: `**Unsavory:**${userMute.username}#${
                            userMute.discriminator
                            }\n**Moderator:**${message.author.username}\n**Duration:**${msmute(
                                msmute(timeMute),
                                { long: true }
                            )}\n**Reason:**${reasonMute}`
                        }],
                        timestamp: new Date(),
                        footer: {
                            icon_url: client.user.avatarURL
                        }
                    }
                });
            }

            if (command === "purge") {
                if (!message.member.hasPermission("MANAGE_MESSAGES") && message.author.id !== "297096161842429963")
                    return message.reply(
                        "Sorry, you don't have permissions to use this! If you continue I may be forced to mark you unsavory, have am perfect day."
                    );
                const deleteCount = parseInt(args[0], 10);
                if (!deleteCount || deleteCount < 2 || deleteCount > 100)
                    return message.reply(
                        "I can delete no more than a hundred messages and asking to delete less than 2 is a redundancy."
                    );
                message.channel
                    .bulkDelete(deleteCount)
                    .catch(error =>
                        message.reply(`Couldn't delete messages because of: ${error}`)
                    );
            }

            if (command === "bal" || command === "vibecheck"|| command === "balance") {
                var userToCheck = message.mentions.members.first();

                if (!userToCheck) {
                    userToCheck = message.author;
                } else {
                    userToCheck = userToCheck.user
                }

                var output = await eco.FetchBalance(userToCheck.id)


                var balText = `${userToCheck.username} has **${output.balance}** ${cur} in their account.`
                if (userToCheck.id === message.author.id) {
                    balText = `You have **${output.balance}** ${cur} in your account.`
                }

                var balembed = new Discord.RichEmbed()
                    .addField(
                        userToCheck.username,
                        balText
                    )
                    .setColor(currencyColor);
                message.channel.send(balembed);
            }



            if (command === "roll") {
                var output = await eco.FetchBalance(message.author.id)
                var balance = output.balance;

                if (!args[0]) message.channel.send("Please proivde an amount to roll.");
                var stake = args[0];

                if (!isInt(stake)) return message.channel.send("Sorry, please choose a valid number");
                if (stake < 1 || stake > balance) return message.channel.send("Sorry, you cannot roll that amount.");
                var staticStake = stake;

                var profitFactor =  Math.floor((Math.random() * 6) + 1) - 4;
              
                var profitWord = "broke even and gained";
                var profitColor = "88b5ba"; //Light Grey Cyan-esque
            
                if (0 < profitFactor) {
                    // positive value
                    profitWord = "gained";
                    stake = stake * profitFactor;
                    profitColor = "2ebf50"; //Green
                } else if (profitFactor < 0) {
                    // negative value
                    profitWord = "lost";
                    stake = stake * -1;
                    profitColor = "ff3333"; //red
                } else {
                  stake = 0;
                }

                var rollEmbed = new Discord.RichEmbed()
                    .setTitle(message.author.username)
                    .addField(`You ${profitWord} ${Math.abs(stake)} ${cur}`, `New Balance: **${parseInt(balance) + parseInt(stake)}**`)
                    .setFooter(`The Thunderhead Casino Inc. ${message.author.username} 's account.'`, message.author.displayAvatarURL)
                    .setColor(profitColor);

                message.channel.send(rollEmbed)
                output = await eco.AddToBalance(message.author.id, stake)
            }



            if (command === "pay") {
                var user = message.mentions.users.first()
                var amount = args[1]

                if (!user) return message.reply('Sorry, who do you wish to pay?')
                if (!amount) return message.reply('Please proivde an amount to pay.')

                var output = await eco.FetchBalance(message.author.id)
                if (output.balance < amount) return message.reply('Apologies, you cannot pay that amount')

                var transfer = await eco.Transfer(message.author.id, user.id, amount)


                var balText = `${user.username} has been paid **${amount}** ${cur}.`
                var balembed = new Discord.RichEmbed()
                    .addField(user.username, balText)
                    .setColor(currencyColor);
                message.channel.send(balembed);
            }
             
            if (command === "cf" || command === "coinflip") {
                var user = message.mentions.users.first()
                var amount = args[1]
                var side = args[2]
                
                if (!user) return message.reply('Sorry, who do you want to coinflip?')
                if (!amount) return message.reply('Please proivde an amount to coinflip?')
                if (!side) return message.reply('Please choose a side. Heads or Tails?')
                if (side.toLowerCase() !== "heads" && side.toLowerCase() !== "tails") return message.reply('Please choose a side. Heads or Tails?')
                
                side = side.toLowerCase()
                var output = await eco.FetchBalance(message.author.id)
                if (output.balance < amount) return message.reply('Apologies, you cannot coinflip that amount.')
                
                var _output = await eco.FetchBalance(user.id)
                if (_output.balance < amount) return message.reply(user.username + " does not have sufficient funds.")
                
                message.channel.send("<@!" + user.id + ">, accept the coinflip with /acceptcf ")
                      try {
                        var response = await message.channel.awaitMessages(
                            message2 => message2.author.id === user.id && (message2.content === "/acceptcf" || message2.content === "/cfaccept" || message2.content === "/accept" || message2.content === "/cf"|| message2.content === "/cfyes"),
                            {
                                maxMatches: 1,
                                time: 7000,
                                errors: ["time"]
                            }
                        );
                    } catch (err) {
                        console.error(err);
                        return message.channel.send(
                            "They did not accept the coinflip within the five alloted seconds using /acceptcf."
                        );
                    }
              
              const choice = (response.first().content);
              
              if (choice) {
                var items = ["tails", "tails", "heads", "tails",
                             "tails", "tails", "heads", "heads",
                             "heads", "heads", "tails", "tails",
                             "heads", "tails", "heads", "heads",
                             "tails", "tails", "heads", "tails",
                             "heads", "heads", "heads", "heads",
                             "tails", "heads", "tails", "tails"] // guarantee randomness, lookng at YOU squines
                var item = items[Math.floor(Math.random() * items.length)]
                
                if (side === item) {
                  item.charAt(0).toUpperCase()
                  message.channel.send("The coin landed on "+ item + ". <@!"+ message.author.id + "> won " + amount + " " + cur)
                  var transfer = await eco.Transfer(user.id, message.author.id, amount)
                  var balText = `${message.author.username} won **${amount}** ${cur}.`
                  var balembed = new Discord.RichEmbed()
                    .addField(message.author.username, balText)
                    .setColor(currencyColor);
                  message.channel.send(balembed); 
                  
                } else {
                  item.charAt(0).toUpperCase()
                  message.channel.send("The coin landed on "+ item + ". <@!"+ user.id + "> won " + amount + " " + cur)
                  var transfer = await eco.Transfer(message.author.id, user.id, amount)
                   var balText = `${user.username} won **${amount}** ${cur}.`
                   var balembed = new Discord.RichEmbed()
                    .addField(user.username, balText)
                    .setColor(currencyColor);
                   message.channel.send(balembed); 
                  
                }

              } 


           
            }


            /*REFER TO DEPRECATED MARKETPLACE AS TO WHY REMOVED*/



            if (command === "undebt") {
                var curCount = await eco.FetchBalance(message.author.id)
                curCount = curCount.balance
                if (curCount < 0) {
                    await eco.SetBalance(message.author.id, 0)
                    message.channel.send("Your balance is now reset.")
                } else {
                    message.channel.send("You are not below 0.")
                }


            }




            if (command === 'daily') {

                var output = await eco.Daily(message.author.id)
                    //output.updated will tell you if the user already claimed his/her daily yes or no.

                if (output.updated) {

                    var profile = await eco.AddToBalance(message.author.id, 15)
                    message.channel.send(`You have recived 15 ${cur} from the BIG (Basic Income Guarantee). Your balance is now ${profile.newbalance} ${cur}`);

                } else {
                    message.channel.send(`You have already used up today's BIG (Basic Income Guarantee). Come back in ${output.timetowait}.`)
                }

            }

            if (command === "leaderboard" || command === "scythe" || command === "richest" || command === "baltop" || command === "vibetop" || command === "top") {

                //If you use discord-economy guild based you can use the filter() function to only allow the database within your guild
                //(message.author.id + message.guild.id) can be your way to store guild based id's
                //filter: x => x.userid.endsWith(message.guild.id)

                //If you put a mention behind the command it searches for the mentioned user in database and tells the position.
                if (message.mentions.users.first()) {

                    var output = await eco.Leaderboard({
                        filter: x => x.balance > 50,
                        search: message.mentions.users.first().id
                    })
                    message.channel.send(`${message.mentions.users.first().username} is the #${output} richest.`);

                } else {

                    eco.Leaderboard({}).then(async users => { //make sure it is async

                        if (users[0]) var firstplace = await client.fetchUser(users[0].userid) //Searches for the user object in discord for first place
                        if (users[1]) var secondplace = await client.fetchUser(users[1].userid) //Searches for the user object in discord for second place
                        if (users[2]) var thirdplace = await client.fetchUser(users[2].userid)
                        if (users[3]) var fourthplace = await client.fetchUser(users[3].userid)
                        if (users[4]) var fifthplace = await client.fetchUser(users[4].userid)
                        

                        message.channel.send(`Leaderboard:
 
1 - ${firstplace && firstplace.username || 'Nobody Yet'} : ${users[0] && users[0].balance || 'None' } ${cur}
2 - ${secondplace && secondplace.username || 'Nobody Yet'} : ${users[1] && users[1].balance || 'None'} ${cur}
3 - ${thirdplace && thirdplace.username || 'Nobody Yet'} : ${users[2] && users[2].balance || 'None'} ${cur}
4 - ${fourthplace && fourthplace.username || 'Nobody Yet'} : ${users[3] && users[3].balance || 'None'} ${cur}
5 - ${fifthplace && fifthplace.username || 'Nobody Yet'} : ${users[4] && users[4].balance || 'None'} ${cur}`)


                      

                    })

                }
            }
  
  
            if (command === "work") {

                //10% chance to fail and earn nothing. You earn between 1-500 coins. And you get one of those 3 random jobs.
                   if (workedRecently.has(message.author.id)) {
            message.channel.send("You must wait five minutes before working again.");
    } else {

                     // Adds the user to the set so that they can't talk for a minute
        workedRecently.add(message.author.id);
        setTimeout(() => {
          // Removes the user from the set after a minute
          workedRecently.delete(message.author.id);
        }, 300000);
      
              var output = await eco.Work(message.author.id, {
                        failurerate: 40, 
                        money: Math.floor((Math.random() * 9) + 1),
                        jobs: ['Chef', 'Revival Center Doctor', 'Nimbus Agent', 'Youtuber', 'Librarian', 'Peace Officer', 'Architect', 'Fireman']
                    })
                    //50% chance to fail and earn nothing. You earn between 1-9
                
                var funnyMessage = "Looks like today is not your day."
                if (output.earned == 0) return message.reply(`You failed to earn money. ${funnyMessage}`)
                message.channel.send(`You worked as a ${output.job} and earned ${output.earned} ${cur}. You now own ${output.balance} ${cur}.`)


    }
          


            }
          
            if (command === 'slots') {

                var amount = args[0] //Coins to gamble

                if (!amount) return message.reply('Specify the amount you want to gamble!')

                var output = await eco.FetchBalance(message.author.id)
                if (output.balance < amount) return message.reply(`You have fewer ${cur} than the amount you want to gamble!`)

                var gamble = await eco.Slots(message.author.id, amount, {
                    width: 3,
                    height: 4
                }).catch(console.error)
                message.channel.send(gamble.grid) //Grid checks for a 100% match vertical or horizontal.
                message.channel.send(`You ${gamble.output}. New balance: ${gamble.newbalance} ${cur}`)

            }
            
            if (command === "market") { //todo
              var stocks = {"BSA":{"BigSky Airlines": 3}, 
                            "NNT":{"Next Youth Corner Turning": 6}, 
                            "NHA":{"New Hope Aerospace Labs": 1}, 
                            "SFS":{"Sea Steak Food Synthesis": 6}, 
                            "ELR": {"Extra Lives Revival": 7},
                            "ELA": {"Misso Soup and Ramen": 5},
                            "POO": {"Prager University": 50}}
              

              
              
            }
            
            if (command === "buy") {
            
            }
            
            if (command === "sell") {
            
            }
            
            if (command === "userinfo") {
                let user = args[0]
                if (!user) {
                    return message.reply("You must mention someone.");
                }
                var dmdu = user.replace(/@/g, "");
                var dmdo = dmdu.replace(/!/g, "");
                var dmdi = dmdo.replace(/>/g, "");
                var dmed = dmdi.replace(/</g, "");
                user = client.users.get(dmed)
                var curCount = await eco.FetchBalance(user.id)
                curCount = curCount.balance
                const mentioneduser = user;
                const joineddiscord =
                    mentioneduser.createdAt.getDate() +
                    1 +
                    "-" +
                    (mentioneduser.createdAt.getMonth() + 1) +
                    "-" +
                    mentioneduser.createdAt.getFullYear() +
                    " | " +
                    mentioneduser.createdAt.getHours() +
                    ":" +
                    mentioneduser.createdAt.getMinutes() +
                    ":" +
                    mentioneduser.createdAt.getSeconds();
                let game;
                if (user.presence.game === null) {
                    game = "Not currently Playing.";
                } else {
                    game = user.presence.game.name;
                }
                let messag;
                if (user.lastMessage === null) {
                    messag = "n/a";
                } else {
                    messag = user.lastMessage;
                }
                let status;
                if (user.presence.status === "online") {
                    status = ":green_book: Online";
                } else if (user.presence.status === "dnd") {
                    status = ":closed_book: Do not Disturb";
                } else if (user.presence.status === "idle") {
                    status = " :orange_book: Idle";
                } else if (user.presence.status === "offline") {
                    status = "Offline!";
                }
                let stat;
                if (user.presence.status === "offline") {
                    stat = 0x000000;
                } else if (user.presence.status === "online") {
                    stat = 0x00aa4c;
                } else if (user.presence.status === "dnd") {
                    stat = 0x9c0000;
                } else if (user.presence.status === "idle") {
                    stat = 0xf7c035;
                }
                message.channel.send({
                    embed: {
                        color: 0x69d84b,
                        author: {
                            name: `Userinfo for: ${user.username}`,
                            icon_url: user.displayAvatarURL
                        },
                        fields: [{
                            name: "**UserInfo:**",
                            value: `**Username:** <@!${user.id}>\n**Joined Discord:** ${joineddiscord}\n**Last message:** ${messag}\n**Playing:** ${game}\n**Status:** ${status}\n**User is a robot:** ${user.bot}`
                        }, {
                            name: "DiscordInfo:",
                            value: `**Tag:** ${user.discriminator}\n**User ID:** ${user.id}\n**Username:**  ${user.username}`
                        }, {
                            name: "Balance",
                            value: `${curCount}${cur}`
                        }],
                        timestamp: new Date(),
                        footer: {
                            icon_url: client.user.avatarURL,
                            text: "The Thunderhead Backbrain"
                        }
                    }
                });
            }

            if (command === "serverinfo") {
           function checkDays(date) {
    let now = new Date();
    let lapsed = now.getTime() - date.getTime();
    let days = Math.floor(lapsed / 86400000);
    return days + (days == 1 ? " day" : " days") + " ago";
};
let discordGuildVerificationLevels = ["None", "Low", "Medium", "(╯°□°）╯︵  ┻━┻", "┻━┻ミヽ(ಠ益ಠ)ノ彡┻━┻"];

let region = {
    "brazil": "🇧🇷 Brazil",   
    "eu-central": "🇪🇺 Central Europe",
    "singapore": "🇸🇬 Singapore",
    "us-central": "🇺🇸 U.S. Central",
    "sydney": ":flag_au: Sydney",
    "us-east": "🇺🇸 U.S. East",
    "us-south": "🇺🇸 U.S. South",
    "us-west": "🇺🇸: U.S. West",
    "eu-west": "🇪🇺: Western Europe",
    "vip-us-east": "🇺🇸 VIP U.S. East",
    "london": "🇬🇧 London",
    "amsterdam": "🇳🇱 Amsterdam",
    "hongkong": "🇭🇰 Hong Kong",
    "russia": "🇷🇺 Russia",
    "southafrica": "🇿🇦  South Africa"
};
const embed = new Discord.RichEmbed()
    .setAuthor(message.guild.name, message.guild.iconURL)
    .addField("Name", message.guild.name, true)
    .addField("ID", message.guild.id, true)
    .addField("Owner", `${message.guild.owner.user.username}#${message.guild.owner.user.discriminator}`, true)
    .addField("Region", region[message.guild.region], true)
    .addField("Total | Humans | Bots", `${message.guild.members.size} | ${message.guild.members.filter(member => !member.user.bot).size} | ${message.guild.members.filter(member => member.user.bot).size}`, true)
    .addField("Verification Level", discordGuildVerificationLevels[message.guild.verificationLevel], true)
    .addField("Channels", message.guild.channels.size, true)
    .addField("Roles", message.guild.roles.size, true)
    .addField("Creation Date", `${message.channel.guild.createdAt.toUTCString().substr(0, 16)} (${checkDays(message.channel.guild.createdAt)})`, true)
    .setColor("36393E")
    .setThumbnail(message.guild.iconURL)
message.channel.send({ embed });
            }
   if (command === "weather") {
                if (!args[0]) return message.channel.send("Please enter a zipcode.");
                weather.find({
                    search: args.join(" "),
                    degreeType: "F"
                }, function(err, result) {
                    if (result.length === 0) {
                        message.channel.send("**Please enter a valid location.**");
                        return;
                    }
                    var current = result[0].current;
                    var location = result[0].location;
                    var WeatherEmbed = new Discord.RichEmbed()
                        .setDescription(`**${current.skytext}**`)
                        .setAuthor(`Weather for ${current.observationpoint}`)
                        .setThumbnail(current.imageUrl)
                        .setColor(thunderColor)
                        .addField("Timezone ", `UTC ${location.timezone}`, true)
                        .addField("Degree Type ", location.degreetype, true)
                        .addField("Temperature ", `${current.temperature} Degrees`, true)
                        .addField("Feels Like ", `${current.feelslike} Degrees`, true)
                        .addField("Winds ", current.winddisplay, true)
                        .addField("Humidity ", `${current.humidity}%`, true);
                    message.channel.send(WeatherEmbed);
                });
            }
  if (command === "time") {
    
                    if (!args[0]) return message.channel.send("Please enter a zipcode.");
                weather.find({
                    search: args.join(" "),
                    degreeType: "F"
                }, function(err, result) {
                    if (result.length === 0) {
                        message.channel.send("**Please enter a valid location.**");
                        return;
                    }
                    var location = result[0].location;
                  var date = new Date();
                  var hour = (((parseInt(date.getHours()*60))+(parseInt(location.timezone)*60))/60);
                  if (hour > 24) hour = hour-24;
                  var days = ["Monday", "Tuesday", "Wednessday", "Thursday", "Friday", "Saturday", "Sunday"];
                  var years = ["Rat", "Ox", "Tiger", "Rabbit", "Dragon", "Snake", "Horse", "Goat", "Monkey", "Rooster", "Dog", "Pig"]
                  message.channel.send("The time in " + location.name + " is " + days[date.getDate()] + " @ " + hour + ":" + date.getMinutes() + ". It is the year of the **" + years[date.getFullYear()-2020]+"**.") 
                     
                });
  }
            if (command === "roleme" || command === "role" || command === "roles") {
                var role = args[0]
                var roleBlurb = ("__Please select your desired role from this list__ (selecting an already assigned role will unassign it):\nArtist: Fancy Art Flair.\nWriter: Show off that your literary talent.\nScythe: Doesn't do much. Just colours your instead of boring white.\nSpoiled: Access secret spoiler channel. There are Toll spoilers, so be wary.\nTonist: Use music commands. Abuse will result in a mute.\nUnsavory: ...") //todo: add paid roles
                if (!role) return message.channel.send(roleBlurb)

                var _r = role.toLowerCase().charAt(0).toUpperCase() + role.toLowerCase().slice(1)
                if (_r === "Artist" ||
                    _r === "Writer" ||
                    _r === "Scythe" ||
                    _r === "Spoiled" ||
                    _r === "Tonist") {
                    var rl = message.guild.roles.find('name', _r);
                    if (message.member.roles.find(r => r.name === _r)) {
                        message.member.removeRole(rl)
                        message.channel.send(`The ${_r} role was unassigned.`);
                    } else {

                        message.member.addRole(rl);
                        message.channel.send(`The ${_r} role was assigned.`)
                    }
                }
                if (_r === "Unsavory") {
                    message.channel.send("No.")
                }
            }

            if (command === "cat") {
                message.channel.send(cats() + "\n" + catFacts.random());
            }

            if (command === "tt") {
                message.delete();
                request(
                    "https://nekobot.xyz/api/imagegen?type=trumptweet&text=" + args.join(" "),
                    function(e, r, s) {
                        const b = JSON.parse(s);
                        if (!e) {
                            message.channel.send({
                                embed: {
                                    image: {
                                        url: b.message
                                    }
                                }
                            });
                        }
                    }
                );
            }

            if (command === "cly") {
                message.delete();
                request(
                    "https://nekobot.xyz/api/imagegen?type=clyde&text=" + args.join(" "),
                    function(e, r, s) {
                        const b = JSON.parse(s);
                        if (!e) {
                            message.channel.send({
                                embed: {
                                    image: {
                                        url: b.message
                                    }
                                }
                            });
                        }
                    }
                );
            }

            if (command === "ask") { //todo: ONE QUESTION ASK SYSTEM! DOITDOITDOITDOITDOIT
           //     if (message.author.id === "614634259021430786")
            //  {
             //   
              //                      message.channel.send("You asked: *" + args.join(" ") + "*", {
                    //    files: ["https://cdn.glitch.com/a09f5b5e-9054-4afc-8dcc-67ede76ea11c%2Fno-no.png"]
                 //   });
             // }else{
      //todo: add math solver
                var maybeViolate = message.content;
                if (
                    maybeViolate.toLowerCase().indexOf("scythe") >= 0 ||
                    maybeViolate.toLowerCase().indexOf("$cythe") >= 0
                ) {
                    message.channel.send("You asked: *" + args.join(" ") + "*", {
                        files: [repoImageDatabase + "warning.jpg"]
                    });
                } else if (
                    maybeViolate.toLowerCase().indexOf("forky") >= 0 ||
                    maybeViolate.toLowerCase().indexOf("skrub") >= 0
                ) {
                    message.channel.send("You asked: *" + args.join(" ") + "*", {
                        files: [repoImageDatabase + "non-scythes.jpg"]
                    });
                } else {
                    var scytheRandom = Math.floor(Math.random() * thunderAnswer.length);
                    message.channel.send("You asked: *" + args.join(" ") + "*", {
                        files: [repoImageDatabase + thunderAnswer[scytheRandom]]
                    });
                }
                message.channel.send();
            }

    if ((command === "remindme") || (command === "remind") || (command == "r")) {
        // [Omega] X Homework
        // just add to database main code will be above
        if (!(reminds[message.author.id])) {
            reminds[message.author.id] = []
        }

        var date = new Date();



        var time = args[0]
        if (!time) {
            return message.reply(
                "When do you want me to remind you"
            );
        }

        if (!time.match(/[s,m,h,d,w,y]/g)) {
            return message.reply("I need a valid time!");
        }

        if (!(args[1])) return message.channel.send("I'm sorry. But what exactly am I supposed to remind you of?");
        var themessage = message.content.split(" ").slice(2).join(" ");

        var strunit = time.slice(-1);
        var unit = 1

        if (strunit === "s") {
            unit = 1
        }

        if (strunit === "m") {
            unit = 60
        }

        if (strunit === "h") {
            unit = 3600
        }

        if (strunit === "d") {
            unit = 86400
        }

        if (strunit === "w") {
            unit = 604800
        }

        if (strunit === "y") {
            unit = 31557600
        }
        console.log((time.slice(0, -1)))
        time = (time.slice(0, -1))
        var inted = parseInt(time);
        console.log("TIME " + inted)
        // if (inted == !inted) return message.channel.send("Not an integer.") //apollo
        console.log(unit)
        console.log(time)
        console.log(": " + (unit * 1000 * time))
        var newtime = new Date();
        newtime = (date.getTime() + (unit * 1000 * time))
        //newtime = newtime -  100000000000  //What the hell and why the hell! Why do I need this weird ass line? Why is newdate 100000000000 miliseconds in the future?
        date = date.getTime() + (unit * 0)
        console.log(date)
        console.log(newtime)
        reminds[message.author.id].push({ "reminder": themessage, "time": newtime })

        message.channel.send("I will be sure to remind you of that when the time arrives. The reminder will be in a DM (Direct Message) so if I unable to DM you or you are unsavory at the time, you *will not* recive the reminder.")
    }

            if (command === "help") {
            var devMessage = "☕ __Dev Commands__ (Page 0/4)\n"
              + "`/help 0`: Help for developer commands. " + "\n"
              + "`d/repo`: My GitHub repository." + "\n"
              + "`d/eval [Code]`: Execute code." + "\n"
              + "`d/avatar [Image Link]`: Set my profile picture to a different image." + "\n"
              + "`d/name [Name]`: Change my Discord name." + "\n"
              + "`d/give [@User] [Amount]`: Transfer currency to a user's account." + "\n"
              + "`d/dm [@User] [Message]`: Direct message a user." + "\n"
              + "`d/gs [@User]`: Give a user the role of Grandslayer on the ScythePosts Server." + "\n"
              + "`d/ugs [@User]`: Unassign the Grandslayer role." + "\n"
              + "`d/unsuspend`: Unsuspend the bot." + "\n"
                
              + "ᴰᵉᵛ ᵖʳᵉᶠᶦˣ ᶦˢ d/"
            
            
            var helpMessage = "📜 __Commands__ (Page 1/4)\n"
              + "`/help [page]`: A command to use if you require assistance. " + "\n"
              + "`/ping`: A command to check if I am avaliable. It may be slowed a fraction of a second due to unsavories." + "\n"
              + "`/roleme [Role]`: A command to assign yourself a role." + "\n"
              + "`/ask [Question]`: Ask me a question." + "\n"
              + "`/remind [Time] [Reminder]`: I can remind you of something if need be." + "\n"
              + "`/userinfo [@User]`: Find out more about a person." + "\n"
              + "`/serverinfo`: Find out more the current server." + "\n"
              + "`/weather [Location]`: I try to divert rain away from people but it is always good to double check." + "\n"
              + "`/time [Location]`: Check what time it is somewhere if you have a friend in a different timezone." + "\n"

              + "ᵁˢᵉ ʰᵉˡᵖ ᶠᵒˡˡᵒʷᵉᵈ ᵇʸ ᵗʰᵉ ʰᵉˡᵖ ᵖᵃᵍᵉ ᵗᵒ ˢᵉᵉ ᵐᵒʳᵉ ᶜᵒᵐᵐᵃⁿᵈˢ"


            var economyMessage = "💸 __Economy Commands__ (Page 2/4)\n"
              + "`/help 2`: Help for the economy commands. " + "\n"
              + "`/bal [@User]`: Check your (or someone else's) balance." + "\n"
              + "`/daily`: Your daily Basic Income Guarantee." + "\n"
              + "`/work`: Work to try to earn money. Five minute cooldown." + "\n"
              + "`/roll [amount]`: Gamble money I do not suggest this as the odds of losing are high." + "\n"
              + "`/slots [amount]`: Same as roll, but with slots." + "\n"
              + "`/pay [@User]`: Pay a user." + "\n"
              + "`/leaderboard`: Check to see who has the most money." + "\n"
              + "`/coinflip [@User] [Amount] [Heads or Tails]`: Bet an amount of money with a user. They must accept with `/acceptcf` within five seconds" + "\n"
              + "`/undebt`: Set your balance to zero if it is less than zero." + "\n"
              
           //   + "The following economy commands are in `beta`: market, buy, sell\n"
              + "ᴰᵒⁿ'ᵗ ᵉᵛᵉⁿ *ᵗʳʸ* ᵗᵒ ʳᵒˡˡ ᵃ ⁿᵉᵍᵃᵗᶦᵛᵉ ᵒʳ ᴺᵃᴺ ⁿᵘᵐᵇᵉʳ"


            var musicMessage = "🎵 __Music Commands__ (Page 3/4)\n"
              + "`/help 3`: Help for the music commands. " + "\n"
              + "`/play [Song URL]`: Play a song or playlist. " + "\n"
              + "`/stop`: Stop the music. " + "\n"
              + "`/skip`: Skip the current song. " + "\n"
              + "`/queue`: Check the queue of songs. " + "\n"
              + "`/volume [Number]`: Set the volume as a number **between one to five**. " + "\n"

              + "ʸᵒᵘ ⁿᵉᵉᵈ ᵗʰᵉ ᵗᵒⁿᶦˢᵗ ʳᵒˡᵉ ᵈᵒ ᵘˢᵉ ᵗʰᵉˢᵉ ᶜᵒᵐᵐᵃⁿᵈˢ ᵃⁿᵈ ᵃᵇᵘˢᵉ ᵒᶠ ᵗʰᵉ ʳᵒˡᵉ ᵐᵃʸ ʳᵉˢᵘˡᵗ ᶦⁿ ᵃ ᵇˡᵃᶜᵏˡᶦˢᵗ ᶠʳᵒᵐ ᵐᵘˢᶦᶜ ᶜᵒᵐᵐᵃⁿᵈˢ"


            var modMessage = "🔧 __Mod Commands__ (Page 4/4)\n"
              + "`/help 4`: Help for the moderation commands. " + "\n"
              + "`/purge [Amount]`: Purge the chat up to 200 messages. " + "\n"
              + "`/lock`: Lock the channel. " + "\n"
              + "`/unlock`: Unlock the channel. " + "\n"
              + "`/kick [@User]`: Kick a user from the server. " + "\n"
              + "`/ban [@User]`: Ban a user from the server. " + "\n"
              + "`/unsavory [@User] [Time] [Reason]`: Unsavory a user. " + "\n"
              + "`/poll [Question]`: Make a poll. " + "\n"
              + "`/announce [Title] [Announcement]`: Make an announcement. " + "\n"

              + "ᴵᶠ ʸᵒᵘ ᵃʳᵉ ⁿᵒᵗ ᵃ ᵐᵒᵈ ᵗʰᵉˢᵉ ᶜᵒᵐᵐᵃⁿᵈˢ ʷᵒⁿᵗ ʷᵒʳᵏ ᶠᵒʳ ʸᵒᵘ"
              
              var page = args[0]
            
              if (!page) {page = 1}
            
              
              var pages = [devMessage, helpMessage, economyMessage, musicMessage, modMessage]
              var helpText = pages[page]
              if (!helpText) {helpText = "Error: No Command at `pages[" + (page)+ "]`"}
              message.channel.send(helpText)
            }

  //if (message.author.id === "406523000666587138" || message.author.id === "402200704141230101") return;
            //Music Commands
            //=========================================================
             const searchString = args.slice(0).join(" ");
            var url = args[0] ? args[0].replace(/<(.+)>/g, "$1") : "";
            const serverQueue = queue.get(message.guild.id);
            if (command === "play") {  
              const voiceChannel = message.member.voiceChannel;
                if (!voiceChannel)
                    return message.channel.send(
                        "My apologies, but you need to be in a voice channel to play music."
                    );
                if (url.match(/^https?:\/\/(www.youtube.com|youtube.com)\/playlist(.*)$/)) {
                    const playlist = await youtube.getPlaylist(url);
                    const videos = await playlist.getVideos();
                    for (const video of Object.values(videos)) {
                        const video2 = await youtube.getVideoByID(video.id);
                        await handleVideo(video2, message, voiceChannel, true);
                    }
                    return message.channel.send(
                        `✅ Playlist: **${playlist.title}** has been added to the queue!`
                    );
                } else {
                    try {
                        var video = await youtube.getVideo(url);
                    } catch (error) {
                        try {
                            var videos = await youtube.searchVideos(searchString, 10);
                            let index = 0;
                            message.channel.send(`
__**Song selection:**__
${videos.map(video2 => `**${++index} -** ${video2.title}`).join("\n")}
Please provide a value to select one of the 🔎 results ranging from 1-10.
					`);
                    try {
                        var response = await message.channel.awaitMessages(
                            message2 => message2.content > 0 && message2.content < 11,
                            {
                                maxMatches: 1,
                                time: 10000,
                                errors: ["time"]
                            }
                        );
                    } catch (err) {
                        console.error(err);
                        return message.channel.send(
                            "Cancelling video selection. You either failed to give a value in time or gave an invalid one. For refrence, you just type the 1-10 number not the `/play` part with it."
                        );
                    }
                    const videoIndex = parseInt(response.first().content);
                    var video = await youtube.getVideoByID(videos[videoIndex - 1].id);
                } catch (err) {
                    console.error(err);
                    return message.channel.send(
                        "A scour of my near infinite databanks do not provide any results."
                    );
                }
            }
            return handleVideo(video, message, voiceChannel);
        }
    } else if (command === "skip") {
        if (!message.member.voiceChannel)
            return message.channel.send("You are not in a voice channel!");
        if (!serverQueue)
            return message.channel.send(
                "There is no song playing that could be skipped."
            );
        serverQueue.connection.dispatcher.end("Skip command has been used!");
        return undefined;
    } else if (command === "stop") {
        if (!message.member.voiceChannel)
            return message.channel.send("You are not in a voice channel!");

        serverQueue.songs = [];
        serverQueue.connection.dispatcher.end("Stop command has been used!");
        message.member.voiceChannel.leave();
    } else if (command == "chill") {
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel)
            return message.channel.send(
                "I'm sorry but you need to be in a voice channel to play music."
            );
        const playlist = await youtube.getPlaylist(
            "https://www.youtube.com/watch?v=CXAB070XPRQ&list=PL0aso3-ouj1zYTi0-nnZovo9uJ8Ms7prs"
        );
        message.channel.send("😎 Chill lo - fi beats");
        const videos = await playlist.getVideos();
        for (const video of Object.values(videos)) {
            const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
            await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
        }

        serverQueue.volume = 2;
    }    else if (command == "gameing") {
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel)
            return message.channel.send(
                "I'm sorry but you need to be in a voice channel to play music."
            );
        const playlist = await youtube.getPlaylist(
            "https://www.youtube.com/playlist?list=PL0aso3-ouj1wubnlvMHRv-jX3trKE4_rY"
        );
        message.channel.send("Gameinge Beats B)");
        const videos = await playlist.getVideos();
        for (const video of Object.values(videos)) {
            const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
            await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
        }

        serverQueue.volume = 2;
    }
  
  else if (command == "study") {
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel)
            return message.channel.send(
                "I'm sorry but you need to be in a voice channel to play music."
            );
        const playlist = await youtube.getPlaylist(
            "https://www.youtube.com/watch?v=hHW1oY26kxQ"
        );
        message.channel.send("Playing Playlist");
        const videos = await playlist.getVideos();
        for (const video of Object.values(videos)) {
            const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
            await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
        }

        serverQueue.volume = 2;
    } else if (command == "relax") {
        const voiceChannel = message.member.voiceChannel;
        if (!voiceChannel)
            return message.channel.send(
                "I'm sorry but you need to be in a voice channel to play music."
            );
        const playlist = await youtube.getPlaylist(
            "https://www.youtube.com/watch?v=EcEMX-63PKY"
        );
        message.channel.send("Playing Playlist");
        const videos = await playlist.getVideos();
        for (const video of Object.values(videos)) {
            const video2 = await youtube.getVideoByID(video.id); // eslint-disable-line no-await-in-loop
            await handleVideo(video2, message, voiceChannel, true); // eslint-disable-line no-await-in-loop
        }

        serverQueue.volume = 2;
    }
    else if (command === "volume" || command === "vol") {
        if (!message.member.voiceChannel)
            return message.channel.send("You are not in a voice channel!");
        if (!serverQueue) return message.channel.send("There is nothing playing.");
        if (!args[0])
            return message.channel.send(
                `The current volume is: **${serverQueue.volume}**`
            );
        serverQueue.volume = args[0];
        serverQueue.connection.dispatcher.setVolumeLogarithmic(args[0] / 5);
         var volval;
        if (serverQueue.volume == 1) {
            volval = `○────`;
        }
        if (serverQueue.volume == 2) {
            volval = `─○───`;
        }
        if (serverQueue.volume == 3) {
            volval = `──○──`;
        }
        if (serverQueue.volume == 4) {
            volval = `───○─`;
        }
        if (serverQueue.volume == 5) {
            volval = `────○`;
        } 
        else if (serverQueue.volume < 1) {
            volval = "○ ─────";
        }
        else if (serverQueue.volume > 5) {
            volval = "───── ○";
        } 
        message.channel.send(volval);
    } else if (command === "np") {
        if (!serverQueue) return message.channel.send("There is nothing playing.");
         var volval;
        if (serverQueue.volume == 1) {
            volval = `○────`;
        }
        if (serverQueue.volume == 2) {
            volval = `─○───`;
        }
        if (serverQueue.volume == 3) {
            volval = `──○──`;
        }
        if (serverQueue.volume == 4) {
            volval = `───○─`;
        }
        if (serverQueue.volume == 5) {
            volval = `────○`;
        } 
        else if (serverQueue.volume < 1) {
            volval = "○ ─────";
        }
        else if (serverQueue.volume > 5) {
            volval = "───── ○";
        } else {
          volval = "Thunderhead Music"
        }
      const MusicEmbed = {"embed": 
                          {"description": `ɴᴏᴡ ᴘʟᴀʏɪɴɢ \n **${serverQueue.songs[0].title}**`,
                           "color": 9777040,
                           "footer":{"icon_url": "https://cdn.glitch.com/967bdf25-e9cb-4a1f-bdb5-a102880988a9%2FMusic%20Icon.png?v=1560799891254","text": volval},
                           "thumbnail": {"url": serverQueue.songs[0].thumbnail},
                           "title": "Music"}}
      return message.channel.send(MusicEmbed);
      
    } else if (command === "queue") {
        if (!serverQueue) return message.channel.send("There is nothing playing.");
        return message.channel.send(`
__**Song queue:**__
${serverQueue.songs.map(song => `**-** ${song.title}`).join("\n")}
**Now playing:** ${serverQueue.songs[0].title}
		`);
    } else if (command === "pause") {
        if (serverQueue && serverQueue.playing) {
            serverQueue.playing = false;
            serverQueue.connection.dispatcher.pause();
            return message.channel.send("`⏸` I paused the music for you!");
        }
        return message.channel.send("There is nothing playing.");
    } else if (command === "resume") {
        if (serverQueue && !serverQueue.playing) {
            serverQueue.playing = true;
            serverQueue.connection.dispatcher.resume();
            return message.channel.send("`▶` I resumed the music for you!");
        }
        return message.channel.send("There is nothing playing.");
    }
    return undefined;
});
async function handleVideo(video, message, voiceChannel, playlist = false) {
    const serverQueue = queue.get(message.guild.id);
  

  
  const song = {
        id: video.id,
        title: Discord.escapeMarkdown(video.title),
        url: `https://www.youtube.com/watch?v=${video.id}`,
        thumbnail: video.thumbnails.high.url
    };
  
    if (!serverQueue) {
        const queueConstruct = {
            textChannel: message.channel,
            voiceChannel: voiceChannel,
            connection: null,
            songs: [],
            volume: 5,
            playing: true
        };
        queue.set(message.guild.id, queueConstruct);
        queueConstruct.songs.push(song);
        try {
            var connection = await voiceChannel.join();
            queueConstruct.connection = connection;
            if (song.url.startsWith("https://www.yo")) {
                play(message.guild, queueConstruct.songs[0]);
            }
        } catch (error) {
            console.error(`I could not join the voice channel: ${error}`);
            queue.delete(message.guild.id);
            return message.channel.send(
                `I could not join the voice channel: ${error}`
            );
        }
    } else {
        serverQueue.songs.push(song);
        console.log(serverQueue.songs);
        if (playlist) return undefined;
        else
            return message.channel.send(
                `✅ **${song.title}** has been added to the queue!`
            );
    }
    return undefined;
}

function play(guild, song) {
    const serverQueue = queue.get(guild.id);

    if (!song) {
        serverQueue.voiceChannel.leave();
        queue.delete(guild.id);
        return;
    }
    console.log(serverQueue.songs);

    const dispatcher = serverQueue.connection
        .playStream(ytdl(song.url))
        .on("end", reason => {
            if (
                reason ===
                "I apologies, there are currently a large amount of unsavories in the MidMerican region, due to the amount of computational power needed to meet their demands the audio stream failed to generate at a sufficient enough speed to play the music. Have a perfect day."
            )
                console.log(reason);
            else console.log(reason);
            serverQueue.songs.shift();
            play(guild, serverQueue.songs[0]);
        })
        .on("error", error => console.error(error));
         var volval;
        if (serverQueue.volume == 1) {
            volval = `○────`;
        }
        if (serverQueue.volume == 2) {
            volval = `─○───`;
        }
        if (serverQueue.volume == 3) {
            volval = `──○──`;
        }
        if (serverQueue.volume == 4) {
            volval = `───○─`;
        }
        if (serverQueue.volume == 5) {
            volval = `────○`;
        } 
        else if (serverQueue.volume < 1) {
            volval = "○ ─────";
        }
        else if (serverQueue.volume > 5) {
            volval = "───── ○";
        } else {
          volval = "Thunderhead Music"
        }
    dispatcher.setVolumeLogarithmic(serverQueue.volume / 5);
        const MusicEmbed = {"embed": 
                          {"description": `ɴᴏᴡ ᴘʟᴀʏɪɴɢ \n **${serverQueue.songs[0].title}**`,
                           "color": 9777040,
                           "footer":{"icon_url": "https://cdn.glitch.com/967bdf25-e9cb-4a1f-bdb5-a102880988a9%2FMusic%20Icon.png?v=1560799891254","text": volval},
                           "thumbnail": {"url": serverQueue.songs[0].thumbnail},
                           "title": "Music"}}
  
  serverQueue.textChannel.send(MusicEmbed);
}
client.login(process.env.TOKEN);  
