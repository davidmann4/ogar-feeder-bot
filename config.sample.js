var config = {};

config.mapserver = "ws://127.0.0.1:34343";
config.proxies = "/var/data/socks.txt";
config.forceConnectToIp = true;
config.forceIp = "127.0.0.1:443"
config.forceKey = "";

module.exports = config;
