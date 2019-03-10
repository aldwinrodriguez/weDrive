const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.set('view engine', 'ejs');

app.get('/', (req, res) => {
    res.render('index')
})

app.post('/', (req, res) => {
    let formData = req.body;
    let from = formData.from;
    let to = formData.to;
    let optionFrom = {
        uri: 'https://api.openweathermap.org/data/2.5/weather',
        qs: {
            APPID: 'a2b8a68b80bdbfcaebb2d6c124e35e40',
            units: 'imperial',
            q: from
        }
    }
    let optionTo = {
        uri: 'https://api.openweathermap.org/data/2.5/weather',
        qs: {
            APPID: 'a2b8a68b80bdbfcaebb2d6c124e35e40',
            units: 'imperial',
            q: to
        }
    }
    var dataFrom, dataTo;
    request(optionFrom, (error, response, body) => {
        // error ? console.log('error:', error) : console.log('response', response && response.statusCode);
        dataFrom = JSON.parse(body);

    });
    request(optionTo, (error, response, body) => {
        // error ? console.log('error:', error) : console.log('response', response && response.statusCode);
        dataTo = JSON.parse(body);
        console.log(dataFrom, dataTo);
    });


})
app.listen(3000, () => console.log('starting'));


// API call
// http://api.openweathermap.org/data/2.5/forecast?id=524901&APPID={APIKEY}

// http://api.openweathermap.org/data/2.5/forecast?id=5097598&APPID=a2b8a68b80bdbfcaebb2d6c124e35e40

// 5097598
// Elizabeth

/*
 API key
 &APPID=a2b8a68b80bdbfcaebb2d6c124e35e40
*/

// Call current weather data for one location

/*
http://api.openweathermap.org/data/2.5/weather?
q = city name
id = city ID, check out the list.json.gz
lat, lon = long longtitude and latitude
zip = zip code, country code
*/

// Call current weather data for several cities

/*
http://api.openweathermap.org/data/2.5/box/city?
--> to get cities inbound by the rectangle from longtitude , latitude
bbox = bounding box lon-left,lat-bottom,lon-right,lat-top,zoom
callback = javascript functionName
cluster = use server clustering of points. Possible values ​​are [yes, no]
*/

/*
http://api.openweathermap.org/data/2.5/find?
--> to get limited number of cities, depending on the center point of the longtitude and latitude
lat = latitude
lon = longitude
callback = functionName for JSONP callback.
cnt = number of cities
cluster = use server clustering of points. Possible values ​​are [yes, no]
*/

/*
http://api.openweathermap.org/data/2.5/group?
--> to get requested cities by their ID, limit of 20
NOTE: A single ID counts as a one API call! So, the above example is treated as a 3 API calls. free account can only call 10 times.
id = separated by commas
units = can me metric
*/

/*
Extras:
units=imperial for Fahrenheit
units=metric for Celsius
Kelvin is by default
*/