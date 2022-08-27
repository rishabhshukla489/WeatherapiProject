const express=require("express");
const https=require("https");
const bodyParser=require("body-parser");
const app=express();
app.use(bodyParser.urlencoded({extended:true}));
app.get("/",function(req,res){
  res.sendFile(__dirname+"/index.html");
});
app.post("/",function(req,res){
  const query=req.body.cityName
  const apiKey=""//apikey
  const units="metric"
  const url="https://api.openweathermap.org/data/2.5/weather?appid="+apiKey+"&units="+units+"&q="+query;
  https.get(url,function(response){
    console.log(response.statusCode);
    response.on("data",function(data){
      const weatherData=JSON.parse(data)
      const temp=weatherData.main.temp
      const weatherDescription=weatherData.weather[0].description
      const icon=weatherData.weather[0].icon
      const imageURL="https://openweathermap.org/img/wn/"+icon+"@2x.png"
      res.write("<h1>The temperature in "+query +" is "+temp+" degree celcius</h1>");
      res.write("<h1>The weather description is "+weatherDescription+"</h1>");
      res.write("<img src="+imageURL+">");
      res.send();
    })
  })
})

app.listen(process.env.PORT||3000,function(){
  console.log("server started");
})
