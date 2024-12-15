module.exports={
  name:"addrole",
  category:"management",
  description:"Adds a role to a user",
  usage:";;addrole <@role> <@user>",
  fulldescription:"Adds a role to a user.",
  permissions:"embed links",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send({
          embed:{
            description:`🚫 ${message.author.tag}, you are missing the \`manage server\` permission to use this command`,
            color:"RED"
          }
        }).catch(()=>{})
      if (!message.mentions.roles.size) return message.channel.send({
        embed:{
          description:":no_entry_sign: No roles was specified to assign.",
          color:"RED"
        }
      }).catch(()=>{})
      
      if (!message.mentions.members.size){
        if (!args[1]){
        return message.channel.send({
        embed:{
          description:":no_entry_sign: No user was specified to add the role to.",
          color:"RED"
        }
        }).catch(()=>{})
        }
        var member = await message.guild.members.fetch(args[1])
        .catch(()=>{
          return message.channel.send({
            embed:{
              description:":no_entry_sign: I can't find that user",
              color:"RED"
            }
          }).catch(()=>{})
        })

        var role = message.guild.roles.cache.get(args[0])||message.mentions.roles.first()

        member.roles.add(role,`[addrole by ${message.author.tag}]`)
        .then(()=>{message.channel.send({
          embed:{
            description:`✅ Added **\`${role.name}\`** to ${member.user.tag}`,
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
        var role = message.guild.roles.cache.get(args[0])||message.mentions.roles.first()

        member.roles.add(role,`[addrole by ${message.author.tag}]`)
        .then(()=>{message.channel.send({
          embed:{
            description:`✅ Added **\`${role.name}\`** to ${member.user.tag}`,
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