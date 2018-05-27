const config = require("./config.json");
const adminIds = require("./adminIds.json")
const Eris = require("Eris");
const request = require('request-promise');
var bot = new Eris(config.token);

bot.on("ready", () =>{
    console.log("Walrus readied");   
});

bot.on("messageCreate", (msg) =>{
    if(!msg.content.startsWith(config.prefix)) return;
    let cid = msg.channel.id;
    if(msg.author.bot === true) return bot.createMessage(cid, "No bots");
    let command = msg.content.split(" ")[0];
    let args = msg.content.split(" ").slice(1);
    if(command === `${config.prefix}e`){
        bot.createMessage(cid, "Eeee")
    }else if(command === `${config.prefix}shorten`){
        if(args[0]){
            const options = {
                method: 'POST',
                uri: 'https://sedwalrus.cf/shorten',
                body: args[0],
                headers: {
                    "Content-Type": "text/plain"
                },
                json: false 
              }      
            
              request(options)
                .then(function (response) {
                  bot.createMessage(cid, response);
                })
                .catch(function (err) {
                  bot.createMessage(cid, `Error: ${err}`);
                })
        }else bot.createMessage(cid, "Missing an arg")
    }else if(command === `${config.prefix}admin`){
        let adminDiscords = adminIds["array"];
        let param2 = "";
        if(adminDiscords.includes(msg.author.id)){
            for(i = 2; i < args.length; i++){
                param2 += `${args[i]} `
            }
            const options = {
                method: 'POST',
                uri: 'http://sedwalrus.cf/admin/' + args[0],
                body: JSON.stringify({
                    key: adminIds["adminKey"],
                    param1: args[1],
                    param2: param2
                }),
                headers: {
                    "Content-Type": "application/json"
                },
                json: false 
              }      
            
              request(options)
                .then(function (response) {
                  bot.createMessage(cid, response);
                })
                .catch(function (err) {
                  bot.createMessage(cid, `Error: ${err}`);
                })
        }else bot.createMessage(cid, "Get some perms")
    }else if(command === `${config.prefix}botinvite`){
        bot.createMessage(cid, config.invitelink);
    }
});

bot.connect();