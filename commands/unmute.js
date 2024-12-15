module.exports={
  name:"unmute",
  category:"moderation",
  description:"Unmutes a user",
  usage:";;mute <@user> [reason]",
  fulldescription:"Removes the mute role from the user",
  permissions:"**Bot**\nembed links, manage roles\n**You**\nManage roles",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      if (!message.member.hasPermission("MANAGE_ROLES")) return message.channel.send({
          embed:{
            description:`🚫 ${message.author.tag}, you are missing the \`manage roles\` permission to use this command`,
            color:"RED"
          }
        }).catch(()=>{})
        var r = args.slice(1).join(" ");
      if (!message.mentions.members.size){
        if (!args[1]){
        return message.channel.send({
        embed:{
          description:":no_entry_sign: No user was specified to unmute.",
          color:"RED"
        }
        }).catch(()=>{})
        }
        var member = await message.guild.members.fetch(args[0])
        .catch(()=>{
          return message.channel.send({
            embed:{
              description:":no_entry_sign: I can't find that user",
              color:"RED"
            }
          }).catch(()=>{})
        })

        var role = message.guild.roles.cache.find(r=>r.name==="muted"||r.name==="Muted")
        if (!role){
          return message.channel.send({
          embed:{
            description:`🚫 ${message.author.tag}, I can't find the muted role, or it's not in the cache. Make sure it exists`,
            color:"RED"
          }
        }).catch(()=>{})
        }

        member.roles.remove(role,`[unmute by ${message.author.tag}]: ${r}`)
        .then(()=>{message.channel.send({
          embed:{
            description:`✅ removed **\`Muted\`** from ${member.user.tag}`,
            color:"GREEN"
          }
        }).catch(()=>{})
        })
        .catch((e)=>{message.channel.send({
          embed:{
            description:`🚫 ${message.author.tag}, ${e}`,
            color:"RED"
          }
        }).catch(()=>{})
        })
      
      }else{
        var member = message.mentions.members.first()
        var role = message.guild.roles.cache.find(r=>r.name==="muted"||r.name==="Muted")
        if (!role){
          return message.channel.send({
          embed:{
            description:`🚫 ${message.author.tag}, I can't find the muted role, or it's not in the cache. Make sure it exists`,
            color:"RED"
          }
        }).catch(()=>{})
        }

        member.roles.remove(role,`[unmute by ${message.author.tag}]: ${r}`)
        .then(()=>{message.channel.send({
          embed:{
            description:`✅ removed **\`Muted\`** from ${member.user.tag}`,
            color:"GREEN"
          }
        }).catch(()=>{})
        })
        .catch((e)=>{message.channel.send({
          embed:{
            description:`🚫 ${message.author.tag}, ${e}`,
            color:"RED"
          }
        }).catch(()=>{})
        })
      }
      
      
    });
  }
}