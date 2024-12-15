module.exports={
  name:"guildBanRemove",
  initiate(client){
    client.on("guildBanRemove",async(guild,member)=>{
      console.log("A ban was removed")
      var channelid = await client.db.get(`${guild.id}modlog`)
      if (!channelid) return;
      var channel = guild.channels.cache.get(channelid)
      if (!channel) return;
      const timer = await setInterval(async(t)=>{
        console.log(t);
        const fetchedLogs = await guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_REMOVE',
      }).catch(()=>{})
      if (fetchedLogs){
        const deletionLogs = fetchedLogs.entries.first();
        if (deletionLogs.target.id===member.id){
          channel.send(`${deletionLogs.executor.tag} :wrench: unbanned :wrench: ${deletionLogs.target.tag}\n**Reason:** ${deletionLogs.reason}`)
          clearInterval(timer)
        }
      }else{
        channel.send(`I couldn't figure how ${member.tag} was banned.`)
        clearInterval(timer)
      } 
      },1000)
    })
  }
}