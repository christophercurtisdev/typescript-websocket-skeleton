export default class SimpleSocket {
    webSocket;

    constructor(url: string) {
        console.log('Creating Reactor Socket...');

        this.webSocket = new WebSocket(url);
        this.initialiseWebsocket();
    }

    send(data: string) {
        // This is what you call for a call and response from the server
        this.webSocketSend(data);
    }
    
    initialiseWebsocket() {
        this.webSocket.onopen = (event) => this.webSocketOpen(event);
        this.webSocket.onmessage = (data) => this.webSocketMessage(data)
    }


    webSocketOpen(event: Event) {
        console.log('Successfully connected: ');
        console.log(event)
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