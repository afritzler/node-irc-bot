/*
# Copyright 2014, Andreas Fritzler
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.
*/

var irc = require("irc");
var fs = require('fs');

// magic words
var magic_words = "tell me a joke";

// Configuration object
var config = {
  channels: [""],
  server: "",
  botName: "dummy_",
  datafile: "data/chucknorris.txt"
};

// Le jokes array
var jokes = [];

// Read command line parameters
if (process.argv.length < 6) {
  // Error if not enough
  console.log('Usage:\n node bot.js BOTNAME SERVER "CHANNELLIST" JOKES_FILE\n');
  process.exit();
} else {
  // Set configuration values
  config.botName = process.argv[2];
  config.server = process.argv[3];
  config.channels = process.argv[4].split(',');
  config.datafile = process.argv[5];

  // Read input data
  jokes = readLines(config.datafile);
  // remove last element if it is empty
  if (jokes[jokes.length] == null)
     jokes.pop();

  // Prompt what we found
  console.log("Found " + jokes.length + " jokes in " + config.datafile);
}

// Create the bot name
var bot = new irc.Client(config.server, config.botName, {
	channels: config.channels
});

// Listen for any message
bot.addListener("message", function(from, to, text, message) {
  // Botname and the magic words must appear in the message
  if (text.indexOf(config.botName) > -1 && text.indexOf(magic_words) > -1) {
    console.log(from + " wants to hear a joke in channel " + to + "...");
    config.channels.forEach(function(c){
        // Make sure we post into the correct channel
        if (c == to) {
          bot.say(c, jokes[Math.floor(Math.random()*jokes.length)]);
        }
    });
  }
});

// Helper function to read the data file
function readLines(filepath) {
  return fs.readFileSync(filepath, 'utf8').split('\n');
}

console.log("Starting " + config.botName + "@" + config.server + " in channels: " + config.channels)
