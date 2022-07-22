// const axios = require('axios').default;
// import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const url = "https://restcountries.com/v3.1/all";
const tableContent = document.querySelector("#table-content")!;
// console.log("hi");

axios.get(url)
  .then(function (response) {
    // handle success
    console.log(JSON.stringify(response.data[0].name.official));
    console.log(typeof response.data)
    let data = response.data;

    // sorting
    data.sort((a, b) => b.name.official - a.name.official);
    data.sort((a, b) => {
      let fa = a.name.official.toLowerCase(),
          fb = b.name.official.toLowerCase();
  
      if (fa < fb) {
          return -1;
      } else{
          return 1;
      }
      return 0;
    });
    console.log(data[0].name.official);

    // let tag = document.createElement("div");
    // let text = document.createTextNode("Tutorix is the best e-learning platform");
    // tag.appendChild(text);
    // tableContent.appendChild(tag);

    data.forEach(function(country) {
      tableContent.insertAdjacentHTML('beforeend', 
            `<div class="table-row">
              <p id='name'>`+country.name.official+`</p>
              <p id='capitals'>`+country.capital+`</p>
              <p id='region'>`+ country.region +`</p>
              <p id='population'>`+ country.population +`</p>
              <p id='flag'>`+ country.flag +`</p>
            </div>`
        );
    })
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

