const path = require('path')
const express = require('express')
const hbs = require('hbs')

const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

const port = process.env.PORT || 3000

// Define paths for Express config
const pubDirpath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialspath = path.join(__dirname, '../templates/partials')

const app = express();

// Set handlebar engine and views location
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialspath)

// Setup static page to serve
app.use(express.static(pubDirpath))

app.get('',(req,res) => {
    res.render('index', {
        title:'Weather',
        name: 'Mahesh'
    })
})

app.get('/about',(req,res) => {
    res.render('about' ,{
        title:'about',
        name:'Mahesh kumar'
    })
})

app.get('/weather', (req, res) => {
    if (!req.query.search) {
        return res.send({
            error: 'You must specify the location'
        })
    }
    const address = req.query.search
    geocode(address, (error, { latitude, longitude } = {}) => {
        if (error) {
            return res.send({
                error: 'Unable to get location'
            })
        }
        forecast(latitude, longitude, (error, data) => {
            if (error) {
                return res.send({
                    error:'Unable to connect to weather service'
                })
            }
            const str = 'Weather is '+ weather + ' at ' + address + ' Current temp is ' + cur_temp + ' and feels like ' + feel_temp
            return res.send({
                weather: weather,
                cur_temp: cur_temp,
                feel_temp: feel_temp,
                location: req.query.search,
                precip: precip,
                is_day: is_day
            })
        })
    })
    // res.send({ 
    //     forecast : 'It is sunny',
    //     location : 'Bengaluru',
    //     address: req.query.search
    // })
})

app.get('/help/*', (req,res) => {
    res.render('notfound', {
        text: 'Help topic not found',
        name: 'Page not found',
        
    })
})
app.get('*', (req, res) => {
    res.render('notfound', {
        text: 'Page not found',
        name: 'Mahesh'
        
    })
})

app.listen(port, () => {
    console.log('Starting webserver at ' + port)
})
