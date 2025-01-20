import { Router, type Request, type Response } from 'express';
const router = Router();

// import HistoryService from '../../service/historyService.js';
// import WeatherService from '../../service/weatherService.js';

// TODO: POST Request with city name to retrieve weather data
router.post('/', (req: Request, res: Response) => {
  const {city} = req.body;
  if (!city){
    return res.status(400).json({error: 'City name is required'});
    }
    
  // TODO: GET weather data from city name
  try{
    const response = await axios.get(`${BASE_URL}`,{
      params:{
        q:city,
        appid: API_KEY,
        units: 'metric',
      },
    });
    
  }
  // TODO: save city to search history
  const weatherData =response.data;
 saveCityHistory(city){
  if (!searchHistory.includes(city)){
    searchHistory.push(city);
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    renderSearchHistory();
      }
}
// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {});

export default router;
res.status(200).json(weatherData);
  } catch (error: any) {
    res.status(error.response?.status || 500).json({
      error: 'Failed to fetch weather data',
      details: error.message,
    });
  }
});