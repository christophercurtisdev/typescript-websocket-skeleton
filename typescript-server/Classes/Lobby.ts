import Player from "./Player";
import Reactor from "./Reactor";

export default class Lobby {
    code: string;
    reactor: Reactor
    inspector?: Player;
    controller?: Player;
    gameClock?: NodeJS.Timeout;

    constructor(code: string) {
        this.code = code;
        this.reactor = new Reactor({});
    }

    addPlayer(player: Player) {
        if (this.controller) {
            this.inspector = player;
            this.startReactor();
        } else {
            this.controller = player;
        }
    }

    stopGame() {
        clearInterval(this.gameClock);
    }

    private startReactor() {
        this.gameClock = setInterval(() => this.lobbyTick(), 250);
    }

    private lobbyTick() {
        console.log(`Lobby ${this.code} Tick`);
    }
}