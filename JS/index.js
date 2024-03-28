let locationInput = document.getElementById("location-input");

//Some variables

    //To get day number
    let currentDate = new Date();
    var dayNumb = currentDate.getDate();

    //To get month number
    var options = { month: 'long' };
    var monthName = currentDate.toLocaleString('en-US', options);

    //For user location



// Function to get weather data based on coordinates
async function fetchWeatherByCoords(latitude, longitude) {
    try {
        const response = await fetch(`http://api.weatherapi.com/v1/forecast.json?key=d749febfce4f4f11bfc173838241401&q=${latitude},${longitude}&days=3`);
        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Error fetching weather data:', error);
        return null;
    }
}

// Function to get user's location using Geolocation API
function getUserLocation() {
    return new Promise((resolve, reject) => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    reject(error);
                }
            );
        } else {
            reject(new Error('Geolocation is not supported by this browser.'));
        }
    });
}

// Update weather based on user's location
async function updateWeatherForUserLocation() {
    try {
        const { latitude, longitude } = await getUserLocation();
        const weatherData = await fetchWeatherByCoords(latitude, longitude);
        if (weatherData) {
            getCity(weatherData.location.name);
        } else {
            console.error('Weather data not available.');
        }
    } catch (error) {
        console.error('Error accessing user location:', error);
    }
}


updateWeatherForUserLocation();




locationInput.addEventListener("input", function(){

  let city = locationInput.value;
   
  getCity(city);
   
})

let days = [];
async function getCity(city){

  const response = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=d749febfce4f4f11bfc173838241401&q=${city}&days=3`);

  if(response.ok === true){

    let finalResponse = await response.json();

    
    
    let forcastDay= finalResponse.forecast.forecastday;
              
            for(let i = 0; i < forcastDay.length; i++){

                let currentDate = new Date(forcastDay[i].date);
                var options = { weekday: 'long' };
                var dayName = currentDate.toLocaleString('en-US', options);
                days.push(dayName)
               
            } 
            displayForcatsts(finalResponse, days);  
  }
  
}

function displayForcatsts(finalResponse, days){
    
  let cols = ""
  
      cols += `
            <div class="col-lg-4 first-day rounded">
            <div>
                <div class="forcast-header d-flex justify-content-between">
                    <div>${days[0]}</div>
                    <span>${dayNumb + monthName}</span>
                </div>
                <div class="forcast-conent">
                    <p class="fs-5">${finalResponse.location.name}</p>
                    <div class="degree d-flex align-items-center justify-content-around">
                        <div class="sum">
                            ${finalResponse.current.temp_c}<sub>o</sub>C
                        </div>
                        <div class="img-icon">
                            <img src="${finalResponse.current.condition.icon}" alt="" class="w-100">
                        </div>
                    </div>
                    <p class="over-cast">
                        ${finalResponse.current.condition.text}
                    </p>
                    <ul class="list d-flex justify-content-start p-0">
                        <li class="me-4">
                            <i class="fa-solid fa-umbrella"></i>
                            <span>20%</span>
                        </li>
                        <li  class="me-4">
                            <i class="fa-solid fa-wind"></i>
                            <span>18km/h</span>
                        </li>
                        <li  class="me-4">
                            <i class="fa-regular fa-compass"></i>
                            <span>East</span>
                        </li>
                    
                    </ul>
                </div>
            </div>
            
          </div>
          <div class="col-lg-4 second-day rounded text-center ">
            <div>
                <div class="forcast-header">
                    <div>${days[1]}</div>
                </div>
                <div class="forcast-conent">
                    <div class="img-icon">
                        <img src="${finalResponse.forecast.forecastday[1].day.condition.icon}" alt="" class="">
                    </div>
                    <div class="degree">
                        <div class="first-sum fs-4 fw-bold text-white">
                            ${finalResponse.forecast.forecastday[1].day.maxtemp_c}<sub>o</sub>C
                        </div>
                        <div class="second-sum">
                        ${finalResponse.forecast.forecastday[1].day.mintemp_c}<sub>o</sub>
                        </div>
                    </div>     
                    <p class="over-cast">
                    ${finalResponse.forecast.forecastday[1].day.condition.text}
                    </p>
                </div>
            </div>
            
          </div>
          <div class="col-lg-4 third-day rounded text-center ">
            <div>
                <div class="forcast-header">
                    <div>${days[2]}</div>
                </div>
                <div class="forcast-conent">
                    <div class="img-icon">
                        <img src="${finalResponse.forecast.forecastday[2].day.condition.icon}" alt="">
                    </div>
                    <div class="degree">
                        <div class="first-sum fs-4 fw-bold text-white">
                        ${finalResponse.forecast.forecastday[2].day.maxtemp_c}<sub>o</sub>C
                        </div>
                        <div class="second-sum">
                        ${finalResponse.forecast.forecastday[2].day.mintemp_c}<sub>o</sub>
                        </div>
                    </div>     
                    <p class="over-cast">
                    ${finalResponse.forecast.forecastday[2].day.condition.text}
                    </p>
                </div>
            </div>
            
          </div>
              `

    document.querySelector(".row").innerHTML = cols;
}






