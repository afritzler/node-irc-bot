node-bot
========

An IRC Bot in Node.js

Usage
-----

Install the necessary node modules via:

```bash
npm install
``` 

To run the IRC bot you need to execute the following command:

```bash
node bot.js BOTNAME IRCSERVER "COMMA_SEPERATED_CHANNELLIST" PATH_TO_DATAFILE
```

In order to get a joke from the bot you need to type the following in one of the
channels:

```
BOTNAME, tell me a joke
```

The result will be a random quote from the ```DATAFILE``` you provided.

License and Authors
-------------------
Authors: Andreas Fritzler

Released under the [Apache License](/LICENSE)
