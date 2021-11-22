async function getWeather(city){
    let city_name = city;
    let API_key = "bf60ef338bfccf14cce2c55ed57c435f";
    let request = new Request(`https://api.openweathermap.org/data/2.5/weather?q=${city_name}&appid=${API_key}`);

    let result = await fetch(request);

    let response = await result.json();
    /*
    data locations

    console.log(response)
    console.log(response.coord.lon)
    console.log(response.coord.lat)
    console.log(response.wind.speed)
    console.log(response.wind.deg)
    console.log(response.wind.gust)
    console.log(response.visibility)
    console.log(response.weather[0].main)
    console.log(response.weather[0].description)
    console.log(response.weather[0].icon)
    console.log(response.name)
    console.log(response.main.feels_like)
    console.log(response.main.temp)
    console.log(response.main.temp_min)
    console.log(response.main.temp_max)
    console.log(response.main.pressure)
    console.log(response.main.humidity)
    */

    pic_url = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`

    document.getElementsByTagName('span')[0].innerHTML = response.name
    document.getElementsByTagName('span')[1].innerHTML = response.coord.lat + "," + response.coord.lon
    document.getElementsByTagName('span')[2].innerHTML = response.weather[0].description
    document.getElementsByTagName('span')[3].innerHTML = `<img src=${pic_url}></img>`
    document.getElementsByTagName('span')[4].innerHTML = Math.round((parseFloat(response.main.temp) - 273.15) * 9/5 +32) + "&#8457;"
    document.getElementsByTagName('span')[5].innerHTML = Math.round((parseFloat(response.main.feels_like) - 273.15) * 9/5 +32) + "&#8457;"
    document.getElementsByTagName('span')[6].innerHTML = Math.round((parseFloat(response.main.temp_max) - 273.15) * 9/5 +32) + "&#8457;"
    document.getElementsByTagName('span')[7].innerHTML = Math.round((parseFloat(response.main.temp_min) - 273.15) * 9/5 +32) + "&#8457;"
    document.getElementsByTagName('span')[8].innerHTML = Math.round(parseFloat(response.wind.speed) * 2.2369) + "mph @"
    document.getElementsByTagName('span')[9].innerHTML = response.wind.deg + "&#176;, gusting"
    document.getElementsByTagName('span')[10].innerHTML = Math.round(parseFloat(response.wind.gust) * 2.2369) + "mph"
    document.getElementsByTagName('span')[11].innerHTML = (parseFloat(response.main.pressure)*0.02953).toFixed(2) +" inhg"
    document.getElementsByTagName('span')[12].innerHTML = response.main.humidity + "%"
    
    
    let picture = await getImage(response.weather[0].description)

    console.log(picture)
    document.body.style.backgroundImage = `url(${picture})`;
    document.body.style.backgroundSize = "cover";

    /*

    TODO: FORCAST

    let request2 = new Request(`https://api.openweathermap.org/data/2.5/forecast?q=${city_name}&appid=${API_key}`)

    let result2 = await fetch(request2)
    let response2 = await result2.json()
    console.log(response2)

    let lat = response.coord.lat
    let lon = response.coord.lon


    let request3 = new Request(`https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=current,minutely,hourly&appid=${API_key}`)

    let result3 = await fetch(request3)
    let response3 = await result3.json()
    console.log(response3)
    */

}


function getWeathers(city){
    console.log('testing')
    console.log(city)
}


// creating variable for form
const form = document.querySelector('#testDataForm')
console.log(form)

// adding event listener for submisson of form
form.addEventListener('submit',( event ) => {
    event.preventDefault()
    let city = event.path[0][0].value
    console.log(`This came from the query selector: ${city}`)
    getWeather(city)
})

function getLoc(){
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
      } else { 
        console.log("Geolocation is not supported by this browser.");
    }
}

async function showPosition(position) {
    console.log(position.coords.latitude)
    console.log(position.coords.longitude)
    
    
    let API_key = "bf60ef338bfccf14cce2c55ed57c435f";
    let request = new Request(`https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${API_key}`);
    
    let result = await fetch(request);
    
    let response = await result.json();
    console.log(response)

    pic_url = `http://openweathermap.org/img/wn/${response.weather[0].icon}@2x.png`

    document.getElementsByTagName('span')[0].innerHTML = response.name
    document.getElementsByTagName('span')[1].innerHTML = response.coord.lat + "," + response.coord.lon
    document.getElementsByTagName('span')[2].innerHTML = response.weather[0].description
    document.getElementsByTagName('span')[3].innerHTML = `<img src=${pic_url}></img>`
    document.getElementsByTagName('span')[4].innerHTML = Math.round((parseFloat(response.main.temp) - 273.15) * 9/5 +32) + "&#8457;"
    document.getElementsByTagName('span')[5].innerHTML = Math.round((parseFloat(response.main.feels_like) - 273.15) * 9/5 +32) + "&#8457;"
    document.getElementsByTagName('span')[6].innerHTML = Math.round((parseFloat(response.main.temp_max) - 273.15) * 9/5 +32) + "&#8457;"
    document.getElementsByTagName('span')[7].innerHTML = Math.round((parseFloat(response.main.temp_min) - 273.15) * 9/5 +32) + "&#8457;"
    document.getElementsByTagName('span')[8].innerHTML = Math.round(parseFloat(response.wind.speed) * 2.2369) + "mph @"
    document.getElementsByTagName('span')[9].innerHTML = response.wind.deg + "&#176;, gusting"
    document.getElementsByTagName('span')[10].innerHTML = Math.round(parseFloat(response.wind.gust) * 2.2369) + "mph"
    document.getElementsByTagName('span')[11].innerHTML = (parseFloat(response.main.pressure)*0.02953).toFixed(2) +" inhg"
    document.getElementsByTagName('span')[12].innerHTML = response.main.humidity + "%"

    

    let picture = await getImage(response.weather[0].description)

    console.log(picture)
    document.body.style.backgroundImage = `url(${picture})`;
    document.body.style.backgroundSize = "cover";
    
  }

  async function getImage(weather){
    let request = new Request(`https://api.unsplash.com/search/photos?query=${weather}&client_id=sZDR68Atv7zvkONm9sOVDBKdNhGk0ZJ8S3dyHtJ1pNw`);

    let result = await fetch(request);

    let response = await result.json();

    console.log(response)
    console.log(response.results[0].urls.regular)

    return response.results[0].links.download


  }