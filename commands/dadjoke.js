module.exports={
  name:"dadjoke",
  category:"fun",
  description:"Get a dadjoke",
  usage:";;dadjoke",
  fulldescription:"Gets a dadjoke from https://icanhazdadjoke.com/ and sends it in chats",
  permissions:"embed links",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      const { getdadjoke } = require("get-dadjoke");
			const joke = await getdadjoke();
			message.channel.send(`${joke||"Hmm.. I don't know what dadjoke to tell."}`)
    });
  }
}