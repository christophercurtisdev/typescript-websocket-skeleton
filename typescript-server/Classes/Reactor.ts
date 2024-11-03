import ControllerData from "./Data/ControllerData";
import ReactorRod from "./ReactorRod";

export default class Reactor {
    heat: number;
    fuelDepletion: number;
    coolantTemperature: number;
    waste: number;

    static rodCount = 25;
    rods: any = {
        A1: new ReactorRod('A1'),
        A2: new ReactorRod('A2'),
        A3: new ReactorRod('A3'),
        A4: new ReactorRod('A4'),
        A5: new ReactorRod('A5'),
        A6: new ReactorRod('A6'),
        A7: new ReactorRod('A7'),
        A8: new ReactorRod('A8'),
        A9: new ReactorRod('A9'),
        A10: new ReactorRod('A10'),
        A11: new ReactorRod('A11'),
        A12: new ReactorRod('A12'),
        A13: new ReactorRod('A13'),
        A14: new ReactorRod('A14'),
        A15: new ReactorRod('A15'),
        A16: new ReactorRod('A16'),
        A17: new ReactorRod('A17'),
    };

    constructor(data: any) {
        this.heat = data.heat ?? 0;
        this.fuelDepletion = data.fuelDepletion ?? 0;
        this.coolantTemperature = data.coolantTemperature ?? 0;
        this.waste = data.waste ?? 0;
    }

    tick() {
        this.calculateHeat();
        // this.calculateFuelDepletion();
        // ...
    }

    stats() {
        return {
            heat: this.heat,
            rods: this.rods,
            wast: this.waste
        };
    }

    calculateHeat() {
        let a = 0.037;
        let b = 0;
        let c = 2;
        let rodCount = this.getEngagedRods();
        let additionalHeat = (a * (rodCount**2)) + (b*rodCount) + c;
        this.heat += additionalHeat;
    }

    getEngagedRods(): number {
        let engagedRodCount = 0;
        for (let rodIndex in this.rods) {
            let rod = this.rods[rodIndex] as ReactorRod;
            if (rod.engaged) {
                engagedRodCount++;
            }
        }
        return engagedRodCount;
    }

    setControls(controllerData: ControllerData) {
        for (let input in controllerData.rods) {
            this.rods[input].engaged = controllerData.rods[input];
        }
    }
}