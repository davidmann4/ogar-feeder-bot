// IGNORE THESE
var config = {};
config.account = {};
// END OF IGNORE

// 0 = Shows small amount of logs | 1 = Shows default logs | 2 = Shows most logs
config.verbosityLevel = 0;

// Useragent the bot will use
config.userAgent = 'ogar-feeder-bot';

// the feederServer connects your node script with your browser (mouse coordinates & commands)
// you can use the public server or run your own node server/server.js
// if you are new just use the free public server ws://104.236.100.252:8081
config.feederServer = "ws://104.236.100.252:8081";

config.serverPort = 8081; // optional: setting only used if you run your own feederServer - it will run on this port
config.client_uuid = "YOUR CLIENT UUID"; // after you install the userscript press F12 and search for a debug msg on the console

// Location of your proxy files with HTTP proxies (Sock proxies not supported yet!)
config.proxies = "proxy.txt";
config.botsPerIp = 1;
config.onboardingTimer = 1;

// Ogar-feeder-bot Local Variables
config.maxBots = 100; // Maximum Bots
config.botsCountdown = 10000; // Time to expire bots
config.botsClientName = "ogar-feeder-bot"; // Bots Console Name
config.useDynamicName = true; // Like This: BotsStaticName-BotsNumber
config.useStaticName = "ogar-feeder-bot"; // BotsStaticName

// PcWars Bots Movement Settings
config.smartBots = true; // Use Smart Bots
config.smartBotsLevel = 0; // 0 = Smart / 1 = Smartness (1 will consume more RAM/CPU)
config.neededMassToFeed = 0; // Collect Mass Value

// The bot can have different AI modes:
// * default 	Bot will follow your mouse and listen to SPlit and eject commands
// * blind		Bot will just know your ball id and will try to find you and run into you
config.botMode = "default";

// IGNORE THIS
config.enableSaveMoveTo = false;
config.minimumMassBeforeFeed = 0;
// END OF IGNORE

// IGNORE THIS
module.exports = config;
// END OF IGNORE
