module.exports={
  name:"mutedusers",
  category:"utility",
  description:"Shows the users currently muted in this server",
  usage:";;mutedusers",
  fulldescription:"Shows the users currently muted in this server.",
  permissions:"embed links",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      message.channel.send({
        embed:{
          title:`Muted users in ${message.guild.name}`,
          description:message.guild.members.cache.filter(m=>m.roles.cache.find(r=>r.name==="Muted"||r.name==="muted")).map(r=>`<@${r.id}>`).join(", ")||"Nobody is muted right now",
          color:"RANDOM"
        }
      }).catch(()=>{})
    });
  }
}