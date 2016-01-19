// IGNORE THESE
var config = {};
config.account = {};
// END OF IGNORE

// To remove lot's of output
config.verbose = true; 

// Useragent the bot will use
config.userAgent = 'agario-feeder-bot';

// Mini-map server to connect to
config.mapserver = "ws://127.0.0.1:34343";

// Location of your proxy files with HTTP proxies (Sock proxies not supported yet!)
config.proxies = "proxy.txt";

// Set to true to use random name
config.useRandomSkinName = true;
// If above is false, us this skin name
config.useStaticName = "austria";

// Set this to the server IP (Agar or Ogar server IP).
config.gameServerIp = "127.0.0.1:443"

// Edit this value so bots collect mass before coming towards the player
config.minimumMassBeforeFeed = 0;

// Facebook authentication
config.useFacebookAuth = false;
config.account.token = ""; // Auth token which is only valid for 2 hours - better use cookies

// You can also generate your own token through Facebook Data. (This will get overwritten if you use account.token)
config.account.c_user = ""; // Cookie from "c_user" at http://facebook.com
config.account.datr = "";// Cookie from "datr" at http://facebook.com
config.account.xs = ""; // Cookie from "xs" at http://facebook.com

// IGNORE THIS
module.exports = config;
// END OF IGNORE
