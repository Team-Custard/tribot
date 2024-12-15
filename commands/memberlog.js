module.exports={
  name:"memberlog",
  category:"config",
  description:"Sets a channel for recieving events when members joins",
  usage:";;memberlog [#channel]",
  fulldescription:"Sets the channel for where member join events are logged",
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
          client.db.delete(`${message.guild.id}memberlog`)
          return message.channel.send({
              embed:{
                description:`✅ ${message.author.tag}, the memberlog setting was deleted`,
                color:"GREEN"
              }
            }).catch(()=>{})
        }
      var channel = message.mentions.channels.first()||message.channel
      client.db.set(`${message.guild.id}memberlog`,channel.id)
      return message.channel.send({
          embed:{
            description:`✅ ${message.author.tag}, set the member log channel to ${channel}`,
            color:"GREEN"
          }
        }).catch(()=>{})
    });
  }
}