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
          document.getElementById("gif").src ="videos/gif2.gif"
          document.getElementById("text").innerHTML = "if you need account !, click in Create"
          switch_log.style.transition = "0.8s"
          switch_log.style.transform = "translateX(100%)"
          switch_log.style.background = "#0a0a0a"
          switch_log.style.borderRadius = "0px"
          switch_log.style.borderTopRightRadius = "25px"
          switch_log.style.borderBottomRightRadius = "25px"
          this.innerHTML = "Create";
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
  "New York",
  "Paris",
  "London",
  "Tokyo", 
  "Berlin", 
  "Rome", 
  "Sydney", 
  "Moscow", 
  "Los Angeles", 
  "Beni Mellal"
];
const apiKey = 'b4865ee9d796cdba2a29ff974402d665';
let lat = null;
let lon = null;
let dataCity = [];
let ar = [];
const namecity = "agadir";

function one(){
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
        }).then(weatherData => {
             dataCity = weatherData;
             console.log(dataCity);

        }).catch(error => {
          console.error('ُerror in return data:', error);
        });
    } else {
      console.error('lat or lon of the city undefinde',error);
    }
  }).catch(error => {
    console.error('error in search of city;', error);
  });

  setTimeout(function(){
    console.log(dataCity);
 },1000)
}
// one();

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
    console.log(data);
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

