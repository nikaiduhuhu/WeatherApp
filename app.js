window.addEventListener('load', ()=>{
    let long;
    let lat;
    let temperatureDescription = document.querySelector(".temperature-description");
    let temperatureDegree = document.querySelector(".temperature-degree");
    let locationTimezone = document.querySelector(".location-timezone");
    let temperatureSection = document.querySelector(".temperature");
    const temperatureSpan = document.querySelector(".temperature span");

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            long = position.coords.longitude;
            lat = position.coords.latitude;

            const api = 'http://api.openweathermap.org/data/2.5/weather?q=Tokyo&appid=1b3ea949f6459934795b1aabeb613e5a';
            fetch(api)
                .then(response => {
                    return response.json();
                })
                .then(data => {
                    
                    const { temp } = data.main;
                    const { main } = data.weather[0];
                    // console.log(data);
                    //set DOM from the API

                    tempC = temp - 273.15;
                    tempF = tempC * (9/5) + 32;
                    temperatureDegree.textContent = Math.floor(tempC);
                    temperatureDescription.textContent = data.weather[0].description;
                    locationTimezone.textContent = data.name;
                    //set Icon
                    setIcons(main, document.querySelector(".icon"));

                    //Change temperature to C/F
                    temperatureSection.addEventListener('click', ()=>{
                        if(temperatureSpan.textContent == "(F)"){
                            temperatureSpan.textContent = "(C)";
                            temperatureDegree.textContent = Math.floor(tempC);
                        }else{
                            temperatureSpan.textContent = "(F)";
                            temperatureDegree.textContent = Math.floor(tempF);
                        }
                    });
                }); 
        });
    }

    function setIcons(icon, iconID){
        const skycons = new Skycons({color: "white"});
        if(icon == "Clouds")icon = "cloudy";

        // console.log(icon);
        skycons.play();
        return skycons.set(iconID, icon);
    }
});