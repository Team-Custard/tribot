module.exports={
  name:"guildMemberUpdate",
  initiate(client){
    client.on("guildMemberUpdate",async(om,nm)=>{
      setTimeout(()=>{},2500)
      const fetchedLogs = await nm.guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_ROLES_UPDATE',
      }).catch(()=>{})

      var channelid = await client.db.get(`${nm.guild.id}modlog`)
      if (!channelid) return;
      var channel = nm.guild.channels.cache.get(channelid)
      if (!channel) return;
      if (fetchedLogs){
        const deletionLog = fetchedLogs.entries.first();
        var muteold = om.roles.cache.find(r=>r.name==="Muted"||r.name==="muted")
        var mutenew = nm.roles.cache.find(r=>r.name==="Muted"||r.name==="muted")
        if (muteold===undefined&&mutenew!==undefined){
          channel.send(`${deletionLog.executor.tag} :mute: muted :mute: ${deletionLog.target.tag}\n**Reason:** ${deletionLog.reason}`).catch(()=>{})
        }else if (muteold!==undefined&&mutenew===undefined){
          channel.send(`${deletionLog.executor.tag} :loud_sound: unmuted :loud_sound: ${deletionLog.target.tag}\n**Reason:** ${deletionLog.reason}`).catch(()=>{})
        }
      }else{
        var muteold = om.roles.cache.find(r=>r.name==="Muted"||r.name==="muted")
        var mutenew = nm.roles.cache.find(r=>r.name==="Muted"||r.name==="muted")
        if (muteold===undefined&&mutenew!==undefined){
          channel.send(`${nm} was muted, but I couldn't figure out who muted them. Make sure I have permission to view audit logs`).catch(()=>{})
        }else if (muteold!==undefined&&mutenew===undefined){
          channel.send(`${nm} was unmuted, but I couldn't figure out who unmuted them. Make sure I have permission to view audit logs`).catch(()=>{})
        }
      }
    })
  }
}