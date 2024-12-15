
module.exports={
  name:"invite",
  category:"utility",
  description:"Makes an invite link for a bot",
  usage:";;invite [clientid] [permission]",
  fulldescription:"Makes a bot invite link with a client id that you specify. Defaults to this bot's invite link if none is specified",
  permissions:"embed links",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      message.channel.send({
        embed:{
        description:`Generated invite link with id ${args[0]||client.user.id} and permission ${args[1]||"0"}: [\`[Click here]\`](https://discord.com/oauth2/authorize?client_id=${args[0]||client.user.id}&permissions=${args[1]||"0"}&scope=bot)`,
        color:"RANDOM"
        }
      })
    });
  }
}