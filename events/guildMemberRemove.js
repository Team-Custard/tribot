module.exports={
  name:"guildMemberRemove",
  initiate(client){
    client.on("guildMemberRemove",async(member)=>{
      setTimeout(()=>{},2500)
      const fetchedLogs = await member.guild.fetchAuditLogs({
        limit: 1,
        type: 'MEMBER_KICK',
      }).catch(()=>{})

      var channelid = await client.db.get(`${member.guild.id}modlog`)
      if (!channelid) return;
      var channel = member.guild.channels.cache.get(channelid)
      if (!channel) return;
      if (fetchedLogs){
        const deletionLog = fetchedLogs.entries.first();
        if (deletionLog.target.id===member.user.id){
          channel.send(`${deletionLog.executor.tag} :boot: kicked :boot: ${deletionLog.target.tag}\n**Reason:** ${deletionLog.reason}`)
          clearInterval(timer).catch(()=>{})
        }
      }else{
        channel.send(`${member.user.tag} left, but I don't know if it was a kick or a ban. Make sure I have permission to see audit log.`).catch(()=>{})
      }
      var channelid2 = await client.db.get(`${member.guild.id}memberlog`)
      if (!channelid2) return;
      var channel2 = member.guild.channels.cache.get(channelid2)
      if (!channel2) return;
      channel2.send(`**${member.user.tag}** has left ${member.guild.name}. there are now \`${member.guild.memberCount}\` members.`).catch(()=>{})
    })
  }
}