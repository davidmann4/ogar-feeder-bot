var config = {};

// if you see to much output on your console turn this to false
config.verbose = true; 

config.userAgent = 'agario-feeder-bot';
config.mapserver = "ws://127.0.0.1:34343";

//location of your proxy files with HTTP proxies (socks proxies do not work yet!)
config.proxies = "proxy.txt";

//set useRandomSkinName to false to always use the staticName
config.useRandomSkinName = true;
config.useStaticName = "austria";

// set this ip to your Ogar Server ip - make sure to disable Scamble
config.gameServerIp = "127.0.0.1:443"

//if you want that the bot collects mass before it moves to your position adjust this value
config.minimumMassBeforeFeed = 0;

module.exports = config;
