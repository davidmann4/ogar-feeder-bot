// ==UserScript==
// @name         Ogar-feeder-bot
// @namespace    https://github.com/davidmann4/ogar-feeder-bot
// @version      2.8
// @description  Ogar-feeder-bots for ogar servers!
// @author       davidmann4
// @license      MIT
// @match        http://agar.io/*
// @require      https://cdnjs.cloudflare.com/ajax/libs/socket.io/1.4.5/socket.io.min.js
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

var socket = io('ws://104.236.100.252:8081');
var canMove = true;
var movetoMouse = false;
var moveEvent = new Array(2);
var canvas = document.getElementById("canvas");
last_transmited_game_server = null;

socket.on('force-login', function (data) {
    socket.emit("login", {"uuid":client_uuid, "type":"client"});
    transmit_game_server();
});
    var a = '';
    var iDiv = document.createElement('div');
    iDiv.id = 'block';
    document.getElementsByTagName('body')[0].appendChild(iDiv);
    iDiv.innerHTML = '<div style="position: absolute; top: 10px; left: 10px; padding: 0px 8px; font-family: Tahoma; color: rgb(255, 255, 255); z-index: 9999; border-radius: 5px; min-height: 10px; min-width: 200px; background-color: rgba(0, 0, 0, 0.6);"><br><div id="counter"><center><b>Waiting Bots...</b></center></div></b><b><div id="tLeft">Time Left <span class="label label-none pull-right">-</span></div></b>' + a
    +'<b><div id="bName">Bots Name <span class="label pull-right">-</span></div></b><b><div id="mControl"></div><div id="cSkin">Custom Skin <span class="label label-danger pull-right">OFF</span></div></b><b><div id="cMove"></div></b>' + a 
    +'<br></div>';
setInterval(function(){
    if(!movetoMouse){
    document.getElementById('mControl').innerHTML = '<div id="mControl">Mouse Control <span class="label label-danger pull-right">OFF</span></div>';
    }else{
    document.getElementById('mControl').innerHTML = '<div id="mControl">Mouse Control <span class="label label-success pull-right">ON</span></div>';
    }
    if(canMove){
    document.getElementById('cMove').innerHTML = '<div id="cMove">Stop Move <span class="label label-danger pull-right">OFF</span></div>';
    }else{
    document.getElementById('cMove').innerHTML = '<div id="cMove">Stop Move <span class="label label-success pull-right">ON</span></div>';
    }
}, 1000);

var timer = null;
var botsUsed = false;
socket.on('spawn-count', function (data) {
 if(data.count != null){
    document.getElementById('counter').innerHTML = '<b>Online Bots <span class="label label-success pull-right">' + data.count + '</span>';
    document.getElementById('bName').innerHTML = '<div id="bName">Bots Name <span class="label pull-right">' + data.nick + '</span></div>';
    var t = data.timer;
    var seconds = Math.floor( (t/1000) % 60 );
    var minutes = Math.floor( (t/1000/60) % 60 );
    var hours = Math.floor( (t/(1000*60*60)) % 24 );
    var days = Math.floor( t/(1000*60*60*24) );
    if(days){
    document.getElementById('tLeft').innerHTML = '<div id="tLeft">Time Left <span class="label label-default pull-right">' + days.toFixed() + ' day ' + hours.toFixed() + 'hr</span></div>';
    }else
    if(hours){
    document.getElementById('tLeft').innerHTML = '<div id="tLeft">Time Left <span class="label label-default pull-right">' + hours.toFixed() + ' hr ' + minutes.toFixed() + ' min</span></div>';
    }else{
    document.getElementById('tLeft').innerHTML = '<div id="tLeft">Time Left <span class="label label-default pull-right">' + minutes.toFixed() + ' min ' + seconds.toFixed() + ' seconds</span></div>';
    }
  return {
    'total': t,
    'days': days,
    'hours': hours,
    'minutes': minutes,
    'seconds': seconds
  };
 }else{
    document.getElementById('counter').innerHTML = '<div id="counter"><center><b>Your Bots Expired!</b></center></div>';
    document.getElementById('bName').innerHTML = '<b><div id="bName">Bots Name <span class="label pull-right">-</span></div>';
    document.getElementById('tLeft').innerHTML = '<div>Time expired! <a target="_blank" href="https://github.com/davidmann4/ogar-feeder-bot" class="btn label label-success pull-right">Click!</a></div>';
 }
});
var client_uuid = localStorage.getItem('client_uuid');

if(client_uuid == null){
    console.log("generating a uuid for this user");
    client_uuid =  Math.floor((1 + Math.random()) * 0x10000000).toString(16).substring(1) + "-" + Math.floor((1 + Math.random()) * 0x10000000).toString(16).substring(1);
    localStorage.setItem('client_uuid', client_uuid);
}

socket.emit("login", client_uuid);
var information = '<div style="display:none;padding: 0px; width: 293px; height: 366px; position: relative; background-image: url(/img/incentive.png);">'+ a 
                + '<center><h4>INFORMATION</h4></center><br>';

$("#instructions").replaceWith('<hr><div class="form-group has-success has-feedback"><input type="text" value="YOUR CLIENT UUID: ' + client_uuid + '" readonly class="form-control input-success"><span class="glyphicon glyphicon-ok form-control-feedback"></span></div>'+ a 
                               + '<div class="input-group"><input id="skinSelector" placeholder="Custom Skin" type="text" class="form-control"><span class="input-group-btn"><button type="button" class="btn btn-info" data-toggle="collapse" data-target="#demo"><span class="glyphicon glyphicon-info-sign"></span></button></span></div>' + a 
                               + '<div id="demo" class="collapse"><hr><center>Write the Skin Name and Press TAB to Disguise!<br><small>WARNING: Only you see your custom Skin!<br>Ex. shark, kraken, raptor</small></center></div>');

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
    
    var skin = "shark";
    var useCustomSkin = false;
function useSkin(data){
   if(data == 1){
    useCustomSkin = true;
    document.getElementById('cSkin').innerHTML = '<div id="cSkin">Custom Skin <span class="label label-success pull-right">ON</span></div>';
   }
   if(data == 0){
    useCustomSkin = false;
    document.getElementById('cSkin').innerHTML = '<div id="cSkin">Custom Skin <span class="label label-danger pull-right">OFF</span></div>';
   }
}
function emitPosition(){
    skin = "%" + document.getElementById("skinSelector").value;
    for (i = 0; i < agar.myCells.length; i++) {   
      if(useCustomSkin == true){
       agar.allCells[agar.myCells[i]].C = skin     
      }
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
        case 88://x has been pressed. (Switch Skin)
   if(useCustomSkin == true){
    useSkin(0);
   }else{
    useSkin(1);
   }
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

//EXPOSED CODE BELOW
 
var allRules = [
    { hostname: ["agar.io"],
      scriptUriRe: /^http:\/\/agar\.io\/main_out\.js/,
      replace: function (m) {
          m.removeNewlines()
 
          m.replace("var:allCells",
                    /(=null;)(\w+)(.hasOwnProperty\(\w+\)?)/,
                    "$1" + "$v=$2;" + "$2$3",
                    "$v = {}")
 
          m.replace("var:myCells",
                    /(case 32:)(\w+)(\.push)/,
                    "$1" + "$v=$2;" + "$2$3",
                    "$v = []")
 
          m.replace("var:top",
                    /case 49:[^:]+?(\w+)=\[];/,
                    "$&" + "$v=$1;",
                    "$v = []")
 
          m.replace("var:ws",
                    /new WebSocket\((\w+)[^;]+?;/,
                    "$&" + "$v=$1;",
                    "$v = ''")
 
          m.replace("var:topTeams",
                    /case 50:(\w+)=\[];/,
                    "$&" + "$v=$1;",
                    "$v = []")
 
          var dr = "(\\w+)=\\w+\\.getFloat64\\(\\w+,!0\\);\\w+\\+=8;\\n?"
          var dd = 7071.067811865476
          m.replace("var:dimensions",
                    RegExp("case 64:"+dr+dr+dr+dr),
                    "$&" + "$v = [$1,$2,$3,$4],",
                    "$v = " + JSON.stringify([-dd,-dd,dd,dd]))
 
          var vr = "(\\w+)=\\w+\\.getFloat32\\(\\w+,!0\\);\\w+\\+=4;"
          m.save() &&
              m.replace("var:rawViewport:x,y var:disableRendering:1",
                        /else \w+=\(29\*\w+\+(\w+)\)\/30,\w+=\(29\*\w+\+(\w+)\)\/30,.*?;/,
                        "$&" + "$v0.x=$1; $v0.y=$2; if($v1)return;") &&
              m.replace("var:disableRendering:2 hook:skipCellDraw",
                        /(\w+:function\(\w+\){)(if\(this\.\w+\(\)\){\+\+this\.[\w$]+;)/,
                        "$1" + "if($v || $H(this))return;" + "$2") &&
              m.replace("var:rawViewport:scale",
                        /Math\.pow\(Math\.min\(64\/\w+,1\),\.4\)/,
                        "($v.scale=$&)") &&
              m.replace("var:rawViewport:x,y,scale",
                        RegExp("case 17:"+vr+vr+vr),
                        "$&" + "$v.x=$1; $v.y=$2; $v.scale=$3;") &&
              m.reset_("window.agar.rawViewport = {x:0,y:0,scale:1};" +
                       "window.agar.disableRendering = false;") ||
              m.restore()
              
              
 
          m.replace("reset",
                    /new WebSocket\(\w+[^;]+?;/,
                    "$&" + m.reset)
 
          m.replace("property:scale",
                    /function \w+\(\w+\){\w+\.preventDefault\(\);[^;]+;1>(\w+)&&\(\1=1\)/,
                    `;${makeProperty("scale", "$1")};$&`)
 
          m.replace("var:minScale",
                    /;1>(\w+)&&\(\1=1\)/,
                    ";$v>$1 && ($1=$v)",
                    "$v = 1")
 
          m.replace("var:region",
                    /console\.log\("Find "\+(\w+\+\w+)\);/,
                    "$&" + "$v=$1;",
                    "$v = ''")

          m.replace("cellProperty:isVirus",
                    /((\w+)=!!\(\w+&1\)[\s\S]{0,400})((\w+).(\w+)=\2;)/,
                    "$1$4.isVirus=$3")
 
          m.replace("var:dommousescroll",
                    /("DOMMouseScroll",)(\w+),/,
                    "$1($v=$2),")
 
          m.replace("var:skinF hook:cellSkin",
                    /(\w+.fill\(\))(;null!=(\w+))/,
                    "$1;" +
                    "if($v)$3 = $v(this,$3);" +
                    "if($h)$3 = $h(this,$3);" +
                    "$2");
 
          /*m.replace("bigSkin",
                    /(null!=(\w+)&&\((\w+)\.save\(\),)(\3\.clip\(\),\w+=)(Math\.max\(this\.size,this\.\w+\))/,
                    "$1" + "$2.big||" + "$4" + "($2.big?2:1)*" + "$5")*/
 
          m.replace("hook:afterCellStroke",
                    /\((\w+)\.strokeStyle="#000000",\1\.globalAlpha\*=\.1,\1\.stroke\(\)\);\1\.globalAlpha=1;/,
                    "$&" + "$H(this);")
 
          m.replace("var:showStartupBg",
                    /\w+\?\(\w\.globalAlpha=\w+,/,
                    "$v && $&",
                    "$v = true")
          
 
          var vAlive = /\((\w+)\[(\w+)\]==this\){\1\.splice\(\2,1\);/.exec(m.text)
          var vEaten = /0<this\.[$\w]+&&(\w+)\.push\(this\)}/.exec(m.text)
          !vAlive && console.error("Expose: can't find vAlive")
          !vEaten && console.error("Expose: can't find vEaten")
          if (vAlive && vEaten)
              m.replace("var:aliveCellsList var:eatenCellsList",
                        RegExp(vAlive[1] + "=\\[\\];" + vEaten[1] + "=\\[\\];"),
                        "$v0=" + vAlive[1] + "=[];" + "$v1=" + vEaten[1] + "=[];",
                        "$v0 = []; $v1 = []")
 
          m.replace("hook:drawScore",
                    /(;(\w+)=Math\.max\(\2,(\w+\(\))\);)0!=\2&&/,
                    "$1($H($3))||0!=$2&&")
 
          m.replace("hook:beforeTransform hook:beforeDraw var:drawScale",
                    /(\w+)\.save\(\);\1\.translate\((\w+\/2,\w+\/2)\);\1\.scale\((\w+),\3\);\1\.translate\((-\w+,-\w+)\);/,
                    "$v = $3;$H0($1,$2,$3,$4);" + "$&" + "$H1($1,$2,$3,$4);",
                    "$v = 1")

          m.replace("hook:afterDraw",
                    /(\w+)\.restore\(\);(\w+)&&\2\.width&&\1\.drawImage/,
                    "$H();" + "$&")
                    
 
          m.replace("hook:cellColor",
                    /(\w+=)this\.color,/,
                    "$1 ($h && $h(this, this.color) || this.color),")
 
          m.replace("var:drawGrid",
                    /(\w+)\.globalAlpha=(\.2\*\w+);/,
                    "if(!$v)return;" + "$&",
                    "$v = true")
 
          m.replace("hook:drawCellMass",
                    /&&\((\w+\|\|0==\w+\.length&&\(!this\.\w+\|\|this\.\w+\)&&20<this\.size)\)&&/,
                    "&&( $h ? $h(this,$1) : ($1) )&&")
 
          m.replace("hook:cellMassText",
                    /(\.\w+)(\(~~\(this\.size\*this\.size\/100\)\))/,
                    "$1( $h ? $h(this,$2) : $2 )")
 
          m.replace("hook:cellMassTextScale",
                    /(\.\w+)\((this\.\w+\(\))\)([\s\S]{0,1000})\1\(\2\/2\)/,
                    "$1($2)$3$1( $h ? $h(this,$2/2) : ($2/2) )")
 
          var template = (key,n) =>
              `this\\.${key}=\\w+\\*\\(this\\.(\\w+)-this\\.(\\w+)\\)\\+this\\.\\${n};`
          var re = new RegExp(template('x', 2) + template('y', 4) + template('size', 6))
          var match = re.exec(m.text)
          if (match) {
              m.cellProp.nx = match[1]
              m.cellProp.ny = match[3]
              m.cellProp.nSize = match[5]
          } else
              console.error("Expose: cellProp:x,y,size search failed!")
 
      }},
]
 
function makeProperty(name, varname) {
    return "'" + name + "' in window.agar || " +
        "Object.defineProperty( window.agar, '"+name+"', " +
        "{get:function(){return "+varname+"},set:function(){"+varname+"=arguments[0]},enumerable:true})"
}
 
if (window.top != window.self)
    return
 
if (document.readyState !== 'loading')
    return console.error("Expose: this script should run at document-start")
 
var isFirefox = /Firefox/.test(navigator.userAgent)
 
// Stage 1: Find corresponding rule
var rules
for (var i = 0; i < allRules.length; i++)
    if (allRules[i].hostname.indexOf(window.location.hostname) !== -1) {
        rules = allRules[i]
        break
    }
if (!rules)
    return console.error("Expose: cant find corresponding rule")
 
 
// Stage 2: Search for `main_out.js`
if (isFirefox) {
    function bse_listener(e) { tryReplace(e.target, e) }
    window.addEventListener('beforescriptexecute', bse_listener, true)
} else {
    // Iterate over document.head child elements and look for `main_out.js`
    for (var i = 0; i < document.head.childNodes.length; i++)
        if (tryReplace(document.head.childNodes[i]))
            return
    // If there are no desired element in document.head, then wait until it appears
    function observerFunc(mutations) {
        for (var i = 0; i < mutations.length; i++) {
            var addedNodes = mutations[i].addedNodes
            for (var j = 0; j < addedNodes.length; j++)
                if (tryReplace(addedNodes[j]))
                    return observer.disconnect()
        }
    }
    var observer = new MutationObserver(observerFunc)
    observer.observe(document.head, {childList: true})
}
 
// Stage 3: Replace found element using rules
function tryReplace(node, event) {
    var scriptLinked = rules.scriptUriRe && rules.scriptUriRe.test(node.src)
    var scriptEmbedded = rules.scriptTextRe && rules.scriptTextRe.test(node.textContent)
    if (node.tagName != "SCRIPT" || (!scriptLinked && !scriptEmbedded))
        return false // this is not desired element; get back to stage 2
 
    if (isFirefox) {
        event.preventDefault()
        window.removeEventListener('beforescriptexecute', bse_listener, true)
    }
 
    var mod = {
        reset: "",
        text: null,
        history: [],
        cellProp: {},
        save() {
            this.history.push({reset:this.reset, text:this.text})
            return true
        },
        restore() {
            var state = this.history.pop()
            this.reset = state.reset
            this.text = state.text
            return true
        },
        reset_(reset) {
            this.reset += reset
            return true
        },
        replace(what, from, to, reset) {
            var vars = [], hooks = []
            what.split(" ").forEach((x) => {
                x = x.split(":")
                x[0] === "var" && vars.push(x[1])
                x[0] === "hook" && hooks.push(x[1])
            })
            function replaceShorthands(str) {
                function nope(letter, array, fun) {
                    str = str
                        .split(new RegExp('\\$' + letter + '([0-9]?)'))
                        .map((v,n) => n%2 ? fun(array[v||0]) : v)
                        .join("")
                }
                nope('v', vars, (name) => "window.agar." + name)
                nope('h', hooks, (name) => "window.agar.hooks." + name)
                nope('H', hooks, (name) =>
                     "window.agar.hooks." + name + "&&" +
                     "window.agar.hooks." + name)
                return str
            }
            var newText = this.text.replace(from, replaceShorthands(to))
            if(newText === this.text) {
                console.error("Expose: `" + what + "` replacement failed!")
                return false
            } else {
                this.text = newText
                if (reset)
                    this.reset += replaceShorthands(reset) + ";"
                return true
            }
        },
        removeNewlines() {
            this.text = this.text.replace(/([,\/])\n/mg, "$1")            
        },
        get: function() {
            var cellProp = JSON.stringify(this.cellProp)
            return `window.agar={hooks:{},cellProp:${cellProp}};` +
                this.reset + this.text
        }
    }
 
    if (scriptEmbedded) {
        mod.text = node.textContent
        rules.replace(mod)
        if (isFirefox) {
            document.head.removeChild(node)
            var script = document.createElement("script")
            script.textContent = mod.get()
            document.head.appendChild(script)
        } else {
            node.textContent = mod.get()
        }
        console.log("Expose: replacement done")
    } else {
        document.head.removeChild(node)
        var request = new XMLHttpRequest()
        request.onload = function() {
            var script = document.createElement("script")
            mod.text = this.responseText
            rules.replace(mod)
            script.textContent = mod.get()
            // `main_out.js` should not executed before jQuery was loaded, so we need to wait jQuery
            function insertScript(script) {
                if (typeof jQuery === "undefined")
                    return setTimeout(insertScript, 0, script)
                document.head.appendChild(script)
                console.log("Expose: replacement done")
            }
            insertScript(script)
        }
        request.onerror = function() { console.error("Expose: response was null") }
        request.open("get", node.src, true)
        request.send()
    }
 
    return true
}
