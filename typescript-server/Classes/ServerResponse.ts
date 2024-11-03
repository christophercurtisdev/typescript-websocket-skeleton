import ControllerData from "./Data/ControllerData";
import InspectorData from "./Data/InspectorData";
import PlayerData from "./Data/PlayerData";

export default class ServerResponse {
    status: string
    data: ControllerData | InspectorData;

    static SUCCESS_STATUS = "SUCCESS";
    static FAIL_STATUS = "FAIL";
    static PENDING_STATUS = "PENDING";
    static UNKNOWN = "UNKNOWN";

    constructor(data: ControllerData | InspectorData) {
        this.status = ServerResponse.SUCCESS_STATUS
        this.data = data;
    }

    public static failedResponse(data: ControllerData | InspectorData = new PlayerData()) {
        let response = new ServerResponse(data);
        response.status = ServerResponse.FAIL_STATUS;
        return response;
    }
}