const ArryOfCreateAccount =[];
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
const apiKey = 'b4865ee9d796cdba2a29ff974402d665';
let lat = null;
let lon = null;

const namecity = "agadir";
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
          console.log(weatherData);
        }).catch(error => {
          console.error('ُerror in return data:', error);
        });
    } else {
      console.error('lat or lon of the city undefinde',error);
    }
  }).catch(error => {
    console.error('error in search of city;', error);
  });



  

// const apiKey = 'b4865ee9d796cdba2a29ff974402d665'; 
// let lat = null; 
// let lon = null;

// let namecity = "tadla"
// const apiUrlName = `http://api.openweathermap.org/geo/1.0/direct?q=${namecity},{state code},{country code}&limit=5&appid=${apiKey}`;
// const apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&appid=${apiKey}`;

// fetch(apiUrl)
//   .then(response => {
//     return response.json();
//   }).then(data => {
//         console.log(data);
//   }).catch(error => {
//     console.error('Error de conixion', error);
//   });

// fetch(apiUrlName)
//   .then(res => {
//     return res.json();
//   }).then(data => {
//         lat = data.lat;
//         lon = data.lon;
//   }).catch(error => {
//     console.error('Error de conixion', error);
//   });
