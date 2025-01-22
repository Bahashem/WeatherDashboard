import { response, Router, type Request, type Response } from 'express';
import HistoryService from '../../service/historyService.js';
import WeatherService from '../../service/weatherService.js';

const router = Router();

// TODO: POST Request with city name to retrieve weather data
router.post ('/', async (req: Request, res: Response) => {
  try{
    const city = req.body.cityName;
    if (!city){
      return res.status(400).json({error: 'City name is required'});
    }
    
  // TODO: GET weather data from city name
  
     const weatherData= await WeatherService.getWeatherForCity(city);
 
      // TODO: save city to search history
      await HistoryService.addCity(city);
     res.status(200).json(weatherData);
     catch (error: any) {
      res.status(500).json ({error: error.message});
    }
    });
  
}
// TODO: GET search history
router.get('/history', async (req: Request, res: Response) => {
try{
  const cities = await HistoryService.getCities();
  res.status(200).json(cities);
}catch(error:any){
  res.status(500).json({ error: error.message});
}
});

// * BONUS TODO: DELETE city from search history
router.delete('/history/:id', async (req: Request, res: Response) => {
  try{
    const {id} = req.params;
    await HistoryService.removeCity(id);
    res.status(200).json({ messagge:`City with ID ${id} was removed from history.`});
  } catch (error: any){
    res.status(500).json({error: error.message});
  }
  });

export default router;
