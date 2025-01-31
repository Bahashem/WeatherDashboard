// TODO: Define a City class with name and id properties
import fs from "node:fs/promises";
import { v4 as uuidv4 } from "uuid";
class City {
  id: string;
  name: string;
  constructor(id: string, name: string) {
    this.id = id;
    this.name = name;
  }
}

// TODO: Complete the HistoryService class
class HistoryService {
  private filePath = "./searchHistory.json";
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<City[]> {
    try {
      const data = await fs.readFile(this.filePath, "utf-8");
      return JSON.parse(data);
    } catch (error: any) {
      if (error.code === "ENOENT") return [];
      throw error;
    }
  }

  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(data: City[]): Promise<void> {
    await fs.writeFile(this.filePath, JSON.stringify(data, null, 2));
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    return this.read();
  }
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(cityName: string): Promise<void> {
    const cities = await this.read();
    if (
      cities.some((city) => city.name.toLowerCase() === cityName.toLowerCase())
    ) {
      throw new Error("City already exists in history.");
    }
    cities.push({ id: uuidv4(), name: cityName });
    await this.write(cities);
  }

  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string): Promise<void> {
    const cities = await this.read();
    const filteredCities = cities.filter((city) => city.id !== id);

    if (cities.length === filteredCities.length) {
      throw new ErrorEvent(`City not found.`);
    }
    await this.write(filteredCities);
  }
}

export default new HistoryService();
