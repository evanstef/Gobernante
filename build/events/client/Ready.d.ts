import type CustomClient from "../../base/classes/CustomClient.js";
import Event from "../../base/classes/Event.js";
export default class Ready extends Event {
    constructor(client: CustomClient);
    Execute(): Promise<void>;
    private GetJson;
}
//# sourceMappingURL=Ready.d.ts.map