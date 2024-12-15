module.exports={
  name:"voicekickall",
  category:"moderation",
  description:"kicks everyone in the same voice channel as you",
  usage:";;voicekickall",
  fulldescription:"disconnects everyone that is in the same voice channel as you.",
  permissions:"**Bot**\nembed links, move members\n**You**\nmove members",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      if (!message.member.hasPermission("MOVE_MEMBERS")) return message.channel.send({
          embed:{
            description:`🚫 ${message.author.tag}, you are missing the \`move members\` permission to use this command`,
            color:"RED"
          }
        }).catch(()=>{})
        if (!message.member.voice.channel) return message.channel.send({
          embed:{
            description:`🚫 ${message.author.tag}, you're not in a voice channel`,
            color:"RED"
          }
        }).catch(()=>{})
      var m = await message.channel.send({
          embed:{
            description:`Attempting to voice kick everyone`,
            color:"RANDOM"
          }
        }).catch(()=>{})
      message.member.voice.channel.members.forEach(member=>{
        member.voice.kick(`[voicekickall by ${message.author.tag}]`)
      })
      m.edit({
          embed:{
            description:`:white_check_mark: ${message.author.tag}, voicekicked!`,
            color:"GREEN"
          }
        }).catch(()=>{})
    });
  }
}