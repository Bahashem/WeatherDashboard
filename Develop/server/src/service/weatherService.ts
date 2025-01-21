import dotenv from 'dotenv';
dotenv.config();
import dayjs, {type Dayjs} from 'dayjs';
// TODO: Define an interface for the Coordinates object
interface Coordinates{
  lat:number;
  lon: number;
  country: string;
  State: string;
  cityName: string;
}
// TODO: Define a class for the Weather object
class weather{
  date: Dayjs| string;
  icon: string;
  iconDescription: string;
  cityName: string;
  temperature: number;
  humidity: number;
  windSpeed: number;

  constructor(
    date: Dayjs| string,
    icon: string,
    iconDescription: string,
    cityName: string,
    temperature: number,
    humidity: number,
    windSpeed: number,
     ){

     this.date = date,
     this.icon = icon,
     this.iconDescription = iconDescription,
     this.cityName = cityName,
     this.temperature = temperature,
     this.humidity = humidity,
     this.windSpeed = windSpeed,  
}
}
// TODO: Complete the WeatherService class
class WeatherService {

  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string;
  private APIKey?: string;
  private name=''
  constructor(){
    this.baseURL = process.env.API_BASE_URL || '';
    this.APIKey = process.env.API_KEY || '';
  }
  
  // TODO: Create fetchLocationData method
   private async fetchLocationData(query: string) {
const response =await axios.get(`${this.baseURL}/direct`,{
  params:{
    q:query,
    limit:1,
    appid: this.APIKey,
  },
});
if (response.date.length === 0){
  throw new Error('Location not found');
}
const locationData = response.date[0];
return this.destructureLocationData(locationData);
   }

  // TODO: Create destructureLocationData method
   private destructureLocationData(locationData: Coordinates): Coordinates {
return{
  lat: locationData.lat,
  lon: locationData.lon,
  country: locationData.country,
  State: locationData.State || '',
  cityName: locationData.cityName,
};
   }
  // TODO: Create buildGeocodeQuery method
 private buildGeocod eQuery(): string {
  return `${this.baseURL}/direct?q=${city}&limit=1&appid=${this.APIKey}`;
 }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/weather?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${this.APIKey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
   private async fetchAndDestructureLocationData() {
    return await this.fetchLocationData(city);
    }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const response = await axios.get(this.buildWeatherQuery(coordinates));  
return response.data;
}

  // TODO: Build parseCurrentWeather method
   private parseCurrentWeather(response: any): Weather {
  return new Weather(
    dayjs(response.dt *1000).format('YYY-MM-DD HH:mm:ss'),
    response.weather[0].description,
    response.name,
    response.main.temp,
    response.main.hummidity,
    response.wind.windSpeed
  );
}
  // TODO: Complete buildForecastArray method
  private buildForecastArray(currentWeather: Weather, weatherData: any[]) {
    return [currentWeather, ...weatherData.map((item: any) => this.parseCurrentWeather(item))];
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    const coordinates = await this.fetchAndDestructureLocationData(city);
    const weatherData = await this.fetchWeatherData(coordinates);
    return this.parseCurrentWeather(weatherData);
  }
}

export default new WeatherService();
