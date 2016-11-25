var names = {};

names.nameList = [
    "poland",
    "usa",
    "china",
    "russia",
    "canada",
    "australia",
    "spain",
    "brazil",
    "germany",
    "ukraine",
    "france",
    "sweden",
    "north korea",
    "south korea",
    "japan",
    "united kingdom",
    "earth",
    "greece",
    "latvia",
    "lithuania",
    "estonia",
    "finland",
    "norway",
    "cia",
    "maldivas",
    "austria",
    "nigeria",
    "reddit",
    "yaranaika",
    "confederate",
    "9gag",
    "indiana",
    "4chan",
    "italy",
    "ussr",
    "pewdiepie",
    "bulgaria",
    "tumblr",
    "2ch.hk",
    "hong kong",
    "portugal",
    "jamaica",
    "german empire",
    "mexico",
    "sanik",
    "switzerland",
    "croatia",
    "chile",
    "indonesia",
    "bangladesh",
    "thailand",
    "iran",
    "iraq",
    "peru",
    "moon",
    "botswana",
    "bosnia",
    "netherlands",
    "european union",
    "taiwan",
    "pakistan",
    "hungary",
    "satanist",
    "qing dynasty",
    "matriarchy",
    "patriarchy",
    "feminism",
    "ireland",
    "texas",
    "facepunch",
    "prodota",
    "cambodia",
    "steam",
    "piccolo",
    "ea",
    "india",
    "kc",
    "denmark",
    "quebec",
    "ayy lmao",
    "sealand",
    "bait",
    "tsarist russia",
    "origin",
    "vinesauce",
    "stalin",
    "belgium",
    "luxembourg",
    "stussy",
    "prussia",
    "8ch",
    "argentina",
    "scotland",
    "sir",
    "romania",
    "israel"
];

names.getRandomName = function() {
    return names.nameList[Math.floor((Math.random() * names.nameList.length))];
};

module.exports = names;
