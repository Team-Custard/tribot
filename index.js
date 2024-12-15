require("dotenv").config();
const fs = require("fs")
const Discord = require("discord-js-command-client");
const { QuickDB } = require("quick.db");


const client = new Discord.CommandClient(";;");
client.db = new QuickDB({ filePath: './db.sqlite' });
//client.on('debug',console.log) 

console.log("Loading events:")
const eventFiles = fs.readdirSync(__dirname+'/events').filter(file => file.endsWith('.js'));

for (const file of eventFiles) {
	const event = require(__dirname+`/events/${file}`);
  try{
    event.initiate(client);
  }catch(err){
    console.warn(`[WARN] The event "${event.name}" failed to load. Error: ${err}`)
  }finally{
    console.log(`[EVENT] Event "${event.name}" has loaded successfully`)
  }
  
  
}

console.log("Loading commands:")

const commandFiles = fs.readdirSync(__dirname+'/commands').filter(file => file.endsWith('.js'));

for (const file of commandFiles) {
  var success = true
	const command = require(__dirname+`/commands/${file}`);
  try{
    command.load(client);
  }catch(err){
    console.warn(`[WARN] The command "${command.name}" failed to load. Error: ${err}`)
    success = false
  }finally{
    if (success===true){
      console.log(`[COMMAND] command "${command.name}" has loaded successfully`);
    }
  }
	
}



//require("./server").start()
client.login(process.env.token)