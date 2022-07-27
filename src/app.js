const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast.js')

const app = express()
const port = process.env.PORT || 3000
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(path.join(__dirname,'../public')))

const renderErrorPage = (res, error) =>  {
    res.render('error-page', {
        error: error   
    })
}

app.get('', (req, res) => {
    res.render('index', {
        title: 'Index From a Handlebar File',
        name: 'William Kruk'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'William Kruk'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help Page Title',
        name: 'William Kruk'
    })
})

app.get('/weather', (req,res) => {
    if(!req.query.address){
        return res.send({
            error: 'adress/location required'
        })
    }
    geocode(req.query.address, (error, {disp, region, street, data} = {}) => {
        if (error){
            console.log('Error: '+ error)
            return  res.send({error: 'error'})
        } else {
            const weatherData = {}
            console.log(`${disp}\n${region}\n${street}`)
            Object.assign(weatherData, {
                geoData: {
                    disp,
                    region,
                    street
                }
            })
            const coords = data.split(', ')
            forecast (parseFloat(coords[0].trim()).toFixed(8), parseFloat(coords[1].trim()).toFixed(8), (error, forecastData) => {
                if (error) {
                    console.log('Error: '+ error)
                    return (error, undefined)
                } else {
                    Object.values(forecastData).forEach( fData => {
                        console.log(fData)
                    })
                    Object.assign(weatherData, {
                        forecastData
                    })
                    return res.send({
                        weatherData
                    })
                }
            })
        }
    }) 
})

app.get('/help/*', (req, res) => {
    renderErrorPage(res, 'Help Page Not Found')
})

app.get('*', (req, res) => {
    renderErrorPage(res, '404: Page not found')
})

app.listen(port, () => {
    console.log('Server is up on port 3000')
})