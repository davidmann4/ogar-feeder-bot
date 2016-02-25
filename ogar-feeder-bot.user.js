// ==UserScript==
// @name         ogar-feeder-bot
// @namespace    http://github.com/davidmann4/
// @version      0.02
// @description  to be writen
// @author       davidmann4
// @license      MIT
// @match        http://agar.io/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.4/socket.io.min.js
// @require      https://raw.githubusercontent.com/xzfc/agar-expose/master/expose.user.js
// @grant        none
// @run-at       document-start
// ==/UserScript==

//http://agar.io/img/background.png

setTimeout(function() {
    
image = new Image();
image.crossOrigin = 'anonymous';
image.src = 'http://i.imgur.com/dOFpphQ.png';
window.agar.hooks.cellSkin = function(cell, old_skin) {
    if (cell.name == "Bot") return image;
    return old_skin;
}    

var socket = io.connect('ws://104.236.100.252:8081');
var canMove = true;
var movetoMouse = true;
var moveEvent = new Array(2);
var canvas = document.getElementById("canvas");
last_transmited_game_server = null;

socket.on('force-login', function (data) {
    socket.emit("login", {"uuid":client_uuid, "type":"client"});
    transmit_game_server();
});

$( "#canvas" ).after( "<div style='background-color: #000000; -moz-opacity: 0.4; -khtml-opacity: 0.4; opacity: 0.4; filter: alpha(opacity=40); zoom: 1; width: 205px; top: 10px; left: 10px; display: block; position: absolute; text-align: center; font-size: 20px; color: #ffffff; padding: 5px; font-family: Ubuntu;'> <div style='color:#ffffff; display: inline; -moz-opacity:1; -khtml-opacity: 1; opacity:1; filter:alpha(opacity=100); padding: 10px;'>Minions: <a id='minionCount' >Offline</a> </div>" );

socket.on('spawn-count', function (data) {
    document.getElementById('minionCount').innerHTML = data;
});

var client_uuid = localStorage.getItem('client_uuid');

if(client_uuid == null){
    console.log("generating a uuid for this user");
    client_uuid =  Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    localStorage.setItem('client_uuid', client_uuid);
}

socket.emit("login", client_uuid);

$("#instructions").replaceWith('<br><div class="input-group"><span class="input-group-addon" id="basic-addon1">UUID</span><input type="text" value="' + client_uuid + '" readonly class="form-control"</div>');

// values in --> window.agar

function isMe(cell){
    for (var i = 0; i < window.agar.myCells.length; i++){
        if (window.agar.myCells[i] == cell.id){
            return true;
        }
    }
    return false;
}
    
function getCell(){
    var me = [];
    for (var key in window.agar.allCells){
        var cell = window.agar.allCells[key];
        if (isMe(cell)){
            me.push(cell);
        }
    }
        return me[0];
}
    
    var skin_var = 0;

function emitPosition(){
    
     if (skin_var == 0){
            skin = "%shark"
            skin_var = 1;
        }else{
            skin = "%kraken"
            skin_var = 0;
        }
    
    for (i = 0; i < agar.myCells.length; i++) {       
       //agar.allCells[agar.myCells[i]].C = skin      
    }
        
    
    
    x = (mouseX - window.innerWidth / 2) / window.agar.drawScale + window.agar.rawViewport.x;
    y = (mouseY - window.innerHeight / 2) / window.agar.drawScale + window.agar.rawViewport.y;

    if(!movetoMouse)
    {
        x = getCell().x;
        y = getCell().y;
    }

    socket.emit("pos", {"x": x, "y": y, "dimensions": agar.dimensions, "suicide_targets": agar.myCells} );    
}

function emitSplit(){
    socket.emit("cmd", {"name":"split"} ); 
}

function emitMassEject(){
    socket.emit("cmd", {"name":"eject"} );    
}

function toggleMovement(){
    canMove = !canMove;

    switch(canMove)
    {
        case true:
            canvas.onmousemove = moveEvent[0];
            moveEvent[0] = null;

            canvas.onmousedown = moveEvent[1];
            moveEvent[1] = null;
            break;
            
        case false:
            canvas.onmousemove({clientX: innerWidth / 2, clientY: innerHeight / 2});
            
            moveEvent[0] = canvas.onmousemove;
            canvas.onmousemove = null;

            moveEvent[1] = canvas.onmousedown;
            canvas.onmousedown = null;
            break;
    }
}

interval_id = setInterval(function() {
   emitPosition();
}, 100);

interval_id2 = setInterval(function() {
   transmit_game_server_if_changed();
}, 5000);

document.addEventListener('keydown',function(e){
    var key = e.keyCode || e.which;
    switch(key)
    {
        case 65://a has been pressed. (Toggle Position)
            movetoMouse = !movetoMouse;
            break;

        case 68://d has been pressed. (Toggle Movement)
            toggleMovement();
            break;

        case 69://e has been pressed. (Split Bots)
            emitSplit();
            break;

        case 82://r has been pressed. (Eject Mass from Bots)
            emitMassEject();
            break;
    }
});

function transmit_game_server_if_changed(){
    if(last_transmited_game_server != window.agar.ws){
        transmit_game_server();
    }
}

function transmit_game_server(){
    last_transmited_game_server = window.agar.ws;
    socket.emit("cmd", {"name":"connect_server", "ip": last_transmited_game_server } );    
}

var mouseX = 0;
var mouseY = 0;

$("body").mousemove(function( event ) {
    mouseX = event.clientX;
    mouseY = event.clientY;
});

    window.agar.minScale = -30;
   }, 5000);
}
