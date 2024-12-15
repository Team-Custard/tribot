module.exports={
  name:"tempmute",
  category:"moderation",
  description:"temporarily mutes a user",
  usage:";;tempmute <@mention> <minutes> [reason]",
  fulldescription:"Adds the muted role to a user for a curtain amount of time in minutes",
  permissions:"embed links",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      require("../tempmute").set(message,args)
    });
  }
}