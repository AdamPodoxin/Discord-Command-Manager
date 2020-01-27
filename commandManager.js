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
        this.specialPermissions = [];
        this.prefix = "!";
    }

    setPrefix(prefix) {
        this.prefix = prefix;
    }


}

//----------------COMMAND MANAGER----------------



//-------------------EXAMPLE---------------------



//-------------------EXAMPLE---------------------