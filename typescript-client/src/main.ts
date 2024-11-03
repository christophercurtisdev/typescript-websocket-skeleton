import SimpleSocket from "./Classes/SimpleSocket.js";
import $ from "jquery";
import interact from "interactjs";

$(function () {

    const position = { x: 0, y: 0 }

    interact('.draggable').draggable({
        ignoreFrom: '.switch',
        listeners: {
            move(event) {
                position.x += event.dx
                position.y += event.dy

                event.target.style.transform =
                    `translate(${position.x}px, ${position.y}px)`
            },
        }
    });

    const reactorSocket = new SimpleSocket('ws://localhost:8082', updateInspectorValues);

    var createLobbyButton = $('#createLobbyButton');
    var joinLobbyButton = $('#joinLobbyButton');
    initialiseLobbyButtonListeners();

    function initialiseLobbyButtonListeners() {
        createLobbyButton.on('click', function () {
            reactorSocket.sendLobbyRequest({ request: 'create' }); // Send a lobby request object
            $('body').load('controller.html', function (response, status) {
                initialiseControllerListeners();
            });
        });

        joinLobbyButton.on('click', function () {
            if ($('input#lobbyCode').val()) {
                let lobbyCode = $('input#lobbyCode').val() as string;
                reactorSocket.sendLobbyRequest({ request: 'join', lobbyCode: lobbyCode }); // Send a lobby request object
                $('body').load('inspector.html');
            }
        });
    }

    function initialiseControllerListeners() {
        $('input').on('change', function () {
            let board = new Map();
            $('input[type=checkbox]').each(function(index) {
                board.set($(this).attr('id'), $(this).prop('checked'));
            });
            reactorSocket.sendBoardData({ board: board }); // Send an instruction object
        });
    }

    function initialiseStatsListeners() {
        // sendMessageButton.on('click', function () {
        //     reactorSocket.sendMessage({ value: 'pressed' }); // Send a message object
        // });
    }

    function updateInspectorValues(response: MessageEvent<any>) {
        let reactorResponse = JSON.parse(response.data);
        let data = reactorResponse['data'];
        $('#heat').html(data['stats']['heat']);
    }

    function updateControllerValues(response: MessageEvent<any>) {

    }
});