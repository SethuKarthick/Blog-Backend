const express = require('express')
const appConfig  = require ('./config/appConfig')
const fs= require ('fs')
const mongoose =  require('mongoose')
const model = require ('./models/Blog')
const bodyParser = require ('body-parser')
const cookieParser = require('cookie-parser')

const app = express()

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(cookieParser())

let routesPath = './routes'

fs.readdirSync(routesPath).forEach(function (file){
    if (~file.indexOf('.js')){
        let route = require(routesPath+'/'+file);
        route.setRouter(app);
    }
    
});

let modelsPath = './models'

fs.readdirSync(modelsPath).forEach(function(file){
    if(~file.indexOf('.js'))require(modelsPath+'/'+file)
})


app.listen(appConfig.port , () => { 
    
    
    console.log('listening on port 3000');
    let db = mongoose.connect(appConfig.db.uri, { 
        useNewUrlParser: true,
        useUnifiedTopology: true } );  

})

mongoose.connection.on('error', function(err){
   
        console.log("database connection error");
        console.log(err);
    }
);

mongoose.connection.on('open', function(err){
    if(err){
        console.log("database error");
        console.log(err);
    } else {
        console.log("database connection open success");
    }
});

