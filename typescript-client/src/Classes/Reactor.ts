import ReactorInterface from "../Interfaces/Responses/ReactorInterface";

export default class Reactor implements ReactorInterface {
    heat: number;
    fuelDepletion: number;
    coolantTemperature: number;
    waste: number;

    constructor(data: any) {
        this.heat = data.heat;
        this.fuelDepletion = data.fuelDepletion;
        this.coolantTemperature = data.coolantTemperature;
        this.waste = data.waste;
    }
}