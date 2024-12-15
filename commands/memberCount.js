module.exports={
  name:"membercount",
  category:"utility",
  description:"Shows the count of members in the server",
  usage:";;membercount",
  fulldescription:"Shows the count of members in the server.",
  permissions:"embed links",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      message.guild.members.fetch()
      .then(members=>{
      var fullmembercount = message.guild.memberCount;
      var botcount = members.filter(m=>m.user.bot).map(m=>m.user.id).length;
      var membercount = members.filter(m=>!m.user.bot).map(m=>m.user.id).length;
      message.channel.send({
        embed:{
          title:`${message.guild.name} membercount`,
          description:`Current membercount for this server\n**Total:** ${fullmembercount} members,\n**Bots:** ${botcount} bots,\n**Humans:** ${membercount} members`,
          color:"RANDOM",
          thumbnail:{url:message.guild.iconURL({dynamic:true})},
          timestamp:new Date()
        }
      }).catch(()=>{})
      })
    });
  }
}