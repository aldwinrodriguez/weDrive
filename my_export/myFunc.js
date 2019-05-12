module.exports = {
    mostFreq(arr) {
        let arrMap = {};
        arr.forEach(element => !arrMap[Math.ceil(element)] ? arrMap[Math.ceil(element)] = 1 : arrMap[Math.ceil(element)]++);
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
            804: ['04d', 'broken clouds'],
            300: ['09d', 'drizzle'],
            500: ['10d', 'rain'],
            200: ['11d', 'thunderstorm'],
            600: ['13d', 'snow'],
            700: ['50d', 'mist']
        }
        let weatherId = [];
        
        arr.forEach(element => weatherId.push(element.weather[0].id));
        weatherId.push(fnum);
        weatherId.push(snum);
        let avgId = this.mostFreq(weatherId);
        if (avgId >= 200 && avgId < 300) {
            avgId = 200;
        }
        if (avgId >= 300 && avgId < 400) {
            avgId = 300;
        }
        if (avgId >= 500 && avgId < 600) {
            avgId = 500;
        }
        if (avgId >= 600 && avgId < 700) {
            avgId = 600;
        }
        if (avgId >= 700 && avgId < 800) {
            avgId = 700;
        }
        
        console.log(this.mostFreq(weatherId), weatherId);
        

        return imgId[avgId];
    },
    mostFreqNum(arr) {
        let arrMap = {};
        arr.forEach(element => !arrMap[Math.ceil(element.main.temp)] ? arrMap[Math.ceil(element.main.temp)] = 1 : arrMap[Math.ceil(element.main.temp)]++);
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
    getDescription(desc) {
        let descObj = {
            'clear sky': 'Shine up, sun is rising. It\'d be a nice drive 😎😎😎',
            'few clouds': 'Clouds there and there, driving will be smooth and non hazardous 😁👍',
            'scatter clouds': 'Clouds there and there, driving will be smooth and non hazardous 😁👍',
            'broken clouds': 'Clouds there and there, driving will be smooth and non hazardous 😁👍',
            'drizzle': 'Drizzle drake, WORST BEHAVIOR, lil rain 🚶‍',
            'rain': 'Slippery roads, be extra careful 😖!!',
            'thunderstorm': 'Storm is coming, might wanna reconsider your trip 😣',
            'snow': '🙅‍ Stay home, you got NETFLIX, you got HULU, STAY HOME🙅‍ !!',
            'mist': 'Misty, Slow down driving, cars might be in front of you 🧐',
        }
        return descObj[desc];
    }
}