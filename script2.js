document.addEventListener("DOMContentLoaded", () => {
    const searchBtn = document.getElementById("search-btn");
    const cityInput = document.getElementById("city");
    const resultDiv = document.getElementById("result");
  
    searchBtn.addEventListener("click", () => {
      const city = cityInput.value;
      const apiKey = "69a21346532d3420306c5bbd4e14f6c0";
      const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
      resultDiv.style.display ='block';
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          const temp = data.main.temp;
          const humidity = data.main.humidity;
          const windSpeed = data.wind.speed;
          const pressure = data.main.pressure;
          const weatherDescription = data.weather[0].description;
          const timeUtc = data.dt;
  
          // Get the local time based on the UTC time and city's longitude
          const lon = data.coord.lon;
          const timeOffset = data.timezone;
          const localTime = new Date((timeUtc + timeOffset) * 1000);
  
          const iconCode = data.weather[0].icon;
          const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
          const iconImg = document.createElement("img");
          iconImg.src = iconUrl;
  
          // Create and update top div
          const topDiv = document.getElementById("top");
          topDiv.innerHTML = "";
          const tempSpan = document.createElement("span");
          tempSpan.textContent = `${temp} °C`;
          topDiv.appendChild(iconImg);
          topDiv.appendChild(tempSpan);


          //position weather span
          const citySpan = document.getElementById("weatherDes");
          citySpan.textContent = `${city}, ${weatherDescription}`;
          citySpan.style.fontWeight = "bold";


  
          // Create and update bottom div
          const bottomDiv = document.getElementById("bottom");
          bottomDiv.innerHTML = "";
          const humiditySpan = document.createElement("span");
          humiditySpan.textContent = `Humidity ${humidity}%`;
          bottomDiv.appendChild(humiditySpan);
          const windSpeedSpan = document.createElement("span");
          windSpeedSpan.textContent = `Wind Speed ${windSpeed} m/s`;
          bottomDiv.appendChild(windSpeedSpan);
          const pressureSpan = document.createElement("span");
          pressureSpan.textContent = `Pressure ${pressure} hPa`;
          bottomDiv.appendChild(pressureSpan);
          const localTimeSpan = document.createElement("span");
          localTimeSpan.textContent = `Local Time ${localTime.toLocaleTimeString()}`;
          bottomDiv.appendChild(localTimeSpan);
  

  
          
        })
        .catch((error) => console.log(error));
    });
  });
  