export default class ReactorRod {
    id: string;
    engaged: boolean;
    depletion: Number;
    ruptured: boolean;

    constructor(id: string) {
        this.id = id
        this.engaged = false;
        this.depletion = 0;
        this.ruptured = false;
    }
}