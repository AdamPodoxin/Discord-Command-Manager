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
        this.prefix = "!";
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


}

//----------------COMMAND MANAGER----------------



//-------------------EXAMPLE---------------------



//-------------------EXAMPLE---------------------