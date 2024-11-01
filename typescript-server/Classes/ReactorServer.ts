import WebSocket, { RawData, WebSocketServer, ServerOptions } from 'ws';
import Lobby from './Lobby';
import Player from './Player';

export default class ReactorServer {

    private static singleton: ReactorServer;
    webSocketServer: WebSocket.Server<typeof WebSocket, any>;
    lobbies: Lobby[] = [];
    players: Player[] = [];


    static instance(options?: ServerOptions<typeof WebSocket, any>) {
        if (ReactorServer.singleton) {
            return ReactorServer.singleton;
        } else {
            let newServer = new ReactorServer(options ?? {});
            ReactorServer.singleton = newServer;
            return newServer;
        }
    }

    static createLobby(player: Player): Lobby {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        let lobbyCode = "";
        const randomArray = new Uint8Array(4);
        crypto.getRandomValues(randomArray);
        randomArray.forEach((number) => {
            lobbyCode += chars[number % chars.length];
        });
        
        console.log('Creating a new lobby: '+lobbyCode);
        let lobby = new Lobby(lobbyCode);
        lobby.addPlayer(player);
        ReactorServer.instance().lobbies.push(lobby);
        return lobby;
    }

    static destroyLobby(lobby: Lobby) {
        let lobbies = ReactorServer.instance().lobbies;
        for (let i = 0; i < lobbies.length; i++) {
            if (lobby.code == lobbies[i].code) {
                console.log('Killing lobby');
                lobby.stopGame();
                delete lobbies[i];
            }
        }
    }

    private constructor(options: ServerOptions<typeof WebSocket, any>) {
        this.webSocketServer = new WebSocketServer(options);
        this.webSocketServer.on('connection', (webSocket, request) => this.onConnection(webSocket, request));
        ReactorServer.singleton = this;
    }

    private onConnection(webSocket: WebSocket, request: any) {
        console.log('Client Connected.');
        let player = new Player(webSocket);
        this.players.push(player);
    }
}