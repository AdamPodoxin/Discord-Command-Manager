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


}

//----------------COMMAND MANAGER----------------



//-------------------EXAMPLE---------------------



//-------------------EXAMPLE---------------------