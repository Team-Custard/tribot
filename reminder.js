exports.set=async(message,args)=>{
  var thingy = args.slice(1).join(" ")||"do something"
  var jumplink = `https://discordapp.com/channels/${message.guild.id}/${message.channel.id}/${message.id}`
  message.channel.send({
    embed:{
      description:`${message.author.tag}, I will remind you in ${args[0]} minutes to ${thingy}.`,
      color:"RANDOM"
    }
  }).catch(()=>{})
  setTimeout(()=>{
    message.channel.send(`${message.member}`,{
      embed:{
        title:"Reminder",
        description:`${thingy}\n\n[\`[jumplink]\`](${jumplink})`,
        color:"RANDOM"
      }
    }).catch(()=>{})
  },(args[0]*60000))
}