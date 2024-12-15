function clean(text) {
  if (typeof(text) === "string")
    return text.replace(/`/g, "`" + String.fromCharCode(8203)).replace(/@/g, "@" + String.fromCharCode(8203));
  else
      return text;
}

module.exports={
  name:"eval",
  category:"developer",
  description:"Executes code",
  usage:";;eval <code>",
  fulldescription:"Executes javascript code like a boss",
  permissions:"embed links",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      if(message.author.id !== "716119360007176192") return message.channel.send("```xl\nOnly the server owner can use this\n```");
      try {
        var returnvalue = true
        var embed = true
        if (args[0]==="noembed"){
          embed = false
          args.shift();
        }if (args[0]==="silent"){
          returnvalue = false
          args.shift()
        }
        const code = args.join(" ");
        
      let evaled = eval(code);
 
      if (typeof evaled !== "string")
        evaled = require("util").inspect(evaled);
      if (returnvalue===true){
        if (embed===true){
          message.channel.send({
          embed:{
            fields:[
              {name:"📥 Input code",value:`\`\`\`${args.slice().join(" ")}\`\`\``},
              {name:"📤 Output code",value:`\`\`\`${clean(evaled)}\`\`\``}
            ],
            color:`RANDOM`
          }, code:"xl"}).catch((err)=>{message.channel.send(`\`\`\`xl\n${clean(err)}\n\`\`\``);});
        }else if (embed===false){
          message.channel.send(`${clean(evaled)}`,{code:"xl"}).catch((err)=>{message.channel.send(`\`\`\`xl\n${clean(err)}\n\`\`\``);});
        }
      }
    } catch (err) {
      message.channel.send(`\`\`\`xl\n${clean(err)}\n\`\`\``);
    }
    },{
      displayInHelp: false
    });
  }
}