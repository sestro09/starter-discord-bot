const Discord = require("discord.js")    
const client = new Discord.Client();      
const config = require("./config.js") 
const a = require("./config.js") 
const fs = require("fs");
const db = require("croxydb");                
require('./util/Loader.js')(client);    
const express = require('express')
const app = express();
const port = 3000

app.get('/', (req, res) => res.send('Odd is better.'))

app.listen(port, () =>
console.log(`Your app is listening a http://localhost:${port}`)
);
client.commands = new Discord.Collection();
client.aliases = new Discord.Collection();  
fs.readdir('./commands/', (err, files) => { 
  if (err) console.error(err);               
  console.log(`${files.length} command will load...`); 
  files.forEach(f => {                    
    let props = require(`./commands/${f}`);
    console.log(`${props.config.name} command loaded!!`); 
    client.commands.set(props.config.name, props);
    props.config.aliases.forEach(alias => {       
      client.aliases.set(alias, props.config.name);
    });
  });
})

client.login(process.env.TOKEN);

