$(document).ready(function () {
    //OpenWeatherMap API key
    const apiKey = '6ba3c11c0b5f3f3af090135e1c336ac8';
  
    //Event listener for the search form
    $('#search-form').submit(function (event) {
      event.preventDefault();
    
      //Get the city name from the input field
    const cityName = $('#search-input').val();

    //Clear the input field
    $('#search-input').val('');

    //Function to get weather data
    getWeather(cityName, apiKey);
    });

  // Fetch function for API request
  function getWeather(city, apiKey) {
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

    fetch(queryURL)
      .then(response => {
        if (response.ok) {
          return response.json();
        } else {
          throw new Error('Request failed');
        }
      })
      .then(response => {
        // Display today's weather
        displayTodayWeather(response);

        // Call the function to get the 5-day forecast
        getForecast(city, apiKey);
      })
      .catch(error => {
        // Handle any errors
        console.log(error);
      });
  }
   // Function to display today's weather information
   function displayTodayWeather(weatherData) {
    // Update the HTML to display the weather information
    $('#today').html(`
      <h2>${weatherData.name}, ${weatherData.sys.country}</h2>
      <p>${dayjs().format('MMMM D, YYYY')}</p>
      <p>Temperature: ${weatherData.main.temp}°C</p>
      <p>Humidity: ${weatherData.main.humidity}%</p>
      <p>Weather: ${weatherData.weather[0].description}</p>
    `);
  }
  //Function to display 5 day forcast
  function getForecast(city, apiKey) {
    const forecastURL = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`;
  //
    fetch(forecastURL)
      .then(response => response.json())
      .then(forecastData => {
        displayForecast(forecastData);
      })
      .catch(error => {
        console.log('Error:', error);
      });
      // Function to display the 5-day forecast
  function displayForecast(forecastData) {
    $('#forecast').empty();

    for (let i = 0; i < forecastData.list.length; i += 8) {
      const forecast = forecastData.list[i];

      $('#forecast').append(`
        <div class="col-md-2">
          <h4>${dayjs(forecast.dt_txt).format('MMM D')}</h4>
          <p>Temp: ${forecast.main.temp}°C</p>
          <p>Humidity: ${forecast.main.humidity}%</p>
          <p>Weather: ${forecast.weather[0].description}</p>
        </div>
      `);
  }}}});