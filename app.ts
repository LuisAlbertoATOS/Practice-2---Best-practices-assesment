// const axios = require('axios').default;
// import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";

const url:string = "https://restcountries.com/v3.1/all";
const tableContent:Element = document.querySelector("#table-content")!;

// I want this to be global
var currPage=0;
var data:Object[]; 

axios.get(url)
  .then(function (response) {
    // handle success
    data = response.data;
    sortCountries("ASC");
    displayCountries(currPage);
  })
  .catch(function (error) {
    // handle error
    console.log(error);
  });

let order = "ASC";
let btnToggle = document.querySelector("#btn-toggle")!;
btnToggle.addEventListener('click', function(e){
    sortCountries((order==="ASC"?"DESC":"ASC"));
    order = (order==="ASC"?"DESC":"ASC")
    displayCountries(currPage);
});

function sortCountries(order:"ASC"|"DESC"){
  if(order === "ASC"){
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
  } else{
    // sorting
    data.sort((a, b) => b.name.official - a.name.official);
    data.sort((a, b) => {
      let fa = a.name.official.toLowerCase(),
          fb = b.name.official.toLowerCase();

      if (fa < fb) {
          return 1;
      } else{
          return -1;
      }
    });
  }
}

function displayCountries(page:number){
  tableContent.innerHTML="";
  for(let i=page*25; i<page*25+25;i++) {
    tableContent.insertAdjacentHTML('beforeend', 
          `<div class="table-row">
            <p id='name'>`+data[i].name.official+`</p>
            <p id='capitals'>`+data[i].capital+`</p>
            <p id='region'>`+ data[i].region +`</p>
            <p id='population'>`+ data[i].population +`</p>
            <p id='flag'>`+ data[i].flag +`</p>
          </div>`
      );
  };
}

let btnNext = document.querySelector("#next-page")!;
btnNext.addEventListener('click', function(e){
  if(currPage < data.length/25-1){
    currPage += 1;
    displayCountries(currPage);
  }
  updatePagesButtons();
});

let btnPrevious = document.querySelector("#previous-page")!;
btnPrevious.addEventListener('click', function(e){
  if(currPage >= 0){
    currPage -= 1;
    displayCountries(currPage);
  }
  updatePagesButtons();
});

function updatePagesButtons(){
  btnPrevious.disabled = (currPage === 0) ? true:false;
  btnNext.disabled = (currPage === data.length/25-1) ? true:false;
}
