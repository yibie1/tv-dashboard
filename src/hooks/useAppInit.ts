import { useEffect } from 'react';
import { fetchAddisWeather } from '../services/weather/weatherService';

export function useAppInit() {
  useEffect(() => {
    // Fetch live weather on startup
    fetchAddisWeather();

    // Refresh weather every 10 minutes
    const interval = setInterval(fetchAddisWeather, 10 * 60 * 1000);
    return () => clearInterval(interval);
  }, []);
}
