function switching(){
  let switch_log =document.getElementById("switch-login");
  document.getElementById("gif").src ="videos/gif2.gif"
          document.getElementById("text").innerHTML = "if you need account !, click in Create"
          switch_log.style.transition = "0.8s"
          switch_log.style.transform = "translateX(100%)"
          switch_log.style.background = "#0a0a0a"
          switch_log.style.borderRadius = "0px"
          switch_log.style.borderTopRightRadius = "25px"
          switch_log.style.borderBottomRightRadius = "25px"
          document.querySelector(".sing").innerHTML = "Create";
}


function change(){
  document.getElementById("section-wrapper-account").style.display = "block"
  let switch_log =document.getElementById("switch-login");
  let checked = true;
  let close = document.getElementById("close");
  close.addEventListener("click", ()=>{
      document.getElementById("section-wrapper-account").style.display = "none"
  });

  document.querySelector(".sing").addEventListener('click',function(){
      if(checked === true){
          switching();
          checked = false;
      }else{
          document.getElementById("text").innerHTML = "if you have account !, click in Login"
          document.getElementById("gif").src ="videos/gif1.gif"
          switch_log.style.transition = "0.8s"
          switch_log.style.transform = "translateX(0%)"
          switch_log.style.background = "#222"
          switch_log.style.borderRadius = "0px"
          switch_log.style.borderTopLeftRadius = "25px"
          switch_log.style.borderBottomLeftRadius = "25px"
          this.innerHTML = "Login";
          checked = true;
      }
  });
}
const ArryOfCreateAccount =[];
const cities = [
  "Beni Mellal",
  "New York",
  "Paris",
  "London",
  "Tokyo", 
  "Berlin", 
  "Rome", 
  "Sydney", 
  "Moscow", 
  "Los Angeles"
];
const apiKey = 'b4865ee9d796cdba2a29ff974402d665';
let lat = null;
let lon = null;
let check = false;

function one(){
  const namecity = document.getElementById("search").value.trim();

  const apiUrlName = `http://api.openweathermap.org/geo/1.0/direct?q=${namecity}&limit=5&appid=${apiKey}`;
   fetch(apiUrlName)
  .then(res => {
    return res.json();
  }).then(data => {
    
    if (data.length > 0) {
      lat = data[0].lat;
      lon = data[0].lon;

const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;      
fetch(apiUrl)
        .then(response => {
          return response.json();
        }).then(dataWeather => {
          showCity(dataWeather)
          let latC = dataWeather.coord.lat;
          let lonC = dataWeather.coord.lon;
          console.log(latC , lonC);
          check = true;
          
            getMap(latC , lonC)
             
        }).catch(error => {
          console.error('ُerror in return data:', error);
        });
    } else {
      console.error('lat or lon of the city undefinde',error);
    }
  }).catch(error => {
    console.error('error in search of city;', error);
    alert("this city not find")
  });
}

 function showCity(dataWeather){
  const data = dataWeather;
  const dt = timee(dataWeather);
    document.getElementById("city-name").innerHTML =
    `
         <h3 id="icon-position"><img src="icons/location-sign.png" width="16px"></h3>
        <h1>${dataWeather.name},<span> ${dataWeather.sys.country}</span></h1>
    `;
    document.getElementById("card-city").innerHTML = 
    `
                            <div class="header-card-city">
                                <h2 id="day">${dt.sunriseDateS}</h2>
                                <h2 id="time">${dt.sunsetDate}</h2>
                            </div>
                            <div class="body-card-city">
                                <h1>${(dataWeather.main.temp - 273.15).toFixed(2)}°</h1>
                                <img src="${getIcon(data)}" width="50px" alt="">
                            </div>
                            <div class="footer-card-city">
                                <div>
                                    <h3>sp : <span >${dataWeather.wind.speed}km</span></h3>
                                    <h3>hum : <span >${dataWeather.main.humidity}%</span></h3>
                                </div>
                                <div>
                                    <h3>sunrise : <span id="speed">${dt.sunriseTime}</span></h3>
                                    <h3>sunset : <span id="speed">${dt.sunsetTime}</span></h3>
                                </div>
                            </div>
    `
}

// this scetion for get 10 cities //
async function getLonLat(name){
      const url = `http://api.openweathermap.org/geo/1.0/direct?q=${name}&limit=5&appid=${apiKey}`;
      const res = await fetch(url);
      const data = await res.json();
      const {lat , lon} = await data[0]
      return {lat , lon};
      
}
async function getCities(lat , lon){
  const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;    
  const response = await fetch(apiUrl);
  const data = response.json();
  return data;
}
async function tenCities(){
  for(const name of cities){
    const {lat , lon} = await getLonLat(name);
    const data = await getCities(lat , lon);
    getCard(data)
}
}
tenCities();

  function getIcon(data){
    if(data.weather[0].main === "Clouds"){
      return "/3d weather icons/sun/cloud.png";
    }
    else if(data.weather[0].main === "Rain"){
      return "/3d weather icons/sun/rain.png";
    }
    else if(data.weather[0].main === "Snow"){
      return "/3d weather icons/sun/snow.png";
    }
    else if(data.weather[0].main === "Clear"){
      return "/3d weather icons/sun/clear.png";
    }

}
async function getCard(data){
  document.querySelector(".section-wrapper-all").innerHTML +=
  `
                          <div class="card">
                            <div class="card-text">
                                <p>${data.sys.country}</p>
                                <h3>${data.name}</h3>
                                <h4>${data.weather[0].main}</h4>
                            </div>
                            <div class="card-icon">
                                <img src="${getIcon(data)}" width="60px" alt="">
                                <p>${(data.main.temp - 273.15).toFixed(2)+ " °"}</p>
                            </div>
                        </div>
  `
}

function timee(dataWeather){
const sysData = {country: dataWeather.country, sunrise: dataWeather.sys.sunrise, sunset: dataWeather.sys.sunset};

const sunriseDate = new Date(sysData.sunrise * 1000 ); 
const sunriseTimeString = sunriseDate.toLocaleTimeString();
const sunriseDateString = sunriseDate.toLocaleDateString(undefined, { weekday: 'long' });

const sunsetDate = new Date(sysData.sunset * 1000); 
const sunsetTimeString = sunsetDate.toLocaleTimeString();
const sunsetDateString = sunsetDate.toLocaleDateString();

const allDate ={
  sunriseTime : sunriseTimeString,
  sunriseDateS :sunriseDateString,
  sunsetTime : sunsetTimeString,
  sunsetDate : sunsetDateString
}
    return allDate;
}


let map; 
function getMap(latC, lonC) {
  if (map) {
    map.remove();
  }

  if (!check) {
    map = L.map('map').setView([47.6038 , -122.3301], 13);
  } else {
    map = L.map('map').setView([latC, lonC], 13);
  }

  L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    maxZoom: 19,
    attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
  }).addTo(map);
}
getMap();



// Create account section
document.querySelector(".create").addEventListener("click", () => {
  createAccount();
});

const acountT = []; 
function createAccount() {
  const c_Uname = document.getElementById("c-username").value.trim().toUpperCase();
  const Email = document.getElementById("c-email").value.trim().toUpperCase();
  const c_password = document.getElementById("c-userpassword").value.trim().toUpperCase();

  if(c_Uname == "" || Email == "" || c_password == ""){
    alert("Please fill out all fields")
  }
  else{
    const account = {
      full_name: c_Uname,
      email: Email,
      password: c_password
    };
  
    acountT.push(account);
    localStorage.setItem("userData", JSON.stringify(acountT));
    progressBar();
    switching();
  }
}

// Login section
function login() {
  const userName = document.getElementById("username").value.trim().toUpperCase();
  const userPassword = document.getElementById("userpassword").value.trim().toUpperCase();

  const storedAccounts = JSON.parse(localStorage.getItem("userData")) || [];

  for (let i = 0; i < storedAccounts.length; i++) {
    if ((userName === storedAccounts[i].full_name || userName === storedAccounts[i].email) &&
        userPassword === storedAccounts[i].password) {
      alert("The account is good !");
      document.getElementById("section-wrapper-account").style.transition = "0.9s"
      document.getElementById("section-wrapper-account").style.transform = "translateX(1400px)"
      setTimeout(()=>{
        document.getElementById("section-wrapper-account").style.display = "none"
        document.getElementById("section-wrapper-weather").style.display = "flex"
      },700)
      return; 
    }
  }
  alert("Enter the correct password or email")
}

function progressBar() {
  document.querySelector(".alert").style.display = "flex"
  let con = 0;
  let prog = document.getElementById("prog");
  const setT = setInterval(() => {
    con += 10;
    prog.style.width = con + "%"
    prog.style.transition = ".8s"

    if (con >= 101) {
      stopTime();
      document.querySelector(".alert").style.display = "none"
    }
  }, 200);

  function stopTime() {
    clearInterval(setT);
  }
}


