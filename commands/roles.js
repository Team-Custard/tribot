module.exports={
  name:"roles",
  category:"utility",
  description:"Shows the roles for this server",
  usage:";;roles",
  fulldescription:"Shows the roles for this server.",
  permissions:"embed links",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      message.channel.send({
        embed:{
          title:`${message.guild.name} roles`,
          description:message.guild.roles.cache.map(r=>`<@&${r.id}>`).join(", "),
          color:"RANDOM"
        }
      }).catch(()=>{})
    });
  }
}