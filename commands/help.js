module.exports={
  name:"help",
  category:"basic",
  description:"Gets info on commands",
  usage:";;help [command]",
  fulldescription:"Gets the info of a command as well as their usage and permissions required to run it",
  permissions:"embed links",
  load(client){
    client.editCommandData(module.exports.name,async(message,commandName,args)=>{
      var fs = require("fs")

      var basiccmd = [];
      var utiltiycmd = [];
      var managementcmd = [];
      var moderatorcmd = [];
      var funcmd = [];
      var configcmd = [];


      const commandFiles = fs.readdirSync(__dirname).filter(file => file.endsWith('.js'));

      for (const file of commandFiles) {
        var success = true
        const command = require(__dirname+`/${file}`);
        try{
          
        }catch(err){
          success = false
        }finally{
          if (success===true){
            if (command.category==="basic"){
            basiccmd.push(`\`${command.name}\` : ${command.description}`)
            }
            if (command.category==="utility"){
            utiltiycmd.push(`\`${command.name}\` : ${command.description}`)
            }
            if (command.category==="management"){
            managementcmd.push(`\`${command.name}\` : ${command.description}`)
            }
            if (command.category==="moderation"){
            moderatorcmd.push(`\`${command.name}\` : ${command.description}`)
            }
            if (command.category==="fun"){
            funcmd.push(`\`${command.name}\` : ${command.description}`)
            }
            if (command.category==="config"){
            configcmd.push(`\`${command.name}\` : ${command.description}`)
            }
          }
        }
        }

      if (args[0]){
        var cn = [];
        for (const file of commandFiles) {
        const command = require(__dirname+`/${file}`);
        if (command.name===args[0]){
          cn.push(command.name)
          cn.push(command.fulldescription)
          cn.push(command.usage)
          cn.push(command.permissions)
        }
        }
        if (!cn[0]){
          message.channel.send({
          embed:{
            description:`🚫 No help found for **${args[0]}**`,
            color:"RED"
          }
        }).catch(()=>{})
        }else{
          message.channel.send({
          embed:{
            title:`;;${cn[0]}`,
            color:"RANDOM",
            description:cn[1],
            fields:[
              {name:"Usage",value:"```"+cn[2]+"```"},
              {name:"permissions",value:cn[3]}
            ]
          }
          })
        }
        
      }else{
        message.channel.send({
          embed:{
            author:{
              name:`${client.user.username} help`,
              icon_url:client.user.avatarURL({format:"png"})+"?size=512"
            },
            description:":star: = premium feature",
            fields:[
              {name:"Basic",value:basiccmd.join("\n")||"No commands found"},
              {name:"Utility",value:utiltiycmd.join("\n")||"No commands found"},
              {name:"Manager",value:managementcmd.join("\n")||"No commands found"},
              {name:"Moderator",value:moderatorcmd.join("\n")||"No commands found"},
              {name:"Fun",value:funcmd.join("\n")||"No commands found"},
              {name:"Config",value:configcmd.join("\n")||"No commands found"}
            ],
            color:"RANDOM",
            thumbnail:{url:client.user.avatarURL({format:"png"})+"?size=512"},
            footer:{text:"Use ;;help <command> for more info on command"}
          }
        }).catch(()=>{})
      }
    });
  }
}