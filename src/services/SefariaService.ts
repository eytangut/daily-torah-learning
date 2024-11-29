import axios from 'axios';
import moment from 'moment';

const BASE_URL = 'https://www.sefaria.org/api';

export const getWeeklyParasha = async () => {
  // Get today's date in YYYY-MM-DD format
  const today = moment().format('YYYY-MM-DD');

  // Fetch calendar data for today from Sefaria API
  const calendarResponse = await axios.get(`${BASE_URL}/calendars?date=${today}`);

  // Find the calendar item that corresponds to "Parashat Hashavua"
  const parashaItem = calendarResponse.data.calendar_items.find(
    (item: any) => item.title.en === 'Parashat Hashavua'
  );


  // Check if the parasha item and its aliyot are available
  if (!parashaItem || !parashaItem.extraDetails.aliyot) {
    throw new Error('Parasha or aliyot data not found in API response');
  }

  // Determine the current day of the week (0 = Sunday, ..., 6 = Saturday)
  const dayOfWeek = moment().day();

  // Select the appropriate aliyah based on the current day of the week
  // Use Sunday's aliyah as a fallback if the current day's aliyah is not available
  const aliyah = parashaItem.extraDetails.aliyot[dayOfWeek - 1] || parashaItem.extraDetails.aliyot[0];

  // Fetch the main text of the selected aliyah from Sefaria API
  const textResponse = await axios.get(`${BASE_URL}/texts/${aliyah}`);
  const mainText = textResponse.data.he;

  // Fetch related links for the selected aliyah to find commentaries
  const relatedResponse = await axios.get(`${BASE_URL}/related/${aliyah}`);

  // Filter links to find those that are commentaries by Steinsaltz
  const commentaryRefs = relatedResponse.data.links
    .filter((link: any) => link.category === 'Commentary' && link.index_title.includes('Steinsaltz'))
    .map((link: any) => link.ref);

  // Fetch texts for each commentary reference and flatten into a single array
  const commentaryTexts = await Promise.all(
    commentaryRefs.map(async (ref: string) => {
      const response = await axios.get(`${BASE_URL}/texts/${ref}`);
      return response.data.he;
    })
  );

  // Return both main text and commentary texts
  return {
    mainText,
    commentaryTexts: commentaryTexts.flat(),
  };
};


