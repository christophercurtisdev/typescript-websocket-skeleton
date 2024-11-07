import PlayerData from "./PlayerData";

export default class MessageData extends PlayerData {

    body: string;
    type: string;

    constructor(data: any = {}) {
        super();
        this.body = data.body ?? 'No Message';
        this.type = 'MESSAGE';
    }
}