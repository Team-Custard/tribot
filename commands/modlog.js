module.exports={
  name:"modlog",
  category:"config",
  description:"Sets the modlog channel",
  usage:";;modlog",
  fulldescription:"Sets the channel for send logs of moderationary actions",
  permissions:"**bot**\nembed links, view audit log\n**you**\nmanage server",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send({
          embed:{
            description:`🚫 ${message.author.tag}, you are missing the \`manage server\` permission to use this command`,
            color:"RED"
          }
        }).catch(()=>{})
        if (args[0]==="none"){
          client.db.delete(`${message.guild.id}modlog`)
          return message.channel.send({
              embed:{
                description:`✅ ${message.author.tag}, the modlog setting was deleted`,
                color:"GREEN"
              }
            }).catch(()=>{})
        }
      var channel = message.mentions.channels.first()||message.channel
      client.db.set(`${message.guild.id}modlog`,channel.id)
      return message.channel.send({
          embed:{
            description:`✅ ${message.author.tag}, set the modlog channel to ${channel}`,
            color:"GREEN"
          }
        }).catch(()=>{})
    });
  }
}