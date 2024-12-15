module.exports={
  name:"rps",
  category:"fun",
  description:"Rock paper scissors",
  usage:";;rps <rock|paper|scissors>",
  fulldescription:"Plays rock paper scissors with the bot",
  permissions:"embed links",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      var objects = ["🪨","📰","✂️"];
      var chosen = objects[Math.floor(Math.random()*objects.length)];

      var userchosen = args[0]

      if (userchosen==="rock"){
        userchosen = "🪨"
      }else if (userchosen==="paper"){
        userchosen = "📰"
      }else if (userchosen==="scissors"){
        userchosen = "✂️"
      }else{
        userchosen = "❓"
      }

      message.channel.send(`${client.user.username}> ${chosen} | ${userchosen} <you`)
    });
  }
}