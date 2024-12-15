module.exports={
  name:"messagelog",
  category:"config",
  description:"Sets a channel for message events",
  usage:";;messagelog [#channel]",
  fulldescription:"Sets the channel for where message events are logged, example: message edited, deleted",
  permissions:"embed links",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send({
          embed:{
            description:`🚫 ${message.author.tag}, you are missing the \`manage server\` permission to use this command`,
            color:"RED"
          }
        }).catch(()=>{})
        if (args[0]==="none"){
          client.db.delete(`${message.guild.id}messagelog`)
          return message.channel.send({
              embed:{
                description:`✅ ${message.author.tag}, the messagelog setting was deleted`,
                color:"GREEN"
              }
            }).catch(()=>{})
        }
      var channel = message.mentions.channels.first()||message.channel
      client.db.set(`${message.guild.id}messagelog`,channel.id)
      return message.channel.send({
          embed:{
            description:`✅ ${message.author.tag}, set the message log channel to ${channel}`,
            color:"GREEN"
          }
        }).catch(()=>{})
    });
  }
}