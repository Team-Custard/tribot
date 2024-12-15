module.exports={
  name:"selfmute",
  category:"utility",
  description:"temporarily mutes yourself",
  usage:";;selfmute <minutes>",
  fulldescription:"Adds the muted role to yourself for a curtain amount of time in minutes. Why did I make this? Don't ask me.",
  permissions:"embed links",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      require("../tempmute").self(message,args)
    });
  }
}