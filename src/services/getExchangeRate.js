import https from 'https';
import dotenv from 'dotenv';

dotenv.config();

// date format yyyy-mm-dd
const currentDate = new Date().toISOString().split('T')[0];

async function getExchangeRate(date = null) {
  // GETS exchange rate for a specific date

  const METAL_PRICE_API_KEY = process.env.METAL_PRICE_API_KEY;

  const path = date
    ? `/v1/${date}?api_key=${METAL_PRICE_API_KEY}&base=USD&currencies=EGP`
    : `/v1/latest?api_key=${METAL_PRICE_API_KEY}&base=USD&currencies=EGP`;

  const options = {
    hostname: 'api.metalpriceapi.com',
    path: path,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  return new Promise((resolve, reject) => {
    const request = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data += chunk;
      });

      res.on('end', () => {
        if (res.statusCode >= 200 && res.statusCode < 300) {
          try {
            const parsedData = JSON.parse(data);

            const exchangeRate = parsedData.rates.EGP;
            resolve(parsedData);
          } catch (err) {
            reject(new Error('Exchange rate api Failed to parse API response'));
          }
        } else {
          reject(new Error(`API request failed with status ${res.statusCode}`));
        }
      });
    });

    request.on('error', (err) => {
      reject(err);
    });

    request.end();
  });
}

async function getExchangeRateTimeframe(start_date, end_date) {
  // get the exchange rate for a time frame that is less than 6 days

  const METAL_PRICE_API_KEY = process.env.METAL_PRICE_API_KEY;

  if (!start_date || !end_date) {
    throw new Error('start_date or end_date are missing');
  }
  const start = new Date(start_date);
  const end = new Date(end_date);
  const timeDiff = Math.abs(end - start);
  const timeDiffInDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  if (timeDiffInDays > 5) {
    throw new Error('Time frame has to be less than 5 days');
  }

  const path = `/v1/timeframe?api_key=${METAL_PRICE_API_KEY}&start_date=${start_date}&end_date=${end_date}&base=USD&currencies=EGP`;

  const options = {
    hostname: 'api.metalpriceapi.com',
    path: path,
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  };

  
  return new Promise((resolve, reject) => {
    const request = https.request(options, (res) => {
      let data = '';

      res.on('data', (chunk) => {
        data = data + chunk;
      });

      res.on('end', () => {
        const parsedData = JSON.parse(data);

        resolve(parsedData);
      });
      res.on('error', (err) => {
        reject(err);
      });
    });
    request.end();
  });
}

export { getExchangeRate, getExchangeRateTimeframe };

// (async () => {
//   try {
//     const exchangeRate = await getExchangeRate();
//     console.log(exchangeRate);
//   } catch (err) {
//     console.error('Error fetching exchange rate:', err.message);
//   }
// })();

// getExchangeRateTimeframe('2024-04-22', '2024-04-27')
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));
