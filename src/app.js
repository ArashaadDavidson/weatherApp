const path = require('path')
const express =require('express') // express is a function instead of a object
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
const app = express() // using app will be like CALLING express

//defining paths for Express config

//path is a core node module that joins
const publicDirectoryPath = path.join(__dirname, '../public') // joins the arguments of the join() method
const viewsPath = path.join(__dirname, '../handlebarsTemplates/views')
const partialsPath = path.join(__dirname, '../handlebarsTemplates/partials')
// app.use() is a way to customize the server and now we'll be customizing it to serve up the public directory/folder
//express.static() is a function and it takes a root path as a parameter that is used to serve up that path. The return value of express.static() is passed into app.use() 

//Set up handle bars engine and views location

app.set('view engine','hbs')// set an express setting taking two arguments, the setting name and the setting value. Tells express to use handlebars/hbs templating engine and to look in the views directory
app.set('views', viewsPath) // sets an express setting, setting name and setting value. Tells express to set the views directory to a new directory using an absolute path 
hbs.registerPartials(partialsPath)

//Set up static directory to serve

app.use(express.static(publicDirectoryPath))// when serving up a directory its usually static content
//configures the server on what to do when someone tries to GET the server's resource at a specific URL. Sending back HTML, json,etc
//the get method takes in 2 arguments. 1st the ROUTE, the partial URL. This would be nothing for app.com, then'/help' for app.com/help, then '/about' for app.com/about. 2nd argument is a function and it describes what we want to do when someone visits the route in the 1st argument

// four GET routes

// app.get('', (req,res)=>{ // the function takes 2 arguments. 'req', the 1st is a object containing information about the request. 'res', the 2nd is a argument that has methods allowing us to customize what we are going to send back the requester
//     res.send('This is express') //allows us to send something back to the requester, in this case its just a string
// }) cls
app.get('',(req,res)=>{
    res.render('index',{
        name: 'Arashaad',
        title: 'Weather'
    })
})

app.get('/help',(req,res)=>{ // '/help' is the route name used in the URL
    res.render('help',{ // 'help' is the name of the template/view use by the templating engine
        helpText: 'Some helpful text', // this is an object containg the dynamic values/ template data
        title: 'Help',
        name: 'Arashaad Davidson'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        name: 'Arashaad',
        title: 'About',
        name: 'Arashaad Davidson'
    })
})

app.get('/weather', (req,res)=>{ // requests are made with query strings e.g url?address=grassypark
    if(!req.query.address){ // this server route checks if a query string with the key of 'address' was not used, then return an error and the code ends there
        return res.send({
            error: 'Please provide an address',
        })
    }
    geocode(req.query.address, (error, {Latitude, Longitude, Place}={})=>{ // if no error execute this. The required geocode function from the geocode.js file executes
        if(error){ 
            return res.send({error})
        }
        forecast(Longitude, Latitude,(error,{weather_description, temperature, feelslike}={})=>{
            if(error){
                return res.send({error})
            }else{
                res.send({
                    Place,
                    Latitude,
                    Longitude,
                    weather_description,
                    temperature,
                    feelslike
                })
            }
        })
    })
})

// app.get('/products',(req,res)=>{

//     if(!req.query.search){
//         return res.send({
//             error: 'Please provide a search term'
//         })
//     }
//     console.log(req.query.search)
//     res.send({
//         product: []
//     })
// })

app.get('/help/*',(req,res)=>{
    res.render('404',{
        error: 'Help article not found',
        name: 'Arashaad Davidson',
        title: 'Help'
    })
})

app.get('*',(req,res)=>{
    res.render('404',{
        error: 'Page not found',
        name: 'Arashaad Davidson',
        title: '404'
    })
})

app.listen(3000, ()=>{
    console.log(__dirname)
    console.log("Listening on port 3000")
})

