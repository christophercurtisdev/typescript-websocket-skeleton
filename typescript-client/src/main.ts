import ExampleObject from "./Classes/ExampleObject.js";
import SimpleSocket from "./Classes/SimpleSocket.js";
import $ from "jquery";

const reactorSocket = new SimpleSocket('ws://localhost:8082');
const reactor = new ExampleObject();

$(function() {
    var createLobbyButton = $('#createLobbyButton');
    var joinLobbyButton = $('#joinLobbyButton');

    createLobbyButton.on('click', function() {
        reactorSocket.send('Create Lobby: {random string id}');
    });

    joinLobbyButton.on('click', function() {
        reactorSocket.send('Join Lobby: {existing lobby id}');
    });
});