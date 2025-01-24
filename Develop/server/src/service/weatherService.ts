import dotenv from 'dotenv';
dotenv.config();
import dayjs, {type Dayjs} from 'dayjs';
// TODO: Define an interface for the Coordinates object
interface Coordinates{
  lat:number;
  lon: number;
 
}
// TODO: Define a class for the Weather object
class Weather{
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

     this.date = date;
     this.icon = icon;
     this.iconDescription = iconDescription;
     this.cityName = cityName;
     this.temperature = temperature;
     this.humidity = humidity;
     this.windSpeed = windSpeed;  
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
const response =await fetch(query);

const locationData = await response.json();
return this.destructureLocationData(locationData[0]);
   }

  // TODO: Create destructureLocationData method
   private destructureLocationData(locationData: Coordinates): Coordinates {
return{
  lat: locationData.lat,
  lon: locationData.lon,
  };
   }
  // TODO: Create buildGeocodeQuery method
 private buildGeocodeQuery(): string {
  return `${this.baseURL}/geo/1.0/direct?q=${this.name}&limit=1&appid=${this.APIKey}`;
 }
  // TODO: Create buildWeatherQuery method
  private buildWeatherQuery(coordinates: Coordinates): string {
    return `${this.baseURL}/data/2.5/forecast?lat=${coordinates.lat}&lon=${coordinates.lon}&units=metric&appid=${this.APIKey}`;
  }
  // TODO: Create fetchAndDestructureLocationData method
   private async fetchAndDestructureLocationData() {
    return await this.fetchLocationData(this.buildGeocodeQuery());
    }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const response = await fetch(this.buildWeatherQuery(coordinates)); 
    let data=response.json() 
return data;
}

  // TODO: Build parseCurrentWeather method
   private parseCurrentWeather(response: any): Weather {
  return new Weather(
    dayjs(response.dt *1000).format('YYY-MM-DD HH:mm:ss'),
    response.weather[0].icon,
    response.weather[0].description,
    this.name,
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
    this.name=city
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = await this.parseCurrentWeather(weatherData);
    return this.buildForecastArray(currentWeather,weatherData);
  }
}

export default new WeatherService();
