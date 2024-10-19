import Reactor from "./Classes/Reactor.js";
import SimpleSocket from "./Classes/SimpleSocket.js";
import $ from "jquery";

const reactorSocket = new SimpleSocket('ws://localhost:8082');
const reactor = new Reactor();

$(function() {
    var createLobbyButton = $('#createLobbyButton');
    var joinLobbyButton = $('#joinLobbyButton');
    var sendInstructionButton = $('#sendInstructionButton');
    var sendMessageButton = $('#sendMessageButton');

    createLobbyButton.on('click', function() {
        reactorSocket.sendLobbyRequest({ type: 'create' }); // Send a lobby request object
    });

    joinLobbyButton.on('click', function() {
        reactorSocket.sendLobbyRequest({ type: 'join', lobbyCode: 'ABC123' }); // Send a lobby request object
    });

    sendInstructionButton.on('click', function() {
        reactorSocket.sendInstruction({ input: 'some-cool-button', value: 'pressed' }); // Send an instruction object
    });

    sendMessageButton.on('click', function() {
        reactorSocket.sendMessage({ value: 'pressed' }); // Send a message object
    });
});