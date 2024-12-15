module.exports={
  name:"avatar",
  category:"utility",
  description:"Gets the user's avatar",
  usage:";;avatar [@user]",
  fulldescription:"Gets the user's avatar, as well as their avatar link",
  permissions:"embed links",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      var member = message.mentions.members.first()||message.member
      message.channel.send({
        embed:{
          author:{
            name:`Avatar for ${member.user.tag}`,
            icon_url:member.user.avatarURL({dynamic:true})
          },
            image:{url:member.user.avatarURL({dynamic:true})+"?size=1024"},
            description:`[\`[avarar url]\`](${member.user.avatarURL({dynamic:true})+"?size=1024"} "Click to open in a new tab")`,
            color:"RANDOM",
            timestamp:new Date()
        }
      }).catch(()=>{})
    });
  }
}