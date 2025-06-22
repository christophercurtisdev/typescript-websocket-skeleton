import SimpleSocket from "./Classes/SimpleSocket.js";
import $ from "jquery";
import interact from "interactjs";


// Entry point to the game (sorry for the mess)
$(function () {

    // Show Inspector view for Testing
    // $('#main').load('inspector.html', function (response, status) {
    //     initialiseStatsListeners();
    //     $('input#playerType').val('inspector');
    // });
    // -------------------------------

    let splitFlapTimeout: any = null;
    let positions: any = [];

    interact('.draggable').draggable({
        ignoreFrom: '.switch',
        listeners: {
            move(event) {
                positions[event.target.id] = positions[event.target.id] ?? { x: 0, y: 0 }
                let position: any = positions[event.target.id];
                position.x += event.dx;
                position.y += event.dy;

                event.target.style.top =
                    `${position.y}px`
                event.target.style.left =
                    `${position.x}px`;
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

        $('#messageLog').on('click', function (e) {
            let newPaper = $('#controllerInstructions').clone();
            newPaper.find('.paper').first().html($(this).html());
            newPaper.attr('id', Date.now());
            $('#main').append(newPaper);
            $(this).html('');
        });
    }

    function initialiseStatsListeners() {
        initialiseSplitFlap();
        $(document).on('keypress', function (e) {
            if (e.which == 13) {
                e.preventDefault();
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
        $('#lobbyCode').html(data['lobbyCode']);
        if (data['type'] == 'MESSAGE') {
            printMessage(data['body']);
        }
    }

    function printMessage(message: string) {
        let sanitisedMessage = message.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()]/g, "");
        if (sanitisedMessage !== message) {
            return $('#messageLog').html($('#messageLog').html() + '<p>ERROR IN MESSAGE</p>');
        }
        let messageParts = sanitisedMessage.split(' ');
        console.log(messageParts);
        console.log(messageParts[0]);
        console.log($(`#${messageParts[0]}`).length);
        if ($(`#${messageParts[0]}`).length) {
            $('#messageLog').html($('#messageLog').html() + '<p>' + sanitisedMessage + '</p>');
            return;
        }

        return $('#messageLog').html($('#messageLog').html() + '<p>ERROR IN MESSAGE</p>');
    }

    //  TESTING
    let splitflapNumber = 0;
    function initialiseSplitFlap() {
        $('#random-number-button').on('click', function() {
            updateSplitFlap(splitflapNumber);
            splitflapNumber++;
        })
    }
    // TESTING

    function updateSplitFlap(newValue: number) {

        let newValueString = String(newValue).padStart(4, '0');

        if (splitFlapTimeout) {
            clearTimeout(splitFlapTimeout);
            splitFlapTimeout = null;
        }
        // ts and ba starts as the current number
        let currentNumbers = $('#temperature').attr('data-temperature')?.split('') ?? ['0','0','0','0'];
        let newNumbers = newValueString.padStart(4, '0').split('');

        $('#temperature').attr('data-temperature', newValueString);

        $('#temperature .splitFlap').each(function(index) {
            $(this).find('.top-flap.animate').html(currentNumbers[index]);
            $(this).find('.top-flap.stationary').html(newNumbers[index]);
            $(this).find('.bottom-flap.stationary').html(currentNumbers[index]);
        });

        // Remove animate class
        let animatedElements = $('#temperature .animate');
        $(animatedElements).removeClass('animate');
        splitFlapTimeout = setTimeout(function () {
            $('#temperature .splitFlap').each(function(index) {
                if(currentNumbers[index] != newNumbers[index]) {
                    $(this).find('.bottom-flap:not(.stationary)').html(newNumbers[index]);
                    $(this).find('.top-flap:not(.stationary)').addClass('animate');
                    $(this).find('.bottom-flap:not(.stationary)').addClass('animate');
                }
            });
        }, 100);
        
    }
});