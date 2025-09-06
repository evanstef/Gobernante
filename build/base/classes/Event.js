export default class Event {
    client;
    name;
    description;
    once;
    constructor(client, eventOptions) {
        this.client = client;
        this.name = eventOptions.name;
        this.description = eventOptions.description;
        this.once = eventOptions.once;
    }
    Execute(...args) { }
}
//# sourceMappingURL=Event.js.map