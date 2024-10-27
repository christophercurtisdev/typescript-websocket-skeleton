import BoardData from "../Interfaces/Requests/BoardDataInterface";
import LobbyRequest from "../Interfaces/Requests/LobbyRequestInterface";
import Message from "../Interfaces/Requests/MessageInterface";

export default class SimpleSocket {
    webSocket: WebSocket;
    types: any = {
        CLIENT_LOBBY_REQUEST: 'LOBBY_REQUEST',
        CLIENT_BOARD_REQUEST: 'BOARD_UPDATE',
        CLIENT_MESSAGE_REQUEST: 'MESSAGE'
    };

    constructor(url: string) {
        this.webSocket = new WebSocket(url);
        this.initialiseWebsocket();
    }

    sendBoardData(boardData: BoardData) {
        let data = Object.fromEntries(boardData.board);
        this.sendRaw({data: data}, this.types.CLIENT_BOARD_REQUEST);
    }

    sendMessage(data: Message) {
        this.sendRaw({data: data}, this.types.CLIENT_MESSAGE_REQUEST);
    }

    sendLobbyRequest(data: LobbyRequest) {
        this.sendRaw({data: data}, this.types.CLIENT_LOBBY_REQUEST);
    }

    private sendRaw(data: any, type: string) {
        data.type = type;
        this.webSocketSend(data);
    }
    
    private initialiseWebsocket() {
        this.webSocket.onopen = (event) => this.webSocketOpen(event);
        this.webSocket.onmessage = (data) => this.webSocketMessage(data)
    }


    private webSocketOpen(event: Event) {
        
    }

    private webSocketSend(request: any) {
        let data: string = JSON.stringify(request);
        console.log(`Client: ${data}`);
        this.webSocket.send(data);
    }

    private webSocketMessage(response: MessageEvent<any>) {
        let data: Response = response.data;
        console.log(`Server: ${data}`);
    }
}