"use strict";
// const axios = require('axios').default;
// import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
const url = "https://restcountries.com/v3.1/all";
const tableContent = document.querySelector("#table-content");
const wikipediaURL = "https://en.wikipedia.org/api/rest_v1/page/summary/";
const countriesPerPage = 25;
// I want this to be global
var currPage = 0;
var data;
axios.get(url)
    .then(function (response) {
    // handle success
    console.log(typeof response);
    data = response["data"];
    sortCountries("ASC");
    cleanData();
    displayCountries(currPage);
})
    .catch(function (error) {
    // handle error
    console.log(error);
});
function cleanData() {
    data.map((country) => {
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
let order = "ASC";
let btnToggle = document.querySelector("#btn-toggle");
btnToggle.addEventListener('click', function (e) {
    sortCountries((order === "ASC" ? "DESC" : "ASC"));
    order = (order === "ASC" ? "DESC" : "ASC");
    displayCountries(currPage);
});
function sortCountries(order) {
    if (order === "ASC") {
        // sorting
        data.sort((a, b) => b.name.official - a.name.official);
        data.sort((a, b) => {
            let fa = a.name.official.toLowerCase(), fb = b.name.official.toLowerCase();
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
        data.sort((a, b) => b.name.official - a.name.official);
        data.sort((a, b) => {
            let fa = a.name.official.toLowerCase(), fb = b.name.official.toLowerCase();
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
    for (let i = page * countriesPerPage; i < page * countriesPerPage + countriesPerPage; i++) {
        tableContent.insertAdjacentHTML('beforeend', `<div class="table-row" onclick="callModal()">
            <p id='name'>` + data[i].name.official + `</p>
            <p id='capitals'>` + data[i].capital + `</p>
            <p id='region'>` + data[i].region + `</p>
            <p id='languages'>` + data[i].languages + `</p>
            <p id='population'>` + data[i].population + `</p>
            <p id='flag'>` + data[i].flag + `</p>
          </div>`);
    }
    ;
}
let btnNext = document.querySelector("#next-page");
btnNext.addEventListener('click', function (e) {
    if (currPage < data.length / countriesPerPage - 1) {
        currPage += 1;
        displayCountries(currPage);
    }
    updatePagesButtons();
});
let btnPrevious = document.querySelector("#previous-page");
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
var callModal = function (name) {
    let modal = new tingle.modal({
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        cssClass: ['custom-class-1', 'custom-class-2'],
    });
    axios.get(wikipediaURL + name)
        .then(function (response) {
        // handle success
        modal.setContent(response.data.extract_html);
        modal.open();
    })
        .catch(function (error) {
        // handle error
        console.log(error);
    });
};
