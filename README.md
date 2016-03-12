<p align="center">
<img src="images/bot.png" alt="Bot" width="20%"/>
</p>
Ogar Feeder Bots
======



**Ogar Feeder Bots** are server-based Ogar minions that feed you

[Skype group] (https://join.skype.com/eQuN52iQVzZg)

[FAQ] (https://github.com/davidmann4/agario-feeder-bot/issues?q=label%3Aquestion)

[Tutorial video] (https://www.youtube.com/watch?v=FVNNo93ZVGg)    (**Updated!**)

If you use this bot make sure to star the repo!




#How to Install:

**Windows**     <img src="images/windows.png" alt="Windows" width="5%";"/>
----------------------

**Alternative 1** (Public Server):

* **1.** Install NodeJs [(32 bit)] (https://nodejs.org/dist/v5.6.0/node-v5.6.0-x86.msi)  [(64 bit)] (https://nodejs.org/dist/v5.6.0/node-v5.6.0-x64.msi)
* **2.** Download this repo [Download ZIP] (https://github.com/hassanila97/ogar-feeder-bot/archive/master.zip)
* **3.** Extract to any folder... ex. C:\Ogar-Bots
* **4.** Open Install Dependencies (Windows).bat and follow the instructions
* **5.** Install this extension: ([Chrome] (https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo), [Firefox] (https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/))
* **6.** Install [**this**] (https://github.com/hassanila97/ogar-feeder-bot/raw/master/ogar-feeder-bot.user.js) userscript in Chrome/Firefox
* **7.** Copy config.sample.js to config.js:
  * Now go to Agar.io and you will see your UUID, copy it then paste it in config.js
* **8.** Copy proxy.sample.txt to proxy.txt and paste you proxies under correct section... (Update them everyday... you can get them on Google for free)
  * You need to use proxies to connect multiple bots, the usual max limit for one IP is **3** clients/bots
* **9.** Open "Start Bots (Windows).bat"
* **10.** Launch Chrome/Firefox and go to Agar.io to start using your bots. Enjoy :)

If you don't understand these "simple" instructions use the [Skype group] (https://join.skype.com/eQuN52iQVzZg), if you still don't get it, open an issue...

-------------

**Alternative 2** (Own Server):

* **1.** Install NodeJs [(32 bit)] (https://nodejs.org/dist/v5.6.0/node-v5.6.0-x86.msi)  [(64 bit)] (https://nodejs.org/dist/v5.6.0/node-v5.6.0-x64.msi)
* **2.** Download this repo [Download ZIP] (https://github.com/hassanila97/ogar-feeder-bot/archive/master.zip)
* **3.** Extract to any folder... ex. C:\Ogar-Bots
* **4.** Open Install Dependencies (Windows).bat and follow the instructions
* **5.** Install this extension: ([Chrome] (https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo), [Firefox] (https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/)) ![Tampermonkey](images/tampermonkey.png?raw=true "Tampermonkey")
* **6.** Install [**this**] (https://github.com/hassanila97/ogar-feeder-bot/raw/master/ogar-feeder-bot-local.user.js) userscript in Chrome/Firefox
* **7.** Copy config.sample.js to config.js:
  * Open config.js with a text editor
  * Edit server ip to **127.0.0.1:8081** (if you use same server to play) or you server ip with port 8081
  * Now go to Agar.io and you will see your UUID, copy it then replace "YOUR_UUID" in config.js
* **8.** Copy proxy.sample.txt to proxy.txt and paste you proxies under correct section... (Update them frequently... you can get them on Google for free)
  * You need to use proxies to connect multiple bots, the usual max limit for one IP is **3** clients/bots
* **9.** Open "Start Server (Windows).bat"
* **10.** Open "Start Bots (Windows).bat"
* **11.** Launch Chrome/Firefox and go to Agar.io to start using your bots. Enjoy :)

If you don't understand these "simple" instructions then use the [Skype group] (https://join.skype.com/eQuN52iQVzZg), if you still don't get it, open an issue...




**Other OS**       <img src="images/linux.png" alt="Linux" width="5%";"/> <img src="images/mac.png" alt="Mac" width="5%";"/>
----------------------

Install [NodeJs] (https://nodejs.org/en/download/package-manager/) and [Git] (https://git-scm.com/book/en/v2/Getting-Started-Installing-Git)

* **1.** git clone this repo
* **2.** cd to the repo e.g. (cd agario-feeder-bot/)
* **3.** Install this extension: ([Chrome] (https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo), [Firefox] (https://addons.mozilla.org/en-US/firefox/addon/greasemonkey/))
* **4.** Install the file "agario-feeder-bot.user.js" in Chrome/Firefox with the extension that you installed in step 3
* **5.** Copy config.sample.js to config.js:
  * Now in config.js, you must assign the UUID to the one that the userscript generated for you
* **6.** Copy proxy.sample.txt to proxy.txt and paste you proxies under correct section... (Update them frequently... you can get them on Google for free)
  * You need to use proxies to connect multiple bots, the usual max limit for one IP is 3 clients/bots

* **7.** Run these commands in console:

```
npm install
node server
node feeder
```
----------------------


If you don't understand these "simple" instructions then use the [**Skype group**] (https://join.skype.com/eQuN52iQVzZg), if you still don't get it, open an issue...





**Screenshots**
-------------

![Screenshot-1](images/Screenshot1.png "Screenshot")
![Screenshot-2](images/Screenshot2.png "Screenshot")
![Screenshot-3](images/Screenshot3.png "Screenshot")



###Want to help out?

* Checkout issues for tasks
* Tell other people about this repo (marketing)
* Get more devs to contribute for better code
* Share this repo
* Star this repo




###Known Bugs

* Bots follow mouse only when in range...
* ...
* ...




###Disclaimer:
Botting is against the [**TOS**] (https://agar.io/terms.txt) - please only use it on your own [Ogar] (https://github.com/OgarProject/Ogar) server.
[![forthebadge](http://forthebadge.com/images/badges/built-with-love.svg)](http://forthebadge.com)
