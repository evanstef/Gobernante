export default class Command {
    client;
    name;
    description;
    category;
    options;
    default_member_permissions;
    dm_permission;
    cooldown;
    constructor(client, commandOptions) {
        this.client = client;
        this.name = commandOptions.name;
        this.description = commandOptions.description;
        this.category = commandOptions.category;
        this.options = commandOptions.options;
        this.default_member_permissions = commandOptions.default_member_permissions;
        this.dm_permission = commandOptions.dm_permission;
        this.cooldown = commandOptions.cooldown;
    }
    Execute(interaction, args) { }
    AutoComplete(interaction) { }
}
//# sourceMappingURL=Command.js.map