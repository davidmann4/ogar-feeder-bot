// ==UserScript==
// @name         agar-feeder-bot
// @namespace    http://github.com/davidmann4/
// @version      0.01
// @description  to be writen
// @author       davidmann4
// @license      MIT
// @match        http://agar.io/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.4/socket.io.min.js
// @grant        none
// @run-at       document-body
// ==/UserScript==

var socket = io.connect('ws://localhost:8081');

socket.on('news', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
});

socket.emit("login", "my_token");