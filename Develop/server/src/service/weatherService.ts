import dotenv from "dotenv";
dotenv.config();
import dayjs, { type Dayjs } from "dayjs";
// TODO: Define an interface for the Coordinates object
interface Coordinates {
  lat: number;
  lon: number;
}
// TODO: Define a class for the Weather object
class Weather {
  date: Dayjs | string;
  icon: string;
  iconDescription: string;
  city: string;
  tempF: number;
  humidity: number;
  windSpeed: number;

  constructor(
    date: Dayjs | string,
    icon: string,
    iconDescription: string,
    city: string,
    tempF: number,
    humidity: number,
    windSpeed: number
  ) {
    this.date = date;
    this.icon = icon;
    this.iconDescription = iconDescription;
    this.city = city;
    this.tempF = tempF;
    this.humidity = humidity;
    this.windSpeed = windSpeed;
  }
}
// TODO: Complete the WeatherService class
class WeatherService {
  // TODO: Define the baseURL, API key, and city name properties
  private baseURL?: string;
  private APIKey?: string;
  private name = "";
  constructor() {
    this.baseURL = process.env.API_BASE_URL || "";
    this.APIKey = process.env.API_KEY || "";
  }

  // TODO: Create fetchLocationData method
  private async fetchLocationData(query: string) {
    try {
      const response: Coordinates[] = await fetch(query).then((res) =>
        res.json()
      );

      return response[0];
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // TODO: Create destructureLocationData method
  private destructureLocationData(locationData: Coordinates): Coordinates {
    return {
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
    return await this.fetchLocationData(this.buildGeocodeQuery()).then((data) =>
      this.destructureLocationData(data)
    );
  }
  // TODO: Create fetchWeatherData method
  private async fetchWeatherData(coordinates: Coordinates) {
    const response = await fetch(this.buildWeatherQuery(coordinates));
    let data = response.json();
    return data;
  }

  // TODO: Build parseCurrentWeather method
  private parseCurrentWeather(data: any): Weather {
    console.log(data);
    return new Weather(
      dayjs.unix(data.list[0].dt).format("YYYY-MM-DD"),
      data.list[0].weather[0].icon,
      data.list[0].weather[0].description,
      this.name,
      data.list[0].main.temp,
      data.list[0].main.humidity,
      data.list[0].wind.speed
    );
  }
  // TODO: Complete buildForecastArray method
  private buildForecastArray(
    currentWeather: Weather,
    forcastData: any[]
  ): Weather[] {
    let forcastArray: Weather[] = [currentWeather];
    let filteredArray = forcastData.filter((item: any) => {
      return item.dt_txt.includes("12:00:00");
    });
    filteredArray.map((item: any) => {
      forcastArray.push(
        new Weather(
          dayjs.unix(item.dt).format("YYYY-MM-DD"),
          item.weather[0].icon,
          item.weather[0].description,
          this.name,
          item.main.temp,
          item.main.humidity,
          item.wind.speed
        )
      );
    });
    return forcastArray;
  }
  // TODO: Complete getWeatherForCity method
  async getWeatherForCity(city: string) {
    this.name = city;
    const coordinates = await this.fetchAndDestructureLocationData();
    const weatherData = await this.fetchWeatherData(coordinates);
    const currentWeather = this.parseCurrentWeather(weatherData);
    return this.buildForecastArray(currentWeather, weatherData.list);
  }
}

export default new WeatherService();
