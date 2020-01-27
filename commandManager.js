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



//-------------------EXAMPLE---------------------