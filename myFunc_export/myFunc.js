module.exports = {
    mostFreq(arr) {
        let arrMap = {};
        arr.forEach(element => !arrMap[element] ? arrMap[element] = 1 : arrMap[element]++);
        let highestKey;
        let highestVal = 0;
        for (const key in arrMap) {
            let val = arrMap[key];
            if (highestVal < val) {
                highestKey = key;
                highestVal = val;
            }
        }
        return highestKey;
    },
    getImgAndDesc(arr, fnum, snum) {
        let imgId = {
            800: ['01d', 'clear sky'],
            801: ['02d', 'few clouds'],
            802: ['03d', 'scatter clouds'],
            803: ['04d', 'broken clouds'],
            300: ['09d', 'drizzle'],
            500: ['10d', 'rain'],
            200: ['11d', 'thunerstorm'],
            600: ['13d', 'snow'],
            700: ['50d', 'mist']
        }
        let weatherId = [];
        arr.forEach(element => weatherId.push(element.weather[0].id));
        weatherId.push(fnum);
        weatherId.push(snum);

        console.log(weatherId);

        let avgId = this.mostFreq(weatherId);

        return imgId[avgId];
    }
}