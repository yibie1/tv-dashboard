import axios from 'axios';
import { useAppStore } from '../../store/appStore';

// Using Open-Meteo (free, no API key needed)
const BASE_URL = 'https://api.open-meteo.com/v1/forecast';

// Addis Ababa coordinates
const ADDIS_LAT = 9.0054;
const ADDIS_LON = 38.7636;

const WMO_CODES: Record<number, string> = {
  0: 'Clear Sky',
  1: 'Mainly Clear',
  2: 'Partly Cloudy',
  3: 'Overcast',
  45: 'Foggy',
  51: 'Light Drizzle',
  61: 'Light Rain',
  63: 'Moderate Rain',
  65: 'Heavy Rain',
  80: 'Rain Showers',
  95: 'Thunderstorm',
};

export async function fetchAddisWeather() {
  try {
    const res = await axios.get(BASE_URL, {
      params: {
        latitude: ADDIS_LAT,
        longitude: ADDIS_LON,
        current_weather: true,
        hourly: 'temperature_2m,weathercode',
        timezone: 'Africa/Addis_Ababa',
      },
      timeout: 8000,
    });

    const current = res.data.current_weather;
    const condition = WMO_CODES[current.weathercode] ?? 'Unknown';

    useAppStore.getState().setWeather({
      temp: Math.round(current.temperature),
      condition,
      city: 'Addis Ababa',
    });
  } catch {
    // Silently fail — store keeps default mock data
  }
}
