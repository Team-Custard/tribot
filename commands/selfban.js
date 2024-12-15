module.exports={
  name:"selfban",
  category:"moderation",
  description:"Bans yourself",
  usage:";;selfban",
  fulldescription:"bans you from the server",
  permissions:"**Bot**\nembed links, ban members\n**You**\nban members",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      message.channel.send({
        embed:{
          description:`:no_entry_sign: ${message.author.tag} I don't think you really wanna ban yourself. I'm not unbanning you if you do.`,
          color:"RED"
        }
      }).catch(()=>{})
    });
  }
}