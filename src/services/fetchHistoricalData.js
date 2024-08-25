import axios from 'axios';
import dotenv from 'dotenv';

dotenv.config();

const API_KEY = 'cf4a917f5c66370e025baf8558df75ee'; // Ensure this is set in your .env file
const START_DATE = '2021-04-22';
const END_DATE = '2021-04-23';
const BASE = 'EGP';
const CURRENCIES = 'USD';

const url = `https://api.metalpriceapi.com/v1/timeframe?api_key=${API_KEY}&start_date=${START_DATE}&end_date=${END_DATE}&base=${BASE}&currencies=${CURRENCIES}`;

async function fetchHistoricalData() {
  try {
    const response = await axios.get(url);
    console.log(response.data);
  } catch (error) {
    console.error('Error fetching data:', error);
  }
}

fetchHistoricalData();
