module.exports={
  name:"say",
  category:"utility",
  description:"Makes the bot say something",
  usage:";;say <message>",
  fulldescription:"Makes the bot talk, and deletes your message",
  permissions:"**bot**\nembed links\n**you**\nmanage server",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      try{
        if (!message.member.hasPermission("MANAGE_GUILD")) return message.channel.send({
          embed:{
            description:`🚫 ${message.author.tag}, you are missing the \`manage server\` permission to use this command`,
            color:"RED"
          }
        }).catch(()=>{})
        message.delete({timeout:1000}).catch((e)=>{
          message.channel.send({
            embed:{
              description:`:no_entry_sign: ${message.author.tag}, ${e}`,
              color:"RED"
            }
          }).catch(()=>{})
        })
        message.channel.send({
            embed:{
              description:`${args.join(" ")||"undefined"}`,
              color:"RANDOM",
              footer:{
                text:`By ${message.author.tag}`,
                icon_url:message.author.avatarURL({dynamic:true})
              }
            }
        })
      }catch(e){
        return message.channel.send({
            embed:{
              description:`:no_entry_sign: ${message.author.tag}, ${e}`,
              color:"RED"
            }
        }).catch(()=>{})
      }
    });
  }
}