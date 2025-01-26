import PlayerData from "./PlayerData";

export default class InspectorData extends PlayerData {
    stats: any

    constructor(lobbyCode: string = '', data: any = {}) {
        super();
        this.lobbyCode = lobbyCode;
        this.stats = {};
        this.stats['heat'] = data.heat ?? 0,
        this.stats['rods'] = data.rods ?? 0,
        this.stats['waste'] = data.waste ?? 0
    }
}