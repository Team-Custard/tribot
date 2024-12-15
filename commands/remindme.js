module.exports={
  name:"remindme",
  category:"utility",
  description:"Reminds you to do something",
  usage:";;remindme <minutes> [text]",
  fulldescription:"Sets a reminder for you to do something in minutes",
  permissions:"embed links",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      require("../reminder").set(message,args)
    });
  }
}