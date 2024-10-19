import Instruction from "../Interfaces/Instruction";
import LobbyRequest from "../Interfaces/LobbyRequest";
import Message from "../Interfaces/Message";

export default class SimpleSocket {
    webSocket;

    constructor(url: string) {
        this.webSocket = new WebSocket(url);
        this.initialiseWebsocket();
    }

    sendRaw(data: any) {
        this.webSocketSend(data);
    }

    sendInstruction(data: Instruction) {
        this.sendRaw(data);
    }

    sendMessage(data: Message) {
        this.sendRaw(data);
    }

    sendLobbyRequest(data: LobbyRequest) {
        this.sendRaw(data)
    }
    
    initialiseWebsocket() {
        this.webSocket.onopen = (event) => this.webSocketOpen(event);
        this.webSocket.onmessage = (data) => this.webSocketMessage(data)
    }


    webSocketOpen(event: Event) {
        this.webSocketSend({ "success": true, "data": Math.random() });
    }

    webSocketSend(request: any) {
        let data = JSON.stringify(request);
        console.log(`Client: ${data}`);
        this.webSocket.send(data);
    }

    webSocketMessage(response: MessageEvent<any>) {
        let data = response.data;
        console.log('Server: '+data);
    }
}