const api={
    key: "fde354c051dac6cf2090be419b2d7487",
    base:"https://api.openweathermap.org/data/2.5/"
}
const search=document.querySelector(".search");
const btn=document.querySelector(".btn");
btn.addEventListener("click",getInput);


function getInput(event){
    event.preventDefault();

    if(event.type=="click"){
        getData(search.value);
        console.log(search.value);
        }

}
function getData(){
    fetch(`${api.base}weather?q=${search.value}&units=metric&appid=${api.key}`)
    .then(response =>{
        return response.json();
    }).then(displayData);

}
function displayData(response){
      console.log(response);

    if(response.cod === "404")
    {
        const error=document.querySelector(".error");
        error.textContent="Please enter the correct city";

        //to clear the search field
        search.value="";
    }
    else{

        const city=document.querySelector(".city");
        city.innerText=`${response.name},${response.sys.country}`;

        const today=new Date();
        const date=document.querySelector(".date");
        date.innerHTML=dateFunction(today);

        const temp=document.querySelector(".temp");
        temp.innerHTML=`Temp:${Math.round(response.main.temp)} <span>°C</span>`

        const weather= document.querySelector(".weather");
        weather.innerText=`Weather:${response.weather[0].main}`;

        const tempRange= document.querySelector(".temp-range");
        tempRange.innerText=`Temp Range:${Math.round(response.main.temp_min)}°C/${Math.round(response.main.temp_max)}°C`;

        const weathericon=document.querySelector(".weather-icon");

        const iconurl="http://openweathermap.org/img/w/";
        weathericon.src=iconurl  + response.weather[0].icon+ ".png";

        search.value="";

        const feelsLike=document.querySelector(".Feels-Like");
        feelsLike.innerHTML=`Feels Like: ${Math.round(response.main.feels_like)}<span>°C</span>`;


    }
}
function dateFunction(d){
    let months=["Jan","Feb","Mar","Apr","May","June","July","Aug","Sep","Oct","Nov","Dec"];
    let days=["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"];

    let day=days[d.getDay()];
    let date=d.getDate();
    let month=months[d.getMonth()];
    let year=d.getFullYear();

    return `${day} ,${date},${month},${year}`;
}