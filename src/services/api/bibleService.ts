/**
 * Bible service — fetches daily verse
 * Uses bible-api.com (free, no key needed)
 */
import axios from 'axios';

export interface BibleVerse {
  reference: string;
  text: string;
  translation: string;
}

// Curated daily verses (Ethiopian Orthodox canon)
const DAILY_VERSES = [
  'John 3:16',
  'Psalm 23:1',
  'Isaiah 40:31',
  'Philippians 4:13',
  'Romans 8:28',
  'Jeremiah 29:11',
  'Matthew 5:16',
  'Proverbs 3:5',
];

export async function fetchDailyVerse(): Promise<BibleVerse | null> {
  const dayIndex = new Date().getDay();
  const reference = DAILY_VERSES[dayIndex];

  try {
    const encoded = encodeURIComponent(reference);
    const res = await axios.get(`https://bible-api.com/${encoded}`, { timeout: 6000 });
    return {
      reference: res.data.reference,
      text: res.data.text?.trim() ?? '',
      translation: res.data.translation_name ?? 'KJV',
    };
  } catch {
    return null;
  }
}
