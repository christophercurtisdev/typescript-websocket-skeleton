export default class Reactor {
    heat: number;
    fuelDepletion: number;
    coolantTemperature: number;
    waste: number;

    rods = 1;

    constructor(data: any) {
        this.heat = data.heat ?? 0;
        this.fuelDepletion = data.fuelDepletion ?? 0;
        this.coolantTemperature = data.coolantTemperature ?? 0;
        this.waste = data.waste ?? 0;
    }

    tick() {
        let a = 0.037;
        let b = 0;
        let c = 2;

        this.heat += ((a * this.rods)^2) + (b*this.rods) + c;
    }

    stats() {
        return {
            heat: this.heat,
            rods: this.rods,
            wast: this.waste
        };
    }
}