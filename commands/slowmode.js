module.exports={
  name:"slowmode",
  category:"moderation",
  description:"Sets the channel's slowmode",
  usage:";;slowmode <seconds> [#channel]",
  fulldescription:"Changes the channel's slowode to a time in seconds.",
  permissions:"**Bot**\nembed links, manage channel\n**You**\nmanage channel",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      if (!message.member.hasPermission("MANAGE_CHANNELS")) return message.channel.send({
          embed:{
            description:`🚫 ${message.author.tag}, you are missing the \`manage channels\` permission to use this command`,
            color:"RED"
          }
        }).catch(()=>{})
      var channel = message.mentions.channels.first()||message.channel

      channel.setRateLimitPerUser(args[0])
      .then(()=>{message.channel.send({
        embed:{
            description:`✅ Changed slowmode of ${channel} to \`${args[0]}\` seconds`,
            color:"GREEN"
        }
      }).catch(()=>{})
      })
      .catch((e)=>{
        message.channel.send({
        embed:{
            description:`:no_entry_sign: ${message.author.tag}, ${e}`,
            color:"RED"
        }
      }).catch(()=>{})
      })
    });
  }
}