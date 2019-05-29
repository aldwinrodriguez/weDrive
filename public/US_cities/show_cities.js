import notDup from "./not_duplicated_cities.js";
import dup from "./duplicated_cities.js";
let keys = Object.keys(notDup);

function cap(str) {
    return (str ? str.toLowerCase() : str).replace(/(?:^|\s)\S/g, function (a) {
        return a.toUpperCase();
    });
};
$(function () {
    $('#from, #to').keyup(function (e) {
        $('div#cityList ul').empty();
        let input = cap(this.value);
        if (input.length >= 2) {

            keys.forEach(element => {
                if (element.indexOf(input) >= 0) {
                    let el = '<li> ' + element + ' </li>';
                    $('div#cityList ul').append(el);
                }
            })

            dup.forEach(element => {
                if (element.name.indexOf(input) >= 0) {
                    let el = '<li> ' + element.name + ' </li>';
                    $('div#cityList ul').append(el);
                }
            })
        }
    })
});