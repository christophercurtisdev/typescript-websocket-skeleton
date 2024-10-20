import Player from "./Player";
import Reactor from "./Reactor";

export default class Lobby {
    code: string;
    reactor: Reactor
    inspector?: Player;
    controller?: Player;

    constructor(code: string) {
        this.code = code;
        this.reactor = new Reactor({});
    }

    addPlayer(player: Player) {
        if (this.controller) {
            this.inspector = player;
        } else {
            this.controller = player;
        }
    }
}