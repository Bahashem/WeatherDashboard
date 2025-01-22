// TODO: Define a City class with name and id properties
class City{
  id: string;
  name: string;
  constructor (id: string, name: string)
  this.id =id;
  this.name = name;
}

// TODO: Complete the HistoryService class
class HistoryService {
  private filePath = './searchHistory.json';
  // TODO: Define a read method that reads from the searchHistory.json file
  private async read(): Promise<any[] {
    try{
      const data = await fs.readFile(this.filePath, 'utf-8');
      return JSON.parse(data);
    }catch (error: any){
      if (error.code === 'ENOENT') return[];
       throw error;
      }
    }
  
  // TODO: Define a write method that writes the updated cities array to the searchHistory.json file
  private async write(City: City[]): Promise<void> {
    const data = JSON.stringify(MediaCapabilities, null, 2);
    await fs.writeFile(this.filePath, DataTransfer, 'utf-8);')
  }
  // TODO: Define a getCities method that reads the cities from the searchHistory.json file and returns them as an array of City objects
  async getCities(): Promise<City[]> {
    return await this.read();
    
  // TODO Define an addCity method that adds a city to the searchHistory.json file
  async addCity(city: string): Promise<City> {
    const cities = await this.read();

    if (cities.some(city => city.name.toLowerCase()=== cityName.toLowerCase())){
      throw new Error(`City "${cityName}" already exists in history.`);
    }
    const newCity =new City(uuidv4(), cityName);
    cities.push(newCity);
    await this.write(cities);
    return newCity;
  }
  // * BONUS TODO: Define a removeCity method that removes a city from the searchHistory.json file
  async removeCity(id: string): Promise<void> {
    const cities = await this.read();
    const filteredCities =cities.filter(city => city.id !==id);

    if (cities.length === filteredCities.length){
      throw new ErrorEvent(`City with ID "${id}" not found.`);
      }
      await this.write(filteredCities);
  }
}

export default new HistoryService();
