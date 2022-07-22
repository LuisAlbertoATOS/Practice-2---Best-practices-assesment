// const axios = require('axios').default;
// import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
var url = "https://restcountries.com/v3.1/all";
var tableContent = document.querySelector("#table-content");
var wikipediaURL = "https://en.wikipedia.org/api/rest_v1/page/summary/";
// I want this to be global
var currPage = 0;
var data;
axios.get(url)
    .then(function (response) {
    // handle success
    data = response.data;
    sortCountries("ASC");
    displayCountries(currPage);
})["catch"](function (error) {
    // handle error
    console.log(error);
});
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
            return 0;
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
    for (var i = page * 25; i < page * 25 + 25; i++) {
        tableContent.insertAdjacentHTML('beforeend', "<div class=\"table-row\">\n            <p id='name'>" + data[i].name.official + "</p>\n            <p id='capitals'>" + data[i].capital + "</p>\n            <p id='region'>" + data[i].region + "</p>\n            <p id='population'>" + data[i].population + "</p>\n            <p id='flag'>" + data[i].flag + "</p>\n          </div>");
    }
    ;
}
var btnNext = document.querySelector("#next-page");
btnNext.addEventListener('click', function (e) {
    if (currPage < data.length / 25 - 1) {
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
    btnNext.disabled = (currPage === data.length / 25 - 1) ? true : false;
}
var tableSelect = document.querySelector("#table-content");
tableSelect.addEventListener('click', function (e) {
    var modal = new tingle.modal({
        closeMethods: ['overlay', 'button', 'escape'],
        closeLabel: "Close",
        cssClass: ['custom-class-1', 'custom-class-2']
    });
    var country, element = e.target;
    if (element.tagName.toLowerCase() === 'p') {
        element = element.parentNode;
    }
    country = element.querySelector("p").innerHTML;
    axios.get(wikipediaURL + country)
        .then(function (response) {
        // handle success
        modal.setContent(response.data.extract_html);
        modal.open();
    })["catch"](function (error) {
        // handle error
        console.log(error);
    });
});
