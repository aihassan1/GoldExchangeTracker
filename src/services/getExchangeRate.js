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
            resolve(exchangeRate);
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

export default getExchangeRate;

// (async () => {
//   try {
//     const exchangeRate = await getExchangeRate();
//     console.log(exchangeRate);
//   } catch (err) {
//     console.error('Error fetching exchange rate:', err.message);
//   }
// })();
