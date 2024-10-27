import SimpleSocket from "./Classes/SimpleSocket.js";
import $ from "jquery";
import interact from "interactjs";

$(function () {

    const position = { x: 0, y: 0 }

    interact('.draggable').draggable(
        {
            ignoreFrom: '.switch',
            listeners: {
                start(event) {
                    console.log(event.type, event.target)
                },
                move(event) {
                    position.x += event.dx
                    position.y += event.dy

                    event.target.style.transform =
                        `translate(${position.x}px, ${position.y}px)`
                },
            }
        })

    const reactorSocket = new SimpleSocket('ws://localhost:8082');

    var createLobbyButton = $('#createLobbyButton');
    var joinLobbyButton = $('#joinLobbyButton');
    var sendInstructionButton = $('#sendInstructionButton');
    var sendMessageButton = $('#sendMessageButton');
    initialiseLobbyButtonListeners();

    function initialiseLobbyButtonListeners() {
        createLobbyButton.on('click', function () {
            reactorSocket.sendLobbyRequest({ request: 'create' }); // Send a lobby request object
            $('body').load('controller.html');
        });

        joinLobbyButton.on('click', function () {
            console.log($('input#lobbyCode').val());
            if ($('input#lobbyCode').val()) {
                let lobbyCode = $('input#lobbyCode').val() as string;
                reactorSocket.sendLobbyRequest({ request: 'join', lobbyCode: lobbyCode }); // Send a lobby request object
                $('body').load('inspector.html');
            }
        });
    }

    function initialiseControllerListeners() {
        sendInstructionButton.on('click', function () {
            reactorSocket.sendInstruction({ input: 'some-cool-button', value: 'pressed' }); // Send an instruction object
        });
    }

    function initialiseStatsListeners() {
        sendMessageButton.on('click', function () {
            reactorSocket.sendMessage({ value: 'pressed' }); // Send a message object
        });
    }
});