module.exports={
  name:"level",
  category:"utility",
  description:":star: Shows your level in the server",
  usage:";;level [@member]",
  fulldescription:"`Premium` Displays a member's server level,",
  permissions:"embed links",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      message.channel.send({
        embed:{description:`:no_entry_sign: ${message.author.tag}, This is a premium feature. You can't use this.`,
        color:"YELLOW"
        }
      })
    });
  }
}