let options = {};

options.Where = function (where) {
    let obj = {
        uri: 'https://api.openweathermap.org/data/2.5/weather',
        qs: {
            APPID: process.env.APP_ID,
            units: 'imperial',
            q: where
        }
    }
    return obj;
}

options.Multiple = function (a,b,c,d) {
    let obj = {
        uri: 'http://api.openweathermap.org/data/2.5/box/city',
        qs: {
            APPID: process.env.APP_ID,
            units: 'imperial',
            bbox: a + ',' + b + ',' + c + ',' + d + ',' + 20
        }
    }
    return obj;
}

module.exports = options;