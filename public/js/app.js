
const weatherForm = document.querySelector('form')
const search = document.querySelector('input')
const messageOne = document.querySelector('#message-1')
const messageTwo = document.querySelector('#message-2')

const change = true

weatherForm.addEventListener('submit', (e) => {
    e.preventDefault()

    messageOne.textContent = 'Loading...'
    messageTwo.textContent = ''

    const location = search.value
 
    fetch (`/weather?address=${location}`).then((response) => {
        response.json().then( data => {
            if(data.error) {
                console.log(data.error)
                messageOne.textContent = 'An Error has Occured.'
                messageTwo.textContent = 'Please Try Again.'
            } else {
                const geoDataPath = data.weatherData.geoData
                console.log(data)
                messageOne.textContent = `${geoDataPath.disp}\n${geoDataPath.region}.\n${geoDataPath.street}.`
                messageTwo.textContent = 'Forecast: ' + data.weatherData.forecastData.temp
            }
        })
    })
})