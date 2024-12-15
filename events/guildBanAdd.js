module.exports={
  name:"guildBanAdd",
  initiate(client){
    client.on('guildBanAdd', async(guild,member)=>{
      console.log("A ban was added")
      var channelid = await client.db.get(`${guild.id}modlog`)
      if (!channelid) return;
      var channel = guild.channels.cache.get(channelid)
      if (!channel) return;
      const timer = await setInterval(async(t)=>{
        console.log(t);
        const fetchedLogs = await guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_BAN_ADD',
      }).catch(()=>{})
      if (fetchedLogs){
        const deletionLogs = fetchedLogs.entries.first();
        if (deletionLogs.target.id===member.id){
          channel.send(`${deletionLogs.executor.tag} :hammer: banned :hammer: ${deletionLogs.target.tag}\n**Reason:** ${deletionLogs.reason}`)
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