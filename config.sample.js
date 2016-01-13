var config = {};

config.userAgent = 'agario-feeder-bot';
config.mapserver = "ws://127.0.0.1:34343";
config.proxies = "proxy.txt";

//set useRandomSkinName to false to always use the staticName
config.useRandomSkinName = true;
config.useStaticName = "austria";

config.forceConnectToIp = false;
config.forceIp = "127.0.0.1:443"
config.forceKey = "";

module.exports = config;
