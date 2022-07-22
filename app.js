// const axios = require('axios').default;
// import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
var url = "https://restcountries.com/v3.1/all";
var tableContent = document.querySelector("#table-content");
// console.log("hi");
axios.get(url)
    .then(function (response) {
    // handle success
    console.log(JSON.stringify(response.data[0].name.official));
    console.log(typeof response.data);
    var data = response.data;
    // sorting
    data.sort(function (a, b) { return b.name.official - a.name.official; });
    data.sort(function (a, b) {
        var fa = a.name.official.toLowerCase(), fb = b.name.official.toLowerCase();
        if (fa < fb) {
            return -1;
        }
        else {
            return 1;
        }
        return 0;
    });
    console.log(data[0].name.official);
    // let tag = document.createElement("div");
    // let text = document.createTextNode("Tutorix is the best e-learning platform");
    // tag.appendChild(text);
    // tableContent.appendChild(tag);
    data.forEach(function (country) {
        tableContent.insertAdjacentHTML('beforeend', "<div class=\"table-row\">\n              <p id='name'>" + country.name.official + "</p>\n              <p id='capitals'>" + country.capital + "</p>\n              <p id='region'>" + country.region + "</p>\n              <p id='population'>" + country.population + "</p>\n              <p id='flag'>" + country.flag + "</p>\n            </div>");
    });
})["catch"](function (error) {
    // handle error
    console.log(error);
});
