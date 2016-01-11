//Example of multiple connections in one script
//This code is badly documented, please read basic.js in this folder if you don't understand this code
var config = require('./config');


var AgarioClient = require('agario-client');     //Use this in your scripts

function ExampleBot(bot_id, agent, bot_number, server, key) {
    this.bot_id      = bot_id;         //ID of bot for logging
    this.nickname    = "austria" + bot_id;//'free cookies';//default nickname
    this.verbose     = true;           //default logging enabled
    this.interval_id = 0;              //here we will store setInterval's ID

    this.server     = '';   //server address will be stored here
    this.server_key = '';   //server key will be stored here

    this.client       = new AgarioClient('Bot ' + this.bot_id); //create new client
    this.client.debug = 1; //lets set debug to 1
    this.client.agent = agent;
    this.onboard_client(server, key, bot_number)

}

ExampleBot.prototype = {
    log: function(text) {
        if(this.verbose) {
            console.log(this.bot_id + ' says: ' + text);
        }
    },

    onboard_client: function(server, key, bot_number){
        var bot = this;
        setTimeout(function() {
                bot.connect(server, key);
        }, 1000 * bot_number);
    },

    connect: function(server, key) {
        this.log('Connecting to ' + server + ' with key ' + key);
        this.server = server;
        this.server_key = key;
        this.client.connect(server, key);
        this.attachEvents();
    },

    attachEvents: function() {
        var bot = this;

        bot.client.on('connected', function() {
            bot.log('Connected, spawning');
            bot.client.spawn(bot.nickname);
            //we will search for target to eat every 100ms
            bot.interval_id = setInterval(function(){bot.recalculateTarget()}, 100);
        });

        bot.client.on('connectionError', function(e) {
            bot.log('Connection failed with reason: ' + e);
            bot.log('Server address set to: ' + bot.server + ' key ' + bot.server_key);

            /*
            setTimeout(function() {
                bot.connect(bot.server,bot.key);
            }, 3000);
            */
        });


        bot.client.on('myNewBall', function(ball_id) {
            bot.log('My new ball ' + ball_id);
        });

        bot.client.once('leaderBoardUpdate', function(old, leaders) {
            var name_array = leaders.map(function(ball_id) {
                return bot.client.balls[ball_id].name || 'unnamed'
            });

            bot.log('Leaders on server: ' + name_array.join(', '));
        });

        bot.client.on('somebodyAteSomething', function(eater_ball, eaten_ball) {
            var ball = bot.client.balls[eater_ball];
            if(!ball) return; //if we don't know that ball, we don't care
            if(!ball.mine) return; //if it's not our ball, we don't care
            //bot.client.log('I ate ' + eaten_ball + ', my new size is ' + ball.size);
        });

        bot.client.on('mineBallDestroy', function(ball_id, reason) { //when my ball destroyed
            if(reason.by) {
                bot.log(bot.client.balls[reason.by] + ' ate my ball');
            }

            if(reason.reason == 'merge') {
                //bot.log('My ball ' + ball_id + ' merged with my other ball, now i have ' + bot.client.my_balls.length + ' balls');
            }else{
                //bot.log('I lost my ball ' + ball_id + ', ' + bot.client.my_balls.length + ' balls left');
            }
        });

        bot.client.on('lostMyBalls', function() {
            bot.log('Lost all my balls, respawning');
            bot.client.spawn(bot.nickname);
        });

        bot.client.on('disconnect', function() {
            bot.log('Disconnected from server, bye!');
        });

        bot.client.on('reset', function() { //when client clears everything (connection lost?)
            clearInterval(bot.interval_id);
        });
    },

    getDistanceBetweenBalls: function(ball_1, ball_2) {
        return Math.sqrt( Math.pow( ball_1.x - ball_2.x, 2) + Math.pow( ball_2.y - ball_1.y, 2) );
    },

    recalculateTarget: function() {
        var bot = this;
        var candidate_ball = null;
        var candidate_distance = 0;
        var my_ball = bot.client.balls[ bot.client.my_balls[0] ];
        if(!my_ball) return;

        for(var ball_id in bot.client.balls) {
            var ball = bot.client.balls[ball_id];
            if(ball.virus){
                //console.log("player spotted");                
                continue;
            }
            if(!ball.visible) continue;
            if(ball.mine) continue;
            if(ball.size/my_ball.size > 0.5) continue;
            var distance = bot.getDistanceBetweenBalls(ball, my_ball);
            if(candidate_ball && distance > candidate_distance) continue;

            candidate_ball = ball;
            candidate_distance = bot.getDistanceBetweenBalls(ball, my_ball);
        }
        if(!candidate_ball) return;

        //bot.log('closest ' + candidate_ball + ', distance ' + candidate_distance);
        if(valid_player_pos!=null){
            candidate_ball.x = valid_player_pos["x"];
            candidate_ball.y = valid_player_pos["y"];
        }

        bot.client.moveTo(candidate_ball.x, candidate_ball.y);
    }
};

//you can do this in your code to use bot as lib
//module.exports = ExampleBot;

//launching bots below


var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if(!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1, index = -1;

            for(i = 0; i < this.length; i++) {
                var item = this[i];

                if((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }

            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};

//trololol
var WebSocket    = require('ws');
var msgpack = require('msgpack');
var sleep = require('sleep');
var valid_player_ids = null;
var valid_player_pos = null;

function miniMapConnectToServer() {
        address = config.mapserver;
        try {
            var ws = new WebSocket(address, null);
        } catch (ex) {
            console.error(ex);
            return false;
        }
        ws.binaryType = "arraybuffer";

        ws.onopen = function() {            
            console.log(address + ' connected');
        }

        ws.onmessage = function(event) {
            var buffer = new Uint8Array(event.data);
            var packet = msgpack.unpack(buffer);
            switch(packet.type) {
                case 128:
                    
                    for (var i=0; i < packet.data.addition.length; ++i) {
                        var cell = packet.data.addition[i];

                        if(contains.call(valid_player_ids, cell.id)){
                            //console.log(cell);
                            valid_player_pos = cell;
                            return;
                        }
                                               
                    }
                    break;
                case 129:
                    players = packet.data;
                    //console.log(players); 
                    if(players[0]["name"].length != 0){
                        valid_player_ids = players[0]["ids"];
                    }
                    break;
                
            }
        }

        ws.onerror = function() {            
            console.error('failed to connect to map server');
        }

        ws.onclose = function() {            
            map_server = null;
            console.log('map server disconnected');
        }

        map_server = ws;
    }

miniMapConnectToServer();
fs = require('fs');
var HttpsProxyAgent = require('https-proxy-agent');

function getRandomLine(filename){
    var fs = require('fs');
    var lines = fs.readFileSync(filename).toString().split("\n");
    line = lines[Math.floor(Math.random()*lines.length)];   
    return line
}



key = process.argv[2];

 //object of bots
var bots = {
    "1" : null,
    "2" : null,
};
bot_count = 0;
var bots_names = ['spy','obama','merkel','poland','austria'];

var fs = require('fs');
var lines = fs.readFileSync(config.proxies).toString().split("\n");
var url = require('url');

for(proxy_line in lines) {
 if (proxy_line != process.argv[3]){continue;} //usefull for testing single proxies

 proxy = "http://" + lines[proxy_line];
 console.log(proxy);
    try{
        var opts = url.parse(proxy);
        agent = HttpsProxyAgent(opts);

        if(lines[proxy_line] == "NOPROXY"){
            agent = null;
        }

        //agent= null; // , agent: agent
        console.log('Requesting party server');
        AgarioClient.servers.getPartyServer({region: 'EU-London', party_key: key, agent: agent}, function(srv) {
            if(!srv.server) return console.log('Failed to request server (error=' + srv.error + ', error_source=' + srv.error_source + ')');
            console.log('Engaging bots to party http://agar.io/#' + srv.key + ' on IP ' + srv.server);
            for(var bot_id in bots_names) {
                bot_count++;
                bots[bot_count] =  new ExampleBot(bot_count, agent, bot_count, 'ws://' + srv.server, srv.key);                
                       
            }              
        });
            
        
    }catch(e){
        console.log('error on startup');
    }
}
