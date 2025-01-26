import PlayerData from "./PlayerData";

export default class ControllerData extends PlayerData {
    rods?: any = {
        A1: false,
        A2: false,
        A3: false,
        A4: false,
        A5: false,
        A6: false,
        A7: false,
        A8: false,
        A9: false,
        A10: false,
        A11: false,
        A12: false,
        A13: false,
        A14: false,
        A15: false,
        A16: false,
        A17: false,
    }

    constructor(lobbyCode: string = '', rods: any = {}) {
        super();
        this.lobbyCode = lobbyCode;
        for (let rod in rods) {
            this.rods[rod] = rods[rod];
        }
    }
}