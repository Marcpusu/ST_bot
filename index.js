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
  console.log('I\'m Online');
});

const rpsArray = ["piedra", "papel", "tijeras"];
const prefix = '!';
client.on('message', message => {
  //If autor is this bot, skip
  if (message.author === client.user) return;
  
  //If command starts with prefix enter
  if (message.content.startsWith(prefix)) {
    var str = message.content.slice(1).split(" ");
    //Check the args of the command
    switch (str[0].toLowerCase()){
      case "ping":
        message.channel.send('pong');
        break;
      case "ppt":
        if (str.length > 1 && rpsArray.indexOf(str[1].toLowerCase()) > -1) {
          var iaSelection = rpsArray[Math.floor(Math.random() * rpsArray.length)];
          message.channel.send("ST ha elegido: " + iaSelection);
          //message.channel.send(message.author.username + " ha elegido: " + str[1].trim().toLowerCase());
          message.channel.send(piedraPapelTijeras(message.author.username, str[1], iaSelection));
        }
        else{
          message.channel.send("Las opciones son: " + rpsArray.join());
        }
        break;
    }
  }
});

client.login(process.env.TOKEN);

function piedraPapelTijeras(userName, userSelection, iaSelection) {
  
  if (userSelection === iaSelection){
    return userName + ", habéis empatado!";
  }
    
  switch (userSelection){
    case "piedra":
      if (iaSelection === "tijeras"){
        return userName + " ha aplastado a ST!";
      }
      else if (iaSelection === "papel"){
        return "ST ha humillado a " + userName + "!";
      }
      break;
    case "papel":
      if (iaSelection === "piedra"){
        return userName + " ha empapelado a ST!";
      }
      else if (iaSelection === "tijeras"){
        return userName + " ha sido STemeado!";
      }
      break;
    case "tijeras":
      if (iaSelection === "piedra"){
        return " ST le ha dado una lección a " + userName + "!";
      }
      else if (iaSelection === "papel"){
        return userName + " ha cortado por la mitad a ST!";
      }
      break;
    default:
      return "Las opciones son: " + rpsArray.join();
  }
}