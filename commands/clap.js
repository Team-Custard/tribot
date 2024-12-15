module.exports={
  name:"clap",
  category:"fun",
  description:"Clapifies your message",
  usage:";;clap [message]",
  fulldescription:"Adds clap emoji between the words of your message.",
  permissions:"embed links",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      if (!args[0]) return message.channel.send(":clap::weary:");
			const claps = args.join(" :clap: ");
			message.channel.send(claps);
    });
  }
}