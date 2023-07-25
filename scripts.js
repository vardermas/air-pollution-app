async function getAirPollutionData(placeName) {
    try {
      const API_KEY_YANDEX = '5373a31d-a473-4f75-b208-aadd5f315b95';
      const API_URL_GEO_DATA = `https://geocode-maps.yandex.ru/1.x/?apikey=${API_KEY_YANDEX}&geocode=${placeName}&format=json`;
  
      console.log('Fetching geolocation data...');
      const geoDataResponse = await fetch(API_URL_GEO_DATA);
      const geoData = await geoDataResponse.json();
      console.log('Geolocation data:', geoData);
  
      const coordinates = geoData.response.GeoObjectCollection.featureMember[0].GeoObject.Point.pos.split(' ');
      const latitude = coordinates[1]; // Широта
      const longitude = coordinates[0]; // Долгота
  
      console.log('Latitude:', latitude);
      console.log('Longitude:', longitude);
  
      if (latitude && longitude) {
        const API_KEY_OPENWEATHERMAP = 'dcc4d5f3ed8c42987e77cc6d21ca362a';
        const API_URL_WEATHER = `https://api.openweathermap.org/data/2.5/air_pollution?appid=${API_KEY_OPENWEATHERMAP}&lat=${latitude}&lon=${longitude}`;
  
        console.log('Fetching air pollution data...');
        const airDataResponse = await fetch(API_URL_WEATHER);
        const airData = await airDataResponse.json();
        console.log('Air pollution data:', airData);
  
        if (airData && airData.list && airData.list.length > 0) {
          const pollution = airData.list[0].components;
          const airPollutionDiv = document.getElementById('air-pollution');
          airPollutionDiv.innerHTML = `Время: ${new Date(airData.list[0].dt * 1000)}, PM10: ${pollution.pm10}, PM2.5: ${pollution.pm2_5}`;
        } else {
          console.log('Данные о загрязнении воздуха недоступны или возвращены некорректно.');
        }
      } else {
        console.log('Координаты не найдены.');
      }
    } catch (error) {
      console.error('Произошла ошибка:', error);
    }
  }
  
  const placeName = prompt('Введите название города:');
  getAirPollutionData(placeName);
  