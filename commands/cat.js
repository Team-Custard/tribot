module.exports={
  name:"cat",
  category:"fun",
  description:"meow meow, meow meow meow, meow",
  usage:";;cat",
  fulldescription:"Gets a random cat image",
  permissions:"embed links",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      const randomPuppy = require('random-puppy');

      randomPuppy("cat")
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