module.exports={
  name:"servericon",
  category:"utilities",
  description:"Gets server icon",
  usage:";;servericon",
  fulldescription:"Gets the server icon",
  permissions:"embed links",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      message.channel.send({
        embed:{
          image:{url:message.guild.iconURL({dynamic:true})+"?size=1024"},
          color:"RANDOM"
        }
      })
    });
  }
}