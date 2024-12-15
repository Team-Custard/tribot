module.exports={
  name:"ready",
  initiate(client){
    client.on("ready",()=>{
      console.log(`Bot logged in as ${client.user.tag} successfully.`)
      client.user.setActivity(";;help || spongey.ga",{type:"LISTENING"})
    })
  }
}