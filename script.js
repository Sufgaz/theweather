$(document).ready(function () {
    //OpenWeatherMap API key
    const apiKey = '6ba3c11c0b5f3f3af090135e1c336ac8';
    const queryURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  
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
});