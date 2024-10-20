import WebSocket, { RawData, WebSocketServer, ServerOptions } from 'ws';
import ServerResponse from './ServerResponse';
import InspectorData from './Data/InspectorData';
import ClientRequest from './ClientRequest';
import ControllerData from './Data/ControllerData';
import PlayerData from './Data/PlayerData';


export default class Player {
    webSocket: WebSocket;
    username?: string;

    static CLIENT_LOBBY_REQUEST = 'LOBBY_REQUEST';
    static CLIENT_BOARD_REQUEST = 'BOARD_UPDATE';
    static CLIENT_MESSAGE_REQUEST = 'MESSAGE';

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
        let response = this.parseMessage(data);
        this.send(response);
    }

    parseMessage(clientData: RawData) : ServerResponse {
        let clientMessage = JSON.parse(clientData.toString()) as ClientRequest;
        let responseData = {} as PlayerData;
        switch (clientMessage.type.toUpperCase()) {
            case Player.CLIENT_LOBBY_REQUEST:
                responseData = this.lobbyRequest(clientMessage);
                break;
            case Player.CLIENT_BOARD_REQUEST:
                responseData = this.boardUpdate(clientMessage);
                break;
            case Player.CLIENT_MESSAGE_REQUEST:
                responseData = this.playerMessage(clientMessage)
        }
        let response = new ServerResponse(responseData);
        return response;
    }

    lobbyRequest(clientMessage: any) : PlayerData
    {
        if (clientMessage.request == 'join') {
            let data = new InspectorData();
            data.stats = ['Stats information'];
            return data;
        } else if (clientMessage.request == 'create') {
            let data = new ControllerData();
            data.board = ['Board information'];
            return data;
        }
        return new PlayerData();
    }

    boardUpdate(data: any) : ControllerData
    {
        return new ControllerData();
    }

    playerMessage(data: any) : InspectorData
    {
        return new InspectorData();
    }
}