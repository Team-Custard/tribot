module.exports={
  name:"ping",
  category:"basic",
  description:"Checks Discord api ping",
  usage:";;ping",
  fulldescription:"Gets the latency of Discord's api. This ping applies to all bots connected to the api",
  permissions:"embed links",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      message.channel.send({
        embed:{
          description:`:ping_pong: **Pong**: api ping is **${Math.round(client.ws.ping)}**ms`,
          color:"RANDOM"
        }
      }).catch(()=>{})
    });
  }
}