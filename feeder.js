//Example of multiple connections in one script
//This code is badly documented, please read basic.js in this folder if you don't understand this code
var config = require('./config');
var names = require('./names');

var AgarioClient = require('agario-client'); //Use this in your scripts

function FeederBot(bot_id, agent, bot_number, server) {
    this.bot_id = bot_id; //ID of bot for logging

    if (config.useRandomSkinName) {
        this.nickname = names.getRandomName();
    } else {
        this.nickname = config.useStaticName;
    }

    this.interval_id = 0; //here we will store setInterval's ID
    this.ball_id = null;
    this.server = ''; //server address will be stored here
    this.client = new AgarioClient('Bot_' + this.bot_id); //creates new client
    this.client.debug = 0;
    this.client.agent = agent;
    this.client.auth_token = auth_token;
    this.client.headers['user-agent'] = config.userAgent;
    this.isOnFeedMission = false;
    this.onboard_client(server, bot_number)
}

FeederBot.prototype = {
    log: function(text) {
        if (config.verbosityLevel > 0) {
            console.log('Bot_' + this.bot_id + ': ' + text);
        }
    },

    onboard_client: function(server, bot_number) {
        var bot = this;
        setTimeout(function() {
            bot.connect(server);
        }, config.onboardingTimer * bot_number);
    },

    connect: function(server) {
        if (config.verbosityLevel > 0) {
            this.log('Connecting to: ' + server);
        }
        this.server = server;
        this.client.connect(server);
        this.attachEvents();
    },

    attachEvents: function() {
        var bot = this;

        bot.client.on('connected', function() {
            if (config.verbosityLevel > 0) {
                bot.log('Connection Success, spawning');
            }
            bot.client.spawn(bot.nickname);
            //we will search for target to eat every 100ms
            bot.interval_id = setInterval(function() {
                bot.recalculateTarget()
            }, 100);
        });

        bot.client.on('connectionError', function(e) {
            if (config.verbosityLevel > 0) {
                bot.log('Connection Failed: ' + e);
            }
        });


        bot.client.on('myNewBall', function(ball_id) {
            // Should always be generated.
            if (config.verbosityLevel > -1) {
                bot.log('New Cell Generated (' + ball_id + ')');
            }
        });

        bot.client.once('leaderBoardUpdate', function(old, leaders) {
            var name_array = leaders.map(function(ball_id) {
                return bot.client.balls[ball_id].name || 'unnamed'
            });
            if (config.verbosityLevel > 0) {
                bot.log('Server Leaderboard: ' + name_array.join(' - '));
            }
        });

        bot.client.on('somebodyAteSomething', function(eater_ball, eaten_ball) {
            var ball = bot.client.balls[eater_ball];
            if (!ball) return; //if we don't know that ball, we don't care
            if (!ball.mine) return; //if it's not our ball, we don't care
            //bot.client.log('I ate ' + eaten_ball + ', my new size is ' + ball.size);
        });

        bot.client.on('mineBallDestroy', function(ball_id, reason) { //when my ball destroyed
            if (reason.by) {
                if (config.verbosityLevel > 0) {
                    bot.log(bot.client.balls[reason.by] + ' has killed a cell.');
                }
            }

            if (reason.reason == 'merge') {
                if (config.verbosityLevel > 1) {
                    bot.log('Merged with another cell. Bot_' + ball_id + ' now has ' + bot.client.my_balls.length + ' balls.')
                }
            } else {
                if (config.verbosityLevel > 1) {
                    bot.log('Lost a cell! Bot_' + ball_id + ' has ' + bot.client.my_balls.length + ' cells left.');
                }
            }
        });

        bot.client.on('lostMyBalls', function() {
            if (config.verbosityLevel > 0) {
                bot.log('Has been killed, respawning.');
            }
            bot.client.spawn(bot.nickname);
            bot.isOnFeedMission = false;
        });

        bot.client.on('disconnect', function() {
            if (config.verbosityLevel > 0) {
                bot.log('Disconnected from the server.');
            }
        });

        bot.client.on('reset', function() { //when client clears everything (connection lost?)
            clearInterval(bot.interval_id);
        });
    },

    getDistanceBetweenBalls: function(ball_1, ball_2) {
        return this.getDistanceBetweenBallAndPosition(ball_1, ball_2.x, ball_2.y);
    },

    getDistanceBetweenBallAndPosition: function(ball_1, x, y) {
        return this.getDistanceBetweenPositions(ball_1.x,ball_1.y, x, y);
    },

    getDistanceBetweenPositions: function(x1, y1, x2, y2) {
        return Math.sqrt(Math.pow(x2 - x1, 2) + Math.pow(y1 - y2, 2));
    },

    getAvailableTransporter: function() {
        var bot = this;
        var my_ball = bot.client.balls[bot.client.my_balls[0]];
        if (!my_ball) return;

        possible_transporter = null

        for (var bot_id in bots) {
            ball_id = bots[bot_id].id
            bot_ball = bots[bot_id].client.balls[bots[bot_id].client.my_balls[0]];
            if (!bot_ball) continue;
            if (bot.getDistanceBetweenBallAndPosition(my_ball, bot_ball.x, bot_ball.y) > 2000) {
                continue;
            }
            if (bot.getDistanceBetweenBallAndPosition(my_ball, bot_ball) > bot.getDistanceBetweenBallAndPosition(my_ball, possible_transporter)) {
                continue;
            }
            if (my_ball.size / bot_ball.size > 0.8) continue;

            possible_transporter = bot_ball;
        }

        return possible_transporter;
    },


    getMassPixelRadius: function(mass) {
        return Math.ceil(Math.sqrt(100 * mass));
    },

    canSplitFeedPlayer: function(botMass, otherMass) {
        requiredMass = otherMass * 1.25;
        return requiredMass < botMass
    },

    playerInRange: function(my_ball, playerX, playerY, playerSize, range) {
        var bot = this;
        bot_distance = bot.getDistanceBetweenBallAndPosition(my_ball, playerX, playerY) - bot.getMassPixelRadius(valid_player_pos.size)
        ditance_needed = range //400 - bot.getMassPixelRadius(my_ball.size);
        return bot_distance < ditance_needed;
    },

    in_circle: function(center_x, center_y, radius, x, y){
        //square_dist = (center_x - x) ^ 2 + (center_y - y) ^ 2;
        //return square_dist <= (radius/2) ^ 2;
        dx = x-center_x
        dy = y-center_y
        return dx*dx+dy*dy <= radius*radius
    },

    getCoordinatesOfCircleAngle: function(center_x, center_y, radius, angle){
        x = Math.ceil(center_x + radius * Math.cos(angle));
        y = Math.ceil(center_y + radius * Math.sin(angle));
        return {x,y};
    },

    checkIfPathCrossesBall:function(from_x,from_y, dest_x,dest_y,ball_id){
        bot = this;
        ball = bot.client.balls[ball_id];

        x0 = from_x;
        y0 = from_y;
        x1 = dest_x;
        y1 = dest_y;

        dx = Math.abs(x1-x0);
        dy = Math.abs(y1-y0);
        sx = (x0 < x1) ? 1 : -1;
        sy = (y0 < y1) ? 1 : -1;
        err = dx-dy;

        steps = 0;

        while(true){
            steps++;
            if (steps > 1000){break;}

            if(bot.in_circle(ball.x, ball.y, bot.getMassPixelRadius(ball.mass), x0, y0)){
                return true;
            }

            if (return_id != null) break;
            if ((x0==x1) && (y0==y1)) break;
            e2 = 2*err;
            if (e2 >-dy){ err -= dy; x0  += sx; }
            if (e2 < dx){ err += dx; y0  += sy; }
        }

        return false;
    },

    getNearestBallOnPath:function(from_x,from_y, dest_x,dest_y){
        bot = this;
        my_ball = bot.client.balls[bot.client.my_balls[0]];
        return_id = null;

        for (ball_id in bot.client.balls) {
            ball = bot.client.balls[ball_id];
            if (!ball.virus) {continue;}            

            if(bot.checkIfPathCrossesBall(from_x,from_y, dest_x,dest_y, ball_id)){
                console.log("Path not safe: bot would die!");
                return_id = ball_id;
                break;                    
            }
        }        

        return return_id;
    },

    safeMoveTo: function(x, y){
        bot = this;
        my_ball = bot.client.balls[bot.client.my_balls[0]];

        safeX = x;
        safeY = y;

        nearest_obstacle = bot.getNearestBallOnPath(my_ball.x,my_ball.y,x,y);

        if(nearest_obstacle != null){
            ball = bot.client.balls[nearest_obstacle];
            bestXDistance = 99999999;
            bestX = 0;
            bestY = 0;

            for (var i = 0; i < 360; i=i+36) { 
                pos = bot.getCoordinatesOfCircleAngle(ball.x, ball.y, bot.getMassPixelRadius(ball.mass) + bot.getMassPixelRadius(my_ball.mass) + 250 , i)
                test_path = bot.getNearestBallOnPath(pos.x,pos.y, x,y)

                if(test_path == null){
                    console.log("this path is safe.")

                    distance1 = bot.getDistanceBetweenPositions(pos.x, pos.y, my_ball.x, my_ball.y);
                    distance2 = bot.getDistanceBetweenPositions(pos.x, pos.y, x, y);
                    totalDistance = distance1 + distance2;
                    if(totalDistance < bestXDistance){
                        bestXDistance = totalDistance;
                        safeX = pos.x;
                        safeY = pos.y;
                        console.log("found safe spot!");
                    }
                }else{
                    console.log("pathfinding: this path is not safe.")
                }
            }

            if( bestX == 0 && bestY == 0){
                console.log("pathfinding: impossible.")
                return;
            }else{
                safeX = bestX;
                safeY = bestY;
            }

            console.log("pathfinding done:")
            console.log(safeX)
            console.log(safeY)           
        }



        bot.client.moveTo(safeX, safeY);
    },

    recalculateTarget: function() {
        var bot = this;
        var candidate_ball = null;
        var candidate_distance = 0;
        var my_ball = bot.client.balls[bot.client.my_balls[0]];
        if (!my_ball) return;

        if (valid_player_pos != null && bot.isOnFeedMission == true) {

            if(config.enableSaveMoveTo){
                bot.safeMoveTo(valid_player_pos["x"], valid_player_pos["y"]);
            }else{
                bot.moveTo(valid_player_pos["x"], valid_player_pos["y"]);
            }
            

            if (bot.playerInRange(my_ball, valid_player_pos["x"], valid_player_pos["y"], valid_player_pos.size, 400)) {
                if (bot.canSplitFeedPlayer(my_ball.mass, valid_player_pos.size)) {
                    bot.client.split();
                }
            }

            return
        }

        for (var ball_id in bot.client.balls) {
            var ball = bot.client.balls[ball_id];
            if (ball.virus) {
                if (config.verbosityLevel > 1) {
                    bot.log('virus ( green ball ) has been spotted.');
                }
                continue;
            }
            if (!ball.visible) continue;
            if (ball.mine) continue;
            if (ball.size / my_ball.size > 0.5) continue;
            var distance = bot.getDistanceBetweenBalls(ball, my_ball);
            if (candidate_ball && distance > candidate_distance) continue;

            candidate_ball = ball;
            candidate_distance = bot.getDistanceBetweenBalls(ball, my_ball);
        }

        got_tranporter = false;
        transporter = bot.getAvailableTransporter();
        if (transporter != null) {
            candidate_ball = transporter;
            got_tranporter = true;
        }

        if (valid_player_pos != null && my_ball.mass > config.minimumMassBeforeFeed) {            
            bot.isOnFeedMission = true;
            return;
        }

        if (valid_player_pos != null && bot.playerInRange(my_ball, valid_player_pos["x"], valid_player_pos["y"], valid_player_pos.size, 1000)) {

            if (!got_tranporter ||
                bot.getDistanceBetweenBalls(candidate_ball, my_ball) >
                bot.getDistanceBetweenBallAndPosition(my_ball, valid_player_pos["x"], valid_player_pos["y"])
            ) {
                bot.isOnFeedMission = true;
                return;
            }
        }

        if (candidate_ball == null) {
            console.log("normal move");
            bot.client.moveTo(valid_player_pos["x"], valid_player_pos["y"]);
        } else {
            console.log("normal move");
            bot.client.moveTo(candidate_ball.x, candidate_ball.y);
        }


    }
};

//you can do this in your code to use bot as lib
//module.exports = ExampleBot;

//launching bots below

var contains = function(needle) {
    // Per spec, the way to identify NaN is that it is not equal to itself
    var findNaN = needle !== needle;
    var indexOf;

    if (!findNaN && typeof Array.prototype.indexOf === 'function') {
        indexOf = Array.prototype.indexOf;
    } else {
        indexOf = function(needle) {
            var i = -1,
                index = -1;

            for (i = 0; i < this.length; i++) {
                var item = this[i];

                if ((findNaN && item !== item) || item === needle) {
                    index = i;
                    break;
                }
            }
            return index;
        };
    }

    return indexOf.call(this, needle) > -1;
};

var WebSocket = require('ws');
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

        console.log('Connection to ' + address + ' is successful!');
    }

    ws.onmessage = function(event) {
        var buffer = new Uint8Array(event.data);
        var packet = msgpack.unpack(buffer);
        switch (packet.type) {
            case 128:

                for (var i = 0; i < packet.data.addition.length; ++i) {
                    var cell = packet.data.addition[i];

                    if (contains.call(valid_player_ids, cell.id)) {
                        //console.log(cell);
                        valid_player_pos = cell;
                        return;
                    }
                }
                break;
            case 129:
                players = packet.data;
                //console.log(players); 
                if (players[0]["name"].length != 0) {
                    valid_player_ids = players[0]["ids"];
                }
                break;
        }
    }

    ws.onerror = function() {
        console.error('Connection to Map Server failed.');
    }

    ws.onclose = function() {
        map_server = null;
        console.log('Map server connection lost!');
    }

    map_server = ws;
}

miniMapConnectToServer();



fs = require('fs');
var HttpsProxyAgent = require('https-proxy-agent');

function getRandomLine(filename) {
    var fs = require('fs');
    var lines = fs.readFileSync(filename).toString().split("\n");
    line = lines[Math.floor(Math.random() * lines.length)];
    return line
}



//object of bots
var bots = {
    "1": null,
};

bot_count = 0;

var fs = require('fs');
var lines = fs.readFileSync(config.proxies).toString().split("\n");
var url = require('url');

var auth_token = null;

if (config.useFacebookAuth) {
    var account = new AgarioClient.Account();

    account.c_user = config.account.c_user;
    account.datr = config.account.datr;
    account.xs = config.account.xs;

    account.requestFBToken(function(token, info) {
        auth_token = token;
    });

}

if (config.account.token != "") {
    auth_token = config.account.token;
}

function startFeederBotOnProxies() {
    console.log("Auth_Token: " + auth_token);
    for (proxy_line in lines) {
        
        if (lines[proxy_line][0] == "#" || lines[proxy_line].length < 3) {
            continue;
        }
        if (process.argv[3] != null && proxy_line != process.argv[3]) {
            continue;
        } //usefull for testing single proxies

        proxy = "http://" + lines[proxy_line];
        console.log(proxy);

        try {

            var opts = url.parse(proxy);

            if (proxy != null) {
                agent = HttpsProxyAgent(opts);
            } else {
                var agent = null;
            }

            if (lines[proxy_line] == "NOPROXY") {
                agent = null;
            }


            console.log("Attempting connection to ws://" + config.gameServerIp);
            for (i = 0; i < config.botsPerIp; i++) { 
                if (bot_count !== config.maxBots) {
                    bot_count++;
                    bots[bot_count] = new FeederBot(bot_count, agent, bot_count, 'ws://' + config.gameServerIp);
                }
            }

        } catch (e) {
            console.log('Error occured on startup: ' + e);
        }
    }
}

setTimeout(function() {
    startFeederBotOnProxies();
}, 1000);