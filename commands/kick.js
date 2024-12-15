module.exports={
  name:"kick",
  category:"moderation",
  description:"Kicks a user",
  usage:";;kick <@user> [reason]",
  fulldescription:"Kicks someone from the server",
  permissions:"**Bot**\nembed links, kick members\n**You**\nkick members",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      if (!message.member.hasPermission("KICK_MEMBERS")) return message.channel.send({
          embed:{
            description:`🚫 ${message.author.tag}, you are missing the \`kick members\` permission to use this command`,
            color:"RED"
          }
        }).catch(()=>{})
        try{
        var member = message.mentions.members.first()
        var r = args.slice(1).join(" ")
        if (!member.kickable){
          return message.channel.send({
            embed:{
              description:`🚫 ${message.author.tag}, this user can't be kicked`,
              color:"RED"
            }
          }).catch(()=>{})
        }
        member.send({
          embed:{
            author:{
              name:`${message.guild.name}`,
              icon_url:`${message.guild.iconURL({dynamic:true})}`
            },
            title:"Punishment submitted",
            description:"A punishment has been assigned to you.",
            fields:[
              {name:"Type:",value:":boot: Kick"},
              {name:"Reason",value:`${r}`}
            ],
            footer:{
              text:"Punishment submitted on"
            },
            timestamp:new Date()
          }
        }).catch(()=>{})
        member.kick(`[kick by ${message.author.tag}]: ${r}`)
        .then(()=>{message.channel.send(`✅ ${member.user.tag} has been 👢 kicked 👢 from ${message.guild.name}\n**Reason:** ${r||"null"}`).catch(()=>{})
        })
        .catch((e)=>{message.channel.send({
          embed:{
            description:`🚫 ${message.author.tag}, ${e}`,
            color:"RED"
          }
        }).catch(()=>{})
        })
        }catch(e){
          message.channel.send({
            embed:{
              description:`🚫 ${message.author.tag}, ${e}`,
              color:"RED"
            }
          }).catch(()=>{})
        }
      
    });
  }
}