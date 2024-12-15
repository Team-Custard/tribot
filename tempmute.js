exports.set=async(message,args)=>{
  var reason = args.slice(2).join(" ")
  var member = message.mentions.members.first()
  var muterole = message.guild.roles.cache.find(r=>r.name==="muted"||r.name==="Muted")
  if (!muterole){
    return message.channel.send({
    embed:{
      description:`:no_entry_sign: ${message.author.tag}, the mute role wasn't found. Make sure there's a role called Muted.`,
      color:"RED"
    }
  }).catch(()=>{})
  }
  member.roles.add(muterole,`[mute by ${message.author.tag} (${args[1]}m)]: ${reason}`)
  .then(()=>{message.channel.send({
    embed:{
      description:`:white_check_mark: ${message.author.tag}, added **\`Muted\`** to ${member.user.tag} for ${args[1]} minutes`,
      color:"GREEN"
    }
  }).catch(()=>{})
  })
  .catch((e)=>{
    return message.channel.send({
    embed:{
      description:`${message.author.tag}, ${e}`,
      color:"RED"
    }
  }).catch(()=>{})
  })
  setTimeout(()=>{
    member.roles.remove(muterole,`${args[1]} minute mute by ${message.author.tag} finished`)
    .catch(()=>{})
  },(args[1]*60000))
}
exports.self=async(message,args)=>{
  var member = message.member
  var muterole = message.guild.roles.cache.find(r=>r.name==="muted"||r.name==="Muted")
  if (!muterole){
    return message.channel.send({
    embed:{
      description:`:no_entry_sign: ${message.author.tag}, the mute role wasn't found. Make sure there's a role called Muted.`,
      color:"RED"
    }
  }).catch(()=>{})
  }
  member.roles.add(muterole,`[selfmute by ${message.author.tag} (${args[0]}m)]`)
  .then(()=>{message.channel.send({
    embed:{
      description:`:white_check_mark: ${message.author.tag}, added **\`Muted\`** to you for ${args[0]} minutes. Don't bug the mods to remove it!`,
      color:"GREEN"
    }
  }).catch(()=>{})
  })
  .catch((e)=>{
    return message.channel.send({
    embed:{
      description:`${message.author.tag}, ${e}`,
      color:"RED"
    }
  }).catch(()=>{})
  })
  setTimeout(()=>{
    member.roles.remove(muterole,`${args[0]} minute selfmute  finished`)
    .catch(()=>{})
  },(args[0]*60000))
}