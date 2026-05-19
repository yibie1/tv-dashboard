import { useState, useEffect } from 'react';
import { toEthiopian, EthiopianDate } from '../utils/ethiopianCalendar';

export interface ClockData {
  time: Date;
  hours: number;
  minutes: number;
  seconds: number;
  timeString: string;
  dateString: string;
  ethiopianDate: EthiopianDate;
  // Timezone variants
  addisTime: string;
  londonTime: string;
  dubaiTime: string;
}

export function useClock(): ClockData {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const interval = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(interval);
  }, []);

  const pad = (n: number) => String(n).padStart(2, '0');

  const formatTime = (date: Date, offsetHours: number) => {
    const d = new Date(date.getTime() + offsetHours * 3600000);
    const h = d.getUTCHours();
    const m = d.getUTCMinutes();
    const ampm = h >= 12 ? 'PM' : 'AM';
    const h12 = h % 12 || 12;
    return `${pad(h12)}:${pad(m)} ${ampm}`;
  };

  // Addis Ababa is UTC+3
  const localOffset = -time.getTimezoneOffset() / 60;
  const addisOffset = 3 - localOffset;
  const londonOffset = 0 - localOffset;
  const dubaiOffset = 4 - localOffset;

  return {
    time,
    hours: time.getHours(),
    minutes: time.getMinutes(),
    seconds: time.getSeconds(),
    timeString: `${pad(time.getHours() % 12 || 12)}:${pad(time.getMinutes())} ${time.getHours() >= 12 ? 'PM' : 'AM'}`,
    dateString: time.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
    ethiopianDate: toEthiopian(time),
    addisTime: formatTime(time, addisOffset),
    londonTime: formatTime(time, londonOffset),
    dubaiTime: formatTime(time, dubaiOffset),
  };
}
