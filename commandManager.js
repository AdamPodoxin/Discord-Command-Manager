//----------------COMMAND MANAGER----------------

class Command {
    constructor(name, requirePermissions, action) {
        this.name = name;
        this.requirePermissions = requirePermissions;
        this.action = action;
    }
}

class CommandManager {
    constructor() {
        this.commands = [];
        this.specialPermissionRoles = [];
        this.prefix = '!';
    }

    getMemberByUserId(userId, guild) {
        return guild.members.get(userId);
    }

    setPrefix(prefix) {
        this.prefix = prefix;
    }

    addSpecialPermissionRole(role) {
        this.specialPermissionRoles.push(role);
    }

    addCommand(name, requirePermissions, action) {
        this.commands.push(new Command(name, requirePermissions, action));
    }

    onMessage(message) {
        if (message.author.bot)
            return;

        //Checks if the message is a command
        if (message.content.charAt(0) == this.prefix) {
            //Splits the message into seperate parts at spaces
            const args = message.content.substring(1, message.content.length).split(" ");

            //Loops through each command to see which one is called
            for (var i = 0; i < this.commands.length; i++) {
                const command = this.commands[i];

                if (command.name == args[0]) {
                    if (command.requirePermissions) {
                        //Checks if the author of the message has required permissions for this command
                        this.specialPermissionRoles.forEach(role => {
                            if (this.getMemberByUserId(message.author.id, message.guild).roles.some(r => r.name == role)) {
                                command.action(message);
                            } else {
                                message.reply("you do not have the required permissions for this command.");
                            }
                        });
                    } else {
                        command.action(message);
                    }

                    return;
                }
            }

            //If desired command was not found
            message.reply("this command was not found.");
        }
    }
}

//----------------COMMAND MANAGER----------------



//-------------------EXAMPLE---------------------

const { Client } = require("discord.js");
const client = new Client();

const TOKEN = "NjcxMDkwNjM5MjEwOTM4NDM1.Xi5NtQ.CMBTCdcGrJGkilzV-efGwB_D6LM" /*This is AdamBot's token*/;

client.on("ready", () => {
    console.log("AdamBot is online.");
});

const commandManager = new CommandManager();

//By default, the prefix is '!'
commandManager.setPrefix('.');

commandManager.addSpecialPermissionRole("SpecialCommands");

commandManager.addCommand("reply", false, message => {
    const reply = message.content.substring(6, message.content.length);
    message.reply(reply);
});

commandManager.addCommand("mute", true, message => {
    const targetUserId = message.content.split(" ")[1];
    const member = commandManager.getMemberByUserId(targetUserId.substring(3, targetUserId.length - 1), message.guild);

    member.setMute(true)
        .then(response => message.channel.send("Muted " + targetUserId))
        .catch(err => message.channel.send(targetUserId + " is not connected to voice."));
});

commandManager.addCommand("unmute", true, message => {
    const targetUserId = message.content.split(" ")[1];
    const member = commandManager.getMemberByUserId(targetUserId.substring(3, targetUserId.length - 1), message.guild);

    member.setMute(false)
        .then(response => message.channel.send("Unmuted " + targetUserId))
        .catch(err => message.channel.send(targetUserId + " is not connected to voice."));
});

client.on("message", message => {
    commandManager.onMessage(message);
});

client.login(TOKEN);

//-------------------EXAMPLE---------------------