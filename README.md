# Agario-Feeder-Bot

## What does it do?
This project is a server sided script that runs multiple bots on one connection to go to a location. Information is sent from the user to the server telling it where the player is, server spawns multiple bots under proxies and itself having them go towards the player. Has many more options such as gathering mass before coming, Facebook login to use skins and mass, with much more features to come! This isn't recommended to use on Agar.io, but on your own Ogar server if you want to have a bit of fun with your server.

## How to install and use
1. Visit https://github.com/dimotsai/agar-mini-map and install the userscript onto your favorite browser using TamperMonkey.
2. Visit https://github.com/dimotsai/agar-mini-map/tree/master/server and install it onto the server you wish the bots to be run on, run the mini-map server.
3. Visit https://github.com/pulviscriptor/agario-client and install it onto the server that the Agar-Mini-Map Server is on. (Main server)
4. Now download the files in this project and put them up on the main server.
5. Rename the config.sample.js to config.js and open it to edit the main options.
6. Rename the proxy.sample.txt to proxy.txt and open it to add your HTTP proxies into it, each line is 5 connections. (NOPROXY to connect 5 bots with the server IP)
7. Go onto Agar.io and confirm that the connection between the mini-map server and the client are successful.

### How to connect to Ogar
1. Open up the config.js, edit the *config.gameServerIp* to your Ogar Server IP.
2. That's it, now through the terminal or CMD launch the script using: node feeder.js

### How to connect to Agar.io
1. Visit Agar.io, generate a new Party.
2. Open the JavaScript console (Using F12 or through the menu) and find: Connecting to ws://xxx.xxx.xxx.xx:xxxx
3. Copy the IP address, open up config.js and paste in that IP into *config.gameServerIp*.
4. That's it, now through the terminal or CMD launch the script using: node feeder.js

## To-do list
- [x] Allow Facebook login for the bots
- [ ] Rebuild the main server and the client without using Agar-Mini-Map
- [ ] Attempt a reconnection if first connections fails
- [ ] Accept SOCK Proxies as well
- [ ] Allow bots to follow the mouse
- [ ] Allow bots to split and feed on a key press
- [ ] Make bots avoid other players

## Stay in touch?
Join the Skype group to message other people and to talk to other developers for resolving issues! Join by clicking: https://join.skype.com/eQuN52iQVzZg

## Disclaimer and license
This project is under the The MIT License (MIT). This means you may take the code and change it or share it as much as you want. Do note that botting is against the Terms of Service of Agar.io - this script is intended to be used on your private Ogar server.
