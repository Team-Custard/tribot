module.exports={
  name:"bots",
  category:"utility",
  description:"Shows the bots in this server",
  usage:";;bots",
  fulldescription:"Shows the roles in this server.",
  permissions:"embed links",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      message.channel.send({
        embed:{
          title:`${message.guild.name} bots`,
          description:message.guild.members.cache.filter(r=>r.user.bot).map(r=>`<@${r.id}>`).join(", "),
          color:"RANDOM"
        }
      }).catch(()=>{})
    });
  }
}