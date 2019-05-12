require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const request = require('request');
const myFunc = require(__dirname + '/my_export/myFunc.js');
const options = require(__dirname + '/my_export/options.js');

const app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.get('/', (req, res) => res.render('index'));

app.post('/', (req, res) => {
    let formData = req.body;
    let from = formData.from;
    let to = formData.to;

    request(options.Where(from), (error, response, body) => {
        if (response.statusCode === 200) {
            dataFrom = JSON.parse(body);
            request(options.Where(to), (error, response, body) => {
                // error ? console.log('error:', error) : console.log('response', response && response.statusCode);
                dataTo = JSON.parse(body);

                let fromLon = dataFrom.coord.lon;
                let fromLat = dataFrom.coord.lat;
                let toLon = dataTo.coord.lon;
                let toLat = dataTo.coord.lat;

                request(options.Multiple(fromLon, fromLat, toLon, toLat), (error, response, body) => {
                    if (error) res.send('search box is too small');
                    let dataMultiple = JSON.parse(body);
                    let imgAndDesc = myFunc.getImgAndDesc(dataMultiple.list, dataFrom.weather[0].id, dataTo.weather[0].id);
                    let desc = myFunc.getDescription(imgAndDesc[1]);
					console.log("TCL: desc", desc)
                    // console.log(myFunc.getDescription('scatter clouds'));
                    // console.log(myFunc.getDescription('broken clouds'));
                    // console.log(myFunc.getDescription('drizzle'));
                    // console.log(myFunc.getDescription('rain'));
                    // console.log(myFunc.getDescription('thunderstorm'));
                    // console.log(myFunc.getDescription('snow'));
                    // console.log(myFunc.getDescription('mist'));

                    res.render('weather response', {
                        // start of from
                        iconFrom: dataFrom.weather[0].icon,
                        cityFrom: dataFrom.name,
                        descriptionFrom: dataFrom.weather[0].description,
                        mainDescFrom: dataFrom.weather[0].main,
                        tempFrom: dataFrom.main.temp.toFixed(0),
                        minTempFrom: dataFrom.main.temp_min.toFixed(0),
                        maxTempFrom: dataFrom.main.temp_max.toFixed(0),
                        // end of from
                        // start of to
                        iconTo: dataTo.weather[0].icon,
                        cityTo: dataTo.name,
                        descriptionTo: dataTo.weather[0].description,
                        mainDescTo: dataTo.weather[0].main,
                        tempTo: dataTo.main.temp.toFixed(0),
                        minTempTo: dataTo.main.temp_min.toFixed(0),
                        maxTempTo: dataTo.main.temp_max.toFixed(0),
                        // end of to
                        // start of multipleData
                        list: dataMultiple.list,
                        avgWeatherAndDesc: myFunc.getImgAndDesc(dataMultiple.list, dataFrom.weather[0].id, dataTo.weather[0].id),
                        avgTemp: myFunc.mostFreqNum(dataMultiple.list),
                        mainDesc: myFunc.getDescription(myFunc.getImgAndDesc(dataMultiple.list, dataFrom.weather[0].id, dataTo.weather[0].id)[1]),

                        // end of multipleData
                    });
                });
            });
        } else {
            // tempSolution
            res.send('<h1>Something went wrong</h1>')
            // if TYPO, send a page that lists possible city names
        }
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