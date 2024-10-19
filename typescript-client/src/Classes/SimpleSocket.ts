import Instruction from "../Interfaces/Instruction";
import LobbyRequest from "../Interfaces/LobbyRequest";
import Message from "../Interfaces/Message";

export default class SimpleSocket {
    webSocket: WebSocket;
    types: any = { 
        INSTRUCTION: 'instruction', 
        MESSAGE: 'message', 
        LOBBY_REQUEST: 'lobby_request' 
    };

    constructor(url: string) {
        this.webSocket = new WebSocket(url);
        this.initialiseWebsocket();
    }

    sendInstruction(data: Instruction) {
        this.sendRaw(data, this.types.INSTRUCTION);
    }

    sendMessage(data: Message) {
        this.sendRaw(data, this.types.MESSAGE);
    }

    sendLobbyRequest(data: LobbyRequest) {
        this.sendRaw(data, this.types.LOBBY_REQUEST);
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
        this.webSocketSend({ "success": true, "data": Math.random() });
    }

    private webSocketSend(request: any) {
        let data = JSON.stringify(request);
        console.log(`Client: ${data}`);
        this.webSocket.send(data);
    }

    private webSocketMessage(response: MessageEvent<any>) {
        let data = response.data;
        console.log('Server: '+data);
    }
}