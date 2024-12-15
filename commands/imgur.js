module.exports={
  name:"imgur",
  category:"fun",
  description:"gets a random imgur image",
  usage:";;imgur <image>",
  fulldescription:"Gets a random imgur image. Be aware that nsfw may appear.",
  permissions:"embed links",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      if (!args[0]){
        return message.channel.send({
          embed:{
            description:`:no_entry_sign: ${message.author.tag}, nothing found`,
            color:"RED"
          }
        }).catch(()=>{})
      }
      message.channel.startTyping()

      var randompuppy = require("random-puppy")
      randompuppy(args.join(" "))
      .then(url=>{
        if (!url){
          message.channel.stopTyping()
          return message.channel.send({
            embed:{
              description:`:no_entry_sign: ${message.author.tag}, nothing found`,
              color:"RED"
            }
          }).catch(()=>{})
        }
        var fetch = require("node-fetch")
        fetch(url)
        .then((res)=>{
          message.channel.stopTyping()
          message.channel.stopTyping(true)
          message.channel.send(res.url).catch(()=>{})
        })
        .catch((e)=>{
        return message.channel.send({
          embed:{
            description:`:no_entry_sign: ${message.author.tag}, ${e}`,
            color:"RED"
          }
        }).catch(()=>{})
      })
      })
      .catch(()=>{
        return message.channel.send({
          embed:{
            description:`:no_entry_sign: ${message.author.tag}, nothing found`,
            color:"RED"
          }
        }).catch(()=>{})
      })
    });
  }
}