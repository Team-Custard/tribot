module.exports={
  name:"messageDelete",
  initiate(client){
    client.on("messageDelete",async(message)=>{
      if (!message.guild) return;
      if (message.author.bot) return;
      
      var channelid = await client.db.get(`${message.guild.id}messagelog`)
      if (!channelid) return;
      var channel = message.guild.channels.cache.get(channelid)
      if (!channel) return;
      channel.send({
          embed:{
            description:`A message by ${message.author} was deleted in ${message.channel}`,
            fields:[
              {name:"Content",value:message.content||"unknown"}
            ],
            color:"RED"
          }
        }).catch(()=>{})
    })
  }
}