import ControllerData from "./Data/ControllerData";
import InspectorData from "./Data/InspectorData";
import MessageData from "./Data/MessageData";
import Player from "./Player";
import Reactor from "./Reactor";
import ServerResponse from "./ServerResponse";

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

    boardUpdate(controllerData: ControllerData) {
        this.reactor.setControls(controllerData);
        controllerData.lobbyCode = this.code;
        console.log(controllerData);
        return controllerData;
    }

    inspectorMessage(messageData: MessageData) {
        let response = new ServerResponse(messageData);
        this.controller?.send(response);
    }

    private startReactor() {
        this.gameClock = setInterval(() => this.lobbyTick(), 1000);
    }

    private lobbyTick() {
        this.reactor.tick();
        let inspectorData = new InspectorData(this.code, this.reactor.stats());
        let stats = new ServerResponse(inspectorData);
        this.inspector?.send(stats);
    }
}