import ControllerData from "./ControllerData";
import InspectorData from "./InspectorData";

export default class ServerResponse {
    status: string
    data: ControllerData | InspectorData;

    static SUCCESS_STATUS = "SUCCESS";
    static FAIL_STATUS = "FAIL";
    static PENDING_STATUS = "PENDING";

    constructor(data: ControllerData | InspectorData) {
        this.status = ServerResponse.SUCCESS_STATUS
        this.data = data;
    }
}