module.exports={
  name:"messageUpdate",
  initiate(client){
    client.on("messageUpdate",async(message,newmsg)=>{
      if (!message.guild) return;
      if (message.author.bot) return;
      
      var channelid = await client.db.get(`${message.guild.id}messagelog`)
      if (!channelid) return;
      var channel = message.guild.channels.cache.get(channelid)
      if (!channel) return;
      channel.send({
          embed:{
            description:`A message by ${message.author} was updated in ${message.channel}\n[[Jump to message]](https://discord.com/channels/${message.guild.id}/${message.channel.id}/${message.id})`,
            fields:[
              {name:"Before",value:message.content||"unknown"},
              {name:"After",value:newmsg.content||"unknown"}
            ],
            color:"YELLOW"
          }
        }).catch(()=>{})
    })
  }
}