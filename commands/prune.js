module.exports={
  name:"prune",
  category:"moderation",
  description:"Bulk deletes messages",
  usage:";;prune [options] <number of messages>",
  fulldescription:"Bulk deletes messages newer than 2 weeks",
  permissions:"**Bot**\nembed links, manage messages\n**You**\nmanage messages",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      var channel = message.channel
      if (!message.member.hasPermission("MANAGE_MESSAGES")) return message.channel.send({
          embed:{
            description:`🚫 ${message.author.tag}, you are missing the \`manage channels\` permission to use this command`,
            color:"RED"
          }
        }).catch(()=>{})
      if (args[0]==="all"){

        var purgemsg = await message.channel.send({
          embed:{
            description:`Pruning messages...`,
            color:"RANDOM"
          }
        }).catch(()=>{})
        var m = await channel.messages.fetch({
          limit:args[1],
          before:message.id
        }).catch((e)=>{
          purgemsg.edit({
            embed:{
              description:`:no_entry_sign: ${message.author.tag}, ${e}`,
              color:"RED"
            }
          }).catch(()=>{})
					return
        })
        
        await message.channel.bulkDelete(m,true)
        .then(async(messages)=>{
          purgemsg.edit({
          embed:{
            description:`✅ Pruned \`${messages.size}\` messages`,
            color:"GREEN"
          }
        }).catch(()=>{})
        })
        .catch((e)=>{
          purgemsg.edit({
            embed:{
              description:`:no_entry_sign: ${message.author.tag}, ${e}`,
              color:"RED"
            }
        }).catch(()=>{})
        })
      }
    });
  }
}