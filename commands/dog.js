module.exports={
  name:"dog",
  category:"fun",
  description:"woof woof, woof woof woof, woof",
  usage:";;dog",
  fulldescription:"Gets a random dog image",
  permissions:"embed links",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      const randomPuppy = require('random-puppy');

      randomPuppy("dog")
          .then(async url => {
              var fetch = require("node-fetch")
              await fetch(url)
              .then(res=>{
              message.channel.send(res.url).catch(()=>{})
              })
          })
    });
  }
}