module.exports={
  name:"weather",
  category:"utility",
  description:"Checks the weather",
  usage:";;weather [location name/zipcode]",
  fulldescription:"Checks the weather of the specified location. Powered by [weather.js](https://www.npmjs.com/package/weather-js)",
  permissions:"embed links",
  load(client){
    client.registerCommand(module.exports.name,async(message,commandName,args)=>{
      var weather = require('weather-js');
      weather.find({search: args.join(" "), degreeType: 'F'}, function(err, result) {
        if(err) return message.channel.send({
          embed:{
          description:`:no_entry_sign: ${message.author.tag}, I can't get the weather for the location you specified.`,
          color:"RED"
          }
        }).catch(()=>{});

        try{
        message.channel.send({embed:{
          author:{
            name:`Weather for ${result[0].location.name}`,
            icon_url:"https://upload.wikimedia.org/wikipedia/commons/f/fd/MSN_Weather_icon.png",
            url:"https://www.msn.com/en-us/weather"
          },
          thumbnail:{url:result[0].current.imageUrl},
          fields:[
            {name:"Weather alerts:",value:result[0].location.alert||"There is none right now."},
            {name:`Currently in ${result[0].location.name}:`,value:`**Temperature:** ${result[0].current.temperature} *F\n**Feels like:** ${result[0].current.feelslike} *F\n**weather:** ${result[0].current.skytext}\n**Wind speed:** ${result[0].current.winddisplay}\n**Humidity:** ${result[0].current.humidity}`}
          ],
          color:"RANDOM"
        }}).catch(()=>{})
        }catch(err){
          return message.channel.send({
            embed:{
            description:`:no_entry_sign: ${message.author.tag}, I can't get the weather for the location you specified.`,
            color:"RED"
            }
          }).catch(()=>{});
        }
      });
    });
  }
}