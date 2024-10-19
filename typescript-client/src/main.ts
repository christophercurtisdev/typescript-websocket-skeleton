import SimpleSocket from "./Classes/SimpleSocket.js";
import $ from "jquery";

$(function() {

    const reactorSocket = new SimpleSocket('ws://localhost:8082');

    var createLobbyButton = $('#createLobbyButton');
    var joinLobbyButton = $('#joinLobbyButton');
    var sendInstructionButton = $('#sendInstructionButton');
    var sendMessageButton = $('#sendMessageButton');
    initialiseLobbyButtonListeners();
    initialiseReactorInterface();

    function initialiseLobbyButtonListeners() {
        createLobbyButton.on('click', function() {
            reactorSocket.sendLobbyRequest({ request: 'create' }); // Send a lobby request object
        });

        joinLobbyButton.on('click', function() {
            reactorSocket.sendLobbyRequest({ request: 'join', lobbyCode: 'ABC123' }); // Send a lobby request object
        });
    }

    function initialiseReactorInterface() {

    }

    function initialiseControllerListeners() {
        sendInstructionButton.on('click', function() {
            reactorSocket.sendInstruction({ input: 'some-cool-button', value: 'pressed' }); // Send an instruction object
        });
    }

    function initialiseStatsListeners() {
        sendMessageButton.on('click', function() {
            reactorSocket.sendMessage({ value: 'pressed' }); // Send a message object
        });
    }
});