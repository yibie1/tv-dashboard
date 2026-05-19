/**
 * Ethiopian Calendar (Ge'ez Calendar) utilities
 * Ethiopian calendar has 13 months: 12 months of 30 days + Pagume (5 or 6 days)
 */

export const ETH_MONTHS = [
  'መስከረም', // Meskerem
  'ጥቅምት',  // Tikimt
  'ህዳር',   // Hidar
  'ታህሳስ',  // Tahsas
  'ጥር',    // Tir
  'የካቲት',  // Yekatit
  'መጋቢት',  // Megabit
  'ሚያዚያ',  // Miyazia
  'ግንቦት',  // Ginbot
  'ሰኔ',    // Sene
  'ሐምሌ',   // Hamle
  'ነሐሴ',   // Nehase
  'ጳጉሜ',   // Pagume
];

export const ETH_DAYS = ['እሑድ', 'ሰኞ', 'ማክሰኞ', 'ረቡዕ', 'ሐሙስ', 'ዓርብ', 'ቅዳሜ'];

export const ETH_NUMBERS: Record<number, string> = {
  1: '፩', 2: '፪', 3: '፫', 4: '፬', 5: '፭',
  6: '፮', 7: '፯', 8: '፰', 9: '፱', 10: '፲',
  11: '፲፩', 12: '፲፪', 13: '፲፫', 14: '፲፬', 15: '፲፭',
  16: '፲፮', 17: '፲፯', 18: '፲፰', 19: '፲፱', 20: '፳',
  21: '፳፩', 22: '፳፪', 23: '፳፫', 24: '፳፬', 25: '፳፭',
  26: '፳፮', 27: '፳፯', 28: '፳፰', 29: '፳፱', 30: '፴',
};

export interface EthiopianDate {
  year: number;
  month: number;
  day: number;
  monthName: string;
  dayName: string;
  formatted: string;
}

/**
 * Convert Gregorian date to Ethiopian date
 */
export function toEthiopian(date: Date): EthiopianDate {
  const jdn = gregorianToJDN(date.getFullYear(), date.getMonth() + 1, date.getDate());
  const { year, month, day } = jdnToEthiopian(jdn);
  const dayOfWeek = date.getDay();

  return {
    year,
    month,
    day,
    monthName: ETH_MONTHS[month - 1] || '',
    dayName: ETH_DAYS[dayOfWeek],
    formatted: `${ETH_NUMBERS[day] || day} ${ETH_MONTHS[month - 1]} ${year}`,
  };
}

function gregorianToJDN(year: number, month: number, day: number): number {
  const a = Math.floor((14 - month) / 12);
  const y = year + 4800 - a;
  const m = month + 12 * a - 3;
  return day + Math.floor((153 * m + 2) / 5) + 365 * y +
    Math.floor(y / 4) - Math.floor(y / 100) + Math.floor(y / 400) - 32045;
}

function jdnToEthiopian(jdn: number): { year: number; month: number; day: number } {
  const r = (jdn - 1723856) % 1461;
  const n = r % 365 + 365 * Math.floor(r / 1460);
  const year = 4 * Math.floor((jdn - 1723856) / 1461) + Math.floor(r / 365) - Math.floor(r / 1460);
  const month = Math.floor(n / 30) + 1;
  const day = (n % 30) + 1;
  return { year, month, day };
}

export function getEthiopianHolidays(): Array<{ name: string; month: number; day: number }> {
  return [
    { name: 'ጥምቀት', month: 5, day: 11 },       // Timkat
    { name: 'ፋሲካ', month: 8, day: 29 },         // Easter (approx)
    { name: 'ቅዱስ ዮሐንስ', month: 1, day: 1 },    // Enkutatash
    { name: 'መስቀል', month: 1, day: 17 },        // Meskel
    { name: 'ገና', month: 4, day: 29 },           // Genna (Christmas)
    { name: 'ጾመ ነቢያት', month: 4, day: 15 },    // Advent fast
  ];
}

export function getFastingPeriods(): Array<{ name: string; description: string }> {
  return [
    { name: 'ጾመ ሐዋርያት', description: 'የሐዋርያት ጾም' },
    { name: 'ጾመ ፍልሰታ', description: 'የፍልሰታ ጾም' },
    { name: 'ጾመ ነቢያት', description: 'የነቢያት ጾም' },
    { name: 'ጾመ ድጓ', description: 'ዓቢይ ጾም' },
  ];
}
