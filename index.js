const http = require('http');
const express = require('express');
const app = express();
app.get("/", (request, response) => {
  console.log(Date.now() + " Ping Received");
  response.sendStatus(200);
});

app.listen(process.env.PORT);
setInterval(() => {
  http.get(`http://${process.env.PROJECT_DOMAIN}.glitch.me/`);
}, 280000);

const Discord = require('discord.js');
const client = new Discord.Client();

client.on('ready',() => {
  console.log('I\'m Online\nI\'m Online');
});

const prefix = '!';
client.on('message', message => {
  //If autor is this bot, skip
  if (message.author === client.user) return;
  
  //If command starts with prefix enter
  if (message.content.startsWith(prefix)) {
    var str = message.content.substring(0,1).split(" ");
    
    //Check the args of the command
    switch (str[0].toLowerCase()){
      case "ping":
        message.channel.send('pong');
        break;
      case "ppt":
        message.channel.send(piedraPapelTijeras(message.author.username, str[1].trim().toLowerCase()));
        break;
    }
  }
});

function piedraPapelTijeras(userName, userSelection) {
  const rpsArray = ["piedra", "papel", "tijeras"];
  var iaSelection = rpsArray[Math.floor(Math.random() * rpsArray.length)];
  var res;
  
  if (userSelection = iaSelection){
    res = userName + ", habéis empatado!";
  }
    
  switch (userSelection){
    case "piedra":
      if (iaSelection = "tijeras"){
        res = userName + " ha aplastado a ST!";
      }
      else if (iaSelection = "papel"){
        res = "ST ha humillado a " + userName + "!";
      }
      break;
    case "papel":
      if (iaSelection = "piedra"){
        res = userName + " ha empapelado a ST!";
      }
      else if (iaSelection = "tijeras"){
        res = userName + " ha sido STemeado!";
      }
      break;
    case "tijeras":
      if (iaSelection = "piedra"){
        res = " ST le ha dado una lección a " + userName + "!";
      }
      else if (iaSelection = "papel"){
        res = userName + " ha cortado por la mitad a ST!";
      }
      break;
    default:
      res = "Las opciones son: " + rpsArray.join();
  }
  
  return res;
}

client.login(process.env.TOKEN);