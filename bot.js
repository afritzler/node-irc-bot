var irc = require("irc");
var fs = require('fs');

// Create the configuration
var config = {
  //channels: ["#cloudfoundry", "#cfstemcell"],
  channels: [""],
  server: "",
  botName: "dummy_",
  datafile: "data/chucknorris.txt"
};

// Le jokes array
var jokes = [];

// Read command line parameters
if (process.argv.length < 6) {
  console.log('Usage:\n node bot.js BOTNAME SERVER "CHANNELLIST" JOKES_FILE\n');
  process.exit();
} else {
  config.botName = process.argv[2];
  config.server = process.argv[3];
  config.channels = process.argv[4].split(',');
  config.datafile = process.argv[5];

  // Read input data
  jokes = readLines(config.datafile);
  // remove last element if it is empty
  if (jokes[jokes.length] == null)
     jokes.pop();

  console.log("Found " + jokes.length + " jokes in " + config.datafile);
}

// Create the bot name
var bot = new irc.Client(config.server, config.botName, {
	channels: config.channels
});

// Listen for any message, say to him/her in the room
bot.addListener("message", function(from, to, text, message) {
  if (text.indexOf(config.botName) > -1 && text.indexOf("tell me a joke") > -1) {
    console.log(from + " wants to hear a joke in channel " + to + "...");
    config.channels.forEach(function(c){
        if (c == to) {
          bot.say(c, jokes[Math.floor(Math.random()*jokes.length)]);
        }
    });
  }
});

function readLines(filepath) {
  return fs.readFileSync(filepath, 'utf8').split('\n');
}

console.log("Starting " + config.botName + "@" + config.server + " in channels: " + config.channels)
