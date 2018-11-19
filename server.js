const Discord = require('discord.js');
const client = new Discord.Client();
const bot = new Discord.Client();
const config = require('./config.json');

const size    = config.colors;
const rainbow = new Array(size);


bot.on("ready", () => {
    console.log(' -> Bot ready with ' + bot.users.size + ' users online!');
    bot.user.setActivity('Making a party for: ' + bot.users.size + ' players');
});


bot.on("guildCreate", guild => {
  console.log(`New guild joined: ${guild.name} (id: ${guild.id}). This guild has ${guild.memberCount} members!`);
  bot.user.setActivity('Making a party for: ' + bot.users.size + ' players');
});

bot.on("guildDelete", guild => {
  console.log(`I have been removed from: ${guild.name} (id: ${guild.id})`);
  bot.user.setActivity('Making a party for: ' + bot.users.size + ' players');
});

for (var i=0; i<size; i++) {
  var red   = sin_to_hex(i, 0 * Math.PI * 2/3); // 0   deg
  var blue  = sin_to_hex(i, 1 * Math.PI * 2/3); // 120 deg
  var green = sin_to_hex(i, 2 * Math.PI * 2/3); // 240 deg

  rainbow[i] = '#'+ red + green + blue;
}

function sin_to_hex(i, phase) {
  var sin = Math.sin(Math.PI / size * 2 * i + phase);
  var int = Math.floor(sin * 127) + 128;
  var hex = int.toString(16);

  return hex.length === 1 ? '0'+hex : hex;
}

let place = 0;
const servers = config.servers;

function changeColor() {
  for (let index = 0; index < servers.length; ++index) {		
   var rolename = Math.floor(Math.random() * 5);
    console.log(rolename)
    
    if(rolename == '1'){
    client.guilds.get(servers[index]).roles.find('name', config.roleName1).setColor(rainbow[place]);
    }
    
      if(rolename == '2'){
    client.guilds.get(servers[index]).roles.find('name', config.roleName2).setColor(rainbow[place]);
        console.log("2")
    }
          if(rolename == '4'){
    client.guilds.get(servers[index]).roles.find('name', config.roleName4).setColor(rainbow[place]);
        console.log("4")
    }
          if(rolename == '3'){
    client.guilds.get(servers[index]).roles.find('name', config.roleName3).setColor(rainbow[place]);
        console.log("3")
    }
              if(rolename == '0'){
    client.guilds.get(servers[index]).roles.find('name', config.roleName0).setColor(rainbow[place]);
        console.log("0")
    }
    else{
    console.log("Nope")
    }
    
		
    if(config.logging){
      console.log(`[ColorChanger] Changed color to ${rainbow[place]} in server: ${servers[index]}`);
    }
    if(place == (size - 1)){
      place = 0;
    }else{
      place++;
    }
  }
}

client.on('ready', () => {
  console.log(`Logged in as ${client.user.username}!`);
  if(config.speed < 6000){console.log("The minimum speed is 60.000, if this gets abused your bot might get IP-banned"); process.exit(1);}
  setInterval(changeColor, config.speed);
});



bot.on("message", async message => {
    if(message.channel.type === "dm") return  message.channel.send({embed: {
          color: 0xff0000,
          description: "Could you please stop sending direct messages SIR?:japanese_goblin:",
          title: "Please stop"
    }});

})
client.login(process.env.SECRET);


// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('views'));

// listen for requests :)
var listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
  