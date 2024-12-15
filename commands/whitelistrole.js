module.exports={
  name:"whitelistrole",
  category:"config",
  description:"modifies whitelisted roles in this server",
  usage:";;rolewhitelist <option> [value]",
  fulldescription:"Modifies the whitelisted roles in this server that members can give themselves with a command",
  permissions:"**bot\nembed links\n**you**\nmanage server",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      if (args[0]==="add"){
      if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send({
          embed:{
            description:`🚫 ${message.author.tag}, you are missing the \`manage server\` permission to use this command`,
            color:"RED"
          }
        }).catch(()=>{})
        if (!message.mentions.roles.size) return message.channel.send({
          embed:{
            description:`🚫 ${message.author.tag}, please mention the role you want to add to the whitelist`,
            color:"RED"
          }
        }).catch(()=>{})
        var role = message.mentions.roles.first()
        var roles = await client.db.get(`${message.guild.id}whitelistroles`)
        if (roles===null) roles = []
        roles.push(role.id)
        await client.db.set(`${message.guild.id}whitelistroles`,roles)
        message.channel.send({
          embed:{
            description:`✅ Added role **\`${role.name}\`** to the whitelist`,
            color:"GREEN"
          }
        }).catch(()=>{})
      }else if (args[0]==="show"){
        var roles = await client.db.get(`${message.guild.id}whitelistroles`)
        if (roles===null) roles = []
        const r = []
        roles.forEach(role=>{
          r.push(`<@&${role}> (${role})`)
        })
        message.channel.send({
          embed:{
            title:"Current whitelisted roles",
            description:`Members can give themselves these roles\n**current:** ${r.join(",\n")||"Nothing to show"}`,
            color:"RANDOM"
          }
        }).catch(()=>{})
      }else if (args[0]==="clear"){
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send({
          embed:{
            description:`🚫 ${message.author.tag}, you are missing the \`manage server\` permission to use this command`,
            color:"RED"
          }
        }).catch(()=>{})
        await client.db.delete(`${message.guild.id}whitelistroles`)
        message.channel.send({
          embed:{
            description:`✅ ${message.author.tag}, deleted!`,
            color:"GREEN"
          }
        }).catch(()=>{})
      }
    });
  }
}