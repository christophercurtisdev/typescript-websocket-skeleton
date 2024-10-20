import Player from "./Player";

export default class Lobby {
    code: string;
    inspector?: Player;
    controller?: Player;

    constructor(code: string) {
        this.code = code;
    }

    addPlayer(player: Player) {
        if (this.controller) {
            this.inspector = player;
        } else {
            this.controller = player;
        }
    }
}