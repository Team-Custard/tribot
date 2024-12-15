module.exports={
  name:"guildMemberAdd",
  initiate(client){
    client.on("guildMemberAdd",async(member)=>{
      var channelid = await client.db.get(`${member.guild.id}memberlog`)
      if (!channelid) return;
      var channel = member.guild.channels.cache.get(channelid)
      if (!channel) return;
      channel.send(`**${member.user.tag}** has joined ${member.guild.name}. They are member \`${member.guild.memberCount}\`.`).catch(()=>{})
    })
  }
}