module.exports={
  name:"dehoist",
  category:"moderation",
  description:"Dehoists a user",
  usage:";;dehoist <@member>",
  fulldescription:"Changes a user's name to move a user to the bottom of the member list",
  permissions:"**bot**\nembed links, manage nicknames\n**you**\nmanage nicknames",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      if (!message.member.hasPermission("MANAGE_NICKNAMES")) return message.channel.send({
          embed:{
            description:`🚫 ${message.author.tag}, you are missing the \`manage nicknames\` permission to use this command`,
            color:"RED"
          }
        }).catch(()=>{})
        if (!message.mentions.roles.size) return message.channel.send({
        embed:{
          description:":no_entry_sign: No roles was specified to assign.",
          color:"RED"
        }
      }).catch(()=>{})
      var member = message.mentions.members.first()
      var oldnick = member.nickname||member.user.username
      member.setNickname(`឵${oldnick}`,`[dehoist by ${message.author.tag}]`)
      .then(()=>{
        message.channel.send({
          embed:{
            description:`:white_check_mark: ${message.author.tag}, dehoisted ${member.user.tag}`,
            color:"GREEN"
          }
        })
      })
      .catch((e)=>{
        message.channel.send({
          embed:{
            description:`:no_entry_sign: ${message.author.tag}, ${e}`,
            color:"RED"
          }
        })})
    });
  }
}