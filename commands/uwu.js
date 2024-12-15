module.exports={
  name:"uwu",
  category:"fun",
  description:"Makes your text look uwu",
  usage:";;uwu [text]",
  fulldescription:"Converts your message in to uwu-like text.",
  permissions:"embed links",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      const uwu = require("uwu-js");
			message.channel.send(uwu(args.join(" ")||"uwu"))
    });
  }
}