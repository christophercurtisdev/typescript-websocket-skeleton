export default class Reactor {
    heat: number;
    fuelDepletion: number;
    coolantTemperature: number;
    waste: number;

    constructor(data: any) {
        this.heat = data.heat ?? 0;
        this.fuelDepletion = data.fuelDepletion ?? 0;
        this.coolantTemperature = data.coolantTemperature ?? 0;
        this.waste = data.waste ?? 0;
    }
}