module.exports={
  name:"music",
  category:"utility",
  description:":star: Music commands",
  usage:";;music <option> [args]",
  fulldescription:"**Premium:**\nUses TriBot's music bot functions",
  permissions:"embed links",
  load(client){
    const { Player } = require("discord-player")
    client.player = new Player(client)

    client.player.on("trackStart",(message,track)=>{
      message.channel.send({
        embed:{
          title:"Now playing",
          description:`\`${track.title}\`\n[requested by ${track.requestedBy}]`,
          color:"RANDOM",
          thumbnail:{url:track.thumbnail}
        }
      }).catch(()=>{})
    })
    client.player.on("trackAdd",(message,queue,track)=>{
      message.channel.send({
        embed:{
          title:"Track added",
          description:`\`${track.title}\` has been added to the queue by ${track.requestedBy.tag}`,
          color:"RANDOM",
          thumbnail:{url:track.thumbnail}
        }
      }).catch(()=>{})
    })
    client.player.on("channelEmpty",(message,track)=>{
      message.channel.send({
        embed:{
          title:"Music stopped",
          description:`Music has been stopped since everyone left the voice channel. Tribot premium will make the bot stay in voice channels 24/7. Learn more in the support server.`,
          color:"YELLOW"
        }
      }).catch(()=>{})
    })
    client.player.on("queueEnd",(message,track)=>{
      message.channel.send({
        embed:{
          title:"Music stopped",
          description:`Music has been stopped since the queue has finished. Tribot premium will make the bot stay in voice channels 24/7. Learn more in the support server.`,
          color:"YELLOW"
        }
      }).catch(()=>{})
    })
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      if (args[0]==="play"||args[0]==="add"){
        client.player.play(message,args.slice(1).join(" "),true)
      }else if (args[0]==="skip"){
        client.player.skip(message)
        message.channel.send({embed:{description:`:white_check_mark: ${message.author.tag}, skipped the track`,color:"GREEN"}})
      }else if (args[0]==="stop"){
        client.player.stop(message)
        message.channel.send({embed:{description:`:white_check_mark: ${message.author.tag}, stopped the track and left the voice channel. Tribot premium will make thr bot stay in voice channels 24/7. Learn more in the support server`,color:"YELLOW"}})
      }
    });
  }
}