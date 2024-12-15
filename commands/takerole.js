module.exports={
  name:"takerole",
  category:"utility",
  description:"Removes a whitelisted role from you",
  usage:";;takerole <roleid>",
  fulldescription:"Removes a whitelisted role away from you",
  permissions:"embed links",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      var roles = await client.db.get(`${message.guild.id}whitelistroles`)
      var found = false;
      if (!roles) roles = []
      roles.forEach(async role=>{
        console.log(`${role}\n${args[0]}`)
        if (args[0]===role){
          found = true;
          var r = await message.guild.roles.cache.get(role)
          if (!r){
            return message.channel.send({
              embed:{
                description:`:no_entry_sign: ${message.author.tag}, I can't find the whitelisted role in the server. This means the role may have been deleted. Ask a server admin for help.`,
                color:"RED"
              }
            }).catch(()=>{})
            
            
          }
          message.member.roles.remove(r,`whitelisted roles`)
            .then(()=>{
              return message.channel.send({
              embed:{
                description:`:white_check_mark: ${message.author.tag}, taken away **\`${r.name}\`** from you`,
                color:"GREEN"
              }
            }).catch(()=>{})
            })
            .catch((e)=>{
              return message.channel.send({
              embed:{
                description:`:no_entry_sign: ${message.author.tag}, ${e}`,
                color:"RED"
              }
            }).catch(()=>{})
            })
        }
      })
      if (found === false){
        return message.channel.send({
              embed:{
                description:`:no_entry_sign: ${message.author.tag}, the role you specified isn't whitelisted`,
                color:"RED"
              }
            }).catch(()=>{})
      }
    });
  }
}