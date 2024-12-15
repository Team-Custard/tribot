module.exports={
  name:"info",
  category:"general",
  description:"Gets the bot info",
  usage:";;info",
  fulldescription:"Gets TriBot's bot info",
  permissions:"embed links",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      message.channel.send({
				embed:{
					title:"TriBot's stats",
					fields:[
						{name:"Discord:",value:`>> Cached guilds : ${client.guilds.cache.size} guilds\n>> Cached users: ${client.users.cache.size} users\n>> Api ping : ${Math.round(Math.random()*client.ws.ping)}ms\n>> Library used: discord.js\n>> Library version: ${require('../package.json').dependencies["discord.js"]}`},
						{name:"System info:",value:`>> System: ${process.platform}\n>> Node version: ${process.version}\n>> `}
					]
				}
			})
    });
  }
}