import WebSocket, { RawData, WebSocketServer, ServerOptions } from 'ws';
import ServerResponse from './ServerResponse';
import InspectorData from './InspectorData';


export default class Player {
    webSocket: WebSocket;
    username?: string;

    constructor(webSocket: WebSocket) {
        this.webSocket = webSocket;
        this.webSocket.on('message', data => this.message(data));
        this.webSocket.on('close', function () {
            console.log('Client Disconnected');
        });
    }

    send(response: ServerResponse) {
        this.webSocket.send(JSON.stringify(response));
    }

    message(data: RawData)
    {
        let info = JSON.parse(data.toString());
        let responseData = new InspectorData();
        responseData.stats = ['some data']
        let response = new ServerResponse(responseData);
        // response.data = info;
        this.send(response)
    }
}