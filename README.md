
Ogar Feeder Bot
======
**Ogar Feeder Bot** is a server-based Ogar minions that feed you

[Skype group] (https://join.skype.com/eQuN52iQVzZg)

[FAQ] (https://github.com/davidmann4/agario-feeder-bot/issues?q=label%3Aquestion)

[Tutorial video] (https://www.youtube.com/watch?v=FVNNo93ZVGg)

If you use this bot make sure to star the repo!


#How to Install:

**Windows**
----------------------

* **1.** Download NodeJs ([32 bit]) (https://nodejs.org/dist/v5.6.0/node-v5.6.0-x86.msi)  -----  ([64 bit]) (https://nodejs.org/dist/v5.6.0/node-v5.6.0-x64.msi)
* **2.** Download this repo by pressing Download ZIP
* **3.** Extract to any folder... ex. C:\Ogar-Bots
* **4.** Open Install Dependencies (Windows).bat and follow the instructions
* **5.** Install this extension: ([Chrome] (https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo), [Firefox] (https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/))
* **6.** Install the file "agario-feeder-bot.user.js" in Chrome/Firefox with the extension that you installed in step 5
* **7.** Copy config.sample.js to config.js:
  * Now in config.js, you must assign the UUID to the one that the userscript generated for you
* **8.** Copy proxy.sample.txt to proxy.txt and paste you proxies under correct section... (Update them everyday... you can get them [here](http://vip-socks24.blogspot.com/?m=1) for free)
  * You need to use proxies to connect multiple bots, the usual max limit for one IP is 3 clients/bots
* **9.** Open "Start (Windows).bat"
* **10.** Launch Chrome/Firefox and go to Agar.io to start using your bots. Enjoy :)
* If you don't understand these "simple" instructions use Google, if you still don't get it, open an issue...

----------------------


**Other OS**
----------------------

Install [NodeJs] (https://nodejs.org/en/download/package-manager/) and [Git] (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

* **1.** git clone this repo
* **2.** cd to the repo e.g. (cd agario-feeder-bot/)
* **3.** Install this extension: ([Chrome] (https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo), [Firefox] (https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/))
* **4.** Install the file "agario-feeder-bot.user.js" in Chrome/Firefox with the extension that you installed in step 3
* **5.** Copy config.sample.js to config.js:
  * Now in config.js, you must assign the UUID to the one that the userscript generated for you
* **6.** Copy proxy.sample.txt to proxy.txt and paste you proxies under correct section... (Update them everyday... you can get them [here](http://vip-socks24.blogspot.com/?m=1) for free)
  * You need to use proxies to connect multiple bots, the usual max limit for one IP is 3 clients/bots

* **7.** Run these commands in console:

```
npm install
npm install socket.io-client
node server/server
node feeder
```
----------------------
* If you don't understand these "simple" instructions use Google, if you still don't get it, open an issue...




### Want to help out?

* Checkout issues for tasks
* Write better readme.md
* Tell other people about this repo (marketing)
* Get more developers to contribute code
* Share this repo
* Favourite this repo


**Disclaimer:**
Botting is against the TOS - so please only use it on your own Ogar server: https://github.com/OgarProject/Ogar
These "BOTS" are only for educational purposes... :)
