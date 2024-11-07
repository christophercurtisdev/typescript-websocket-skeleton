import PlayerData from "./PlayerData";

export default class MessageData extends PlayerData {

    body: string;
    type: string;

    constructor(data: any = {}) {
        super();
        this.body = data.body ?? 'No Message';
        this.type = 'MESSAGE'; // Eventually make it like 'URGENT_MESSAGE' or 'MAINTENANCE_UPDATE' or something based on inspector input
    }
}