/* const express=require("express"); 
const app=express();
const https=require("https");
const place="London"
const appkey="fdcb5b9745097d2dc601e7663dca0bed"
app.get("/", function(req , res)
{
   

 https.get("https://api.openweathermap.org/data/2.5/weather?q="+place+"&units=metric&appid="+appkey,
     function(response){
        console.log(response.statusCode);

        response.on("data", function(data)
        {
            console.log(data);
            const we= JSON.parse(data);
            console.log(we);
            const temp=we.main.temp
            const wed=we.weather[0].description 
            const icon = we.weather[0].icon 
            const imageicon=" https://openweathermap.org/img/wn/"+icon+"@2x.png"
            
            res.write("<p>The weather is currently "+ wed + "</p> ")
            res.write( " <h1>the temperature is " + temp+ " and weather description is "+wed +"</h1>")
            res.write(" <img src =" + imageicon+ ">")
        }
        );
     });
    });
app.listen(1000, function()
{
    console.log("server ******* is running");

});
 */


const express=require("express");
const app=express();
const https=require("https");




app.use(express.urlencoded({extended:true}) );
app.get("/", function(req , res)
{
   
res.sendFile(__dirname + "/index.html") ;

    });
    app.post("/", function(req, res)
    {
        
         const place=req.body.cityname;
const appkey="fdcb5b9745097d2dc601e7663dca0bed";
         https.get("https://api.openweathermap.org/data/2.5/weather?q="+place+"&units=metric&appid="+appkey,
         function(response){
            console.log(response.statusCode);
    
            response.on("data", function(data)
            {
                console.log(data);
                const we= JSON.parse(data);
                console.log(we);
                const temp=we.main.temp;
                const wed=we.weather[0].description; 
                const icon = we.weather[0].icon ;
                const imageicon=" https://openweathermap.org/img/wn/"+icon+"@2x.png"
                
                res.write("<p>The weather is currently "+ wed + "</p> ");
                res.write( " <h1>the temperature is " + temp+ " and weather description is "+wed +"</h1>");
                res.write(" <img src =" + imageicon+ ">");
            }
            );
         });


  
    })
app.listen(6007, function()
{
    console.log("server ******* is running");

});
