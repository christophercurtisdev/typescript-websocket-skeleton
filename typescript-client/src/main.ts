import SimpleSocket from "./Classes/SimpleSocket.js";
import $ from "jquery";
import interact from "interactjs";

$(function () {

    let positions: any = [];

    interact('.draggable').draggable({
        ignoreFrom: '.switch',
        listeners: {
            move(event) {
                positions[event.target.id] = positions[event.target.id] ?? { x: 0, y: 0 }
                let position: any = positions[event.target.id];
                position.x += event.dx;
                position.y += event.dy;

                event.target.style.transform =
                    `translate(${position.x}px, ${position.y}px)`;
            }
        }
    });

    const reactorSocket = new SimpleSocket('ws://localhost:8082', onMessage);

    var createLobbyButton = $('#createLobbyButton');
    var joinLobbyButton = $('#joinLobbyButton');
    initialiseLobbyButtonListeners();

    function initialiseLobbyButtonListeners() {
        createLobbyButton.on('click', function () {
            reactorSocket.sendLobbyRequest({ request: 'create' }); // Send a lobby request object
            $('#main').load('controller.html', function (response, status) {
                initialiseControllerListeners();
                $('input#playerType').val('controller');
            });
        });

        joinLobbyButton.on('click', function () {
            if ($('input#lobbyCode').val()) {
                let lobbyCode = $('input#lobbyCode').val() as string;
                reactorSocket.sendLobbyRequest({ request: 'join', lobbyCode: lobbyCode }); // Send a lobby request object
                $('#main').load('inspector.html', function (response, status) {
                    initialiseStatsListeners();
                    $('input#playerType').val('inspector');
                });
            }
        });
    }

    function initialiseControllerListeners() {
        $('input').on('change', function () {
            let board = new Map();
            $('input[type=checkbox]').each(function (index) {
                board.set($(this).attr('id'), $(this).prop('checked'));
            });
            reactorSocket.sendBoardData({ board: board }); // Send an instruction object
        });
    }

    function initialiseStatsListeners() {
        $(document).on('keypress', function (e) {
            if (e.which == 13) {
                let message = $('#terminalInput').val() as string;
                $('#terminalInput').val('');
                reactorSocket.sendMessage({ body: message }); // Send a message object
            }
        });
    }

    function onMessage(response: MessageEvent<any>) {
        if ($('input#playerType').val() == 'controller') {
            updateControllerValues(response);
        }

        if ($('input#playerType').val() == 'inspector') {
            updateInspectorValues(response);
        }
    }

    function updateInspectorValues(response: MessageEvent<any>) {
        let reactorResponse = JSON.parse(response.data);
        let data = reactorResponse['data'];
        $('#heat').html(data['stats']['heat']);
    }

    function updateControllerValues(response: MessageEvent<any>) {
        let reactorResponse = JSON.parse(response.data);
        let data = reactorResponse['data'];
        printMessage(data['body']);
    }

    function printMessage(message: any) {
        $('#paper').html(message);
    }
});