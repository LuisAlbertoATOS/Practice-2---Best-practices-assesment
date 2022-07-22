"use strict";
exports.__esModule = true;
var axios = require('axios')["default"];
// import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
var tingle = require("tingle.js");
var url = "https://restcountries.com/v3.1/all";
var tableContent = document.querySelector("#table-content");
var wikipediaURL = "https://en.wikipedia.org/api/rest_v1/page/summary/";
var countriesPerPage = 25;
// I want this to be global
var currPage = 0;
var data;
var callModal = function (name) {
    var modal = new tingle.modal({
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        cssClass: ['custom-class-1', 'custom-class-2']
    });
    axios.get(wikipediaURL + name)
        .then(function (response) {
        // handle success
        modal.setContent(response.data.extract_html);
        modal.open();
    })["catch"](function (error) {
        // handle error
        console.log(error);
    });
};
axios.get(url)
    .then(function (response) {
    // handle success
    console.log(typeof response);
    data = response["data"];
    sortCountries("ASC");
    cleanData();
    displayCountries(currPage);
})["catch"](function (error) {
    // handle error
    console.log(error);
});
function cleanData() {
    data.map(function (country) {
        if (country.capital === undefined) {
            country.capital = "No capital";
        }
        if (!country.languages) {
            country.languages = "No language to display";
        }
        else {
            country.languages = Object.values(country.languages);
        }
    });
}
var order = "ASC";
var btnToggle = document.querySelector("#btn-toggle");
btnToggle.addEventListener('click', function (e) {
    sortCountries((order === "ASC" ? "DESC" : "ASC"));
    order = (order === "ASC" ? "DESC" : "ASC");
    displayCountries(currPage);
});
function sortCountries(order) {
    if (order === "ASC") {
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
        });
    }
    else {
        // sorting
        data.sort(function (a, b) { return b.name.official - a.name.official; });
        data.sort(function (a, b) {
            var fa = a.name.official.toLowerCase(), fb = b.name.official.toLowerCase();
            if (fa < fb) {
                return 1;
            }
            else {
                return -1;
            }
        });
    }
}
function displayCountries(page) {
    tableContent.innerHTML = "";
    for (var i = page * countriesPerPage; i < page * countriesPerPage + countriesPerPage; i++) {
        tableContent.insertAdjacentHTML('beforeend', "<div onclick=\"callModal(".concat(data[i].name.official, ")\" >\n            <p id='name'>") + data[i].name.official + "</p>\n            <p id='capitals'>" + data[i].capital + "</p>\n            <p id='region'>" + data[i].region + "</p>\n            <p id='languages'>" + data[i].languages + "</p>\n            <p id='population'>" + data[i].population + "</p>\n            <p id='flag'>" + data[i].flag + "</p>\n          </div>");
    }
    ;
}
var btnNext = document.querySelector("#next-page");
btnNext.addEventListener('click', function (e) {
    if (currPage < data.length / countriesPerPage - 1) {
        currPage += 1;
        displayCountries(currPage);
    }
    updatePagesButtons();
});
var btnPrevious = document.querySelector("#previous-page");
btnPrevious.addEventListener('click', function (e) {
    if (currPage >= 0) {
        currPage -= 1;
        displayCountries(currPage);
    }
    updatePagesButtons();
});
function updatePagesButtons() {
    btnPrevious.disabled = (currPage === 0) ? true : false;
    btnNext.disabled = (currPage === data.length / countriesPerPage - 1) ? true : false;
}
function sum(a, b) {
    console.log(a + b);
}
