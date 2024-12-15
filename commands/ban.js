module.exports={
  name:"ban",
  category:"moderation",
  description:"Bans a user",
  usage:";;ban <@user> [reason]",
  fulldescription:"bans someone from the server",
  permissions:"**Bot**\nembed links, ban members\n**You**\nban members",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      if (!message.member.hasPermission("BAN_MEMBERS")) return message.channel.send({
          embed:{
            description:`🚫 ${message.author.tag}, you are missing the \`ban members\` permission to use this command`,
            color:"RED"
          }
        }).catch(()=>{})
        try{
        var member = message.mentions.members.first()
        var r = args.slice(1).join(" ")
        if (!member.bannable){
          return message.channel.send({
            embed:{
              description:`🚫 ${message.author.tag}, this user can't be banned`,
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
              {name:"Type:",value:":hammer: Ban"},
              {name:"Reason",value:`${r}`}
            ],
            footer:{
              text:"Punishment submitted on"
            },
            timestamp:new Date()
          }
        }).catch(()=>{})
        member.ban({reason:`[ban by ${message.author.tag}]: ${r}`})
        .then(()=>{message.channel.send(`✅ ${member.user.tag} has been 🔨 banned 🔨 from ${message.guild.name}\n**Reason:** ${r||"null"}`).catch(()=>{})
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