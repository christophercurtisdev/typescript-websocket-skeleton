import WebSocket, { RawData, WebSocketServer, ServerOptions } from 'ws';
import ServerResponse from './ServerResponse';
import InspectorData from './Data/InspectorData';
import ClientRequest from './ClientRequest';
import ControllerData from './Data/ControllerData';
import PlayerData from './Data/PlayerData';
import ReactorServer from './ReactorServer';
import Lobby from './Lobby';


export default class Player {
    webSocket: WebSocket;
    username?: string;
    lobby?: Lobby;

    static CLIENT_LOBBY_REQUEST = 'LOBBY_REQUEST';
    static CLIENT_BOARD_REQUEST = 'BOARD_UPDATE';
    static CLIENT_MESSAGE_REQUEST = 'MESSAGE';

    constructor(webSocket: WebSocket) {
        this.webSocket = webSocket;
        this.webSocket.on('message', data => this.message(data));
        this.webSocket.on('close', data => this.close(data));
    }

    send(response: ServerResponse) {
        this.webSocket.send(JSON.stringify(response));
    }

    message(data: RawData)
    {
        let response = this.parseMessage(data);
        this.send(response);
    }

    close(data: Number) {
        if (this.lobby) {
            ReactorServer.destroyLobby(this.lobby);
        }
    }

    parseMessage(clientData: RawData) : ServerResponse {
        let responseData = {} as PlayerData;
        try {
            let clientMessage = JSON.parse(clientData.toString()) as ClientRequest;
            switch (clientMessage.type.toUpperCase()) {
                case Player.CLIENT_BOARD_REQUEST:
                    responseData = this.boardUpdate(clientMessage);
                    break;
                case Player.CLIENT_MESSAGE_REQUEST:
                    responseData = this.playerMessage(clientMessage);
                    break;
                case Player.CLIENT_LOBBY_REQUEST:
                    responseData = this.lobbyRequest(clientMessage);
                    break;
            }
            return new ServerResponse(responseData);
        } catch(e: any) {
            console.log(e.message);
            return ServerResponse.failedResponse();
        }
    }

    lobbyRequest(clientMessage: any) : PlayerData
    {
        let data = clientMessage.data;
        if (data.request == 'join') {
            let responseData = new InspectorData();
            responseData.stats = ['Stats information'];
            return responseData;
        } else if (data.request == 'create') {

            // Move this to the if above
            this.lobby = ReactorServer.createLobby(this);
            //

            let responseData = new ControllerData();
            responseData.board = new Map();
            return responseData;
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