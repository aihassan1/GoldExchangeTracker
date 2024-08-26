import https from 'https';
import dotenv from 'dotenv';
// get gold prices in EGP in the current day

dotenv.config();

const GOLD_API_TOKEN = process.env.GOLD_API_TOKEN;

async function getGoldPrices() {
  const options = {
    hostname: 'www.goldapi.io',
    path: '/api/XAU/EGP',
    method: 'GET',
    headers: {
      'x-access-token': GOLD_API_TOKEN,
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
        try {
          const parsedData = JSON.parse(data);
          // console.log(JSON.parse(data));

          const selected_gold_prices = {
            price_gram_24k: parsedData.price_gram_24k,
            price_gram_21k: parsedData.price_gram_21k,
            price_gram_18k: parsedData.price_gram_18k,
          };
          resolve(selected_gold_prices);
        } catch (err) {
          reject(err);
        }
      });

      res.on('error', (err) => {
        reject(err);
      });
    });

    request.on('error', (err) => {
      reject(err);
    });

    request.end();
  });
}

async function getGoldPricesTimeframe(start_date, end_date) {
  // get the exchange rate for a time frame that is less than 6 days

  const METAL_PRICE_API_KEY = process.env.METAL_PRICE_API_KEY;

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toISOString().split('T')[0];
  };

  start_date = formatDate(start_date);
  end_date = formatDate(end_date);

  const start = new Date(start_date);
  const end = new Date(end_date);
  const timeDiff = Math.abs(end - start);
  const timeDiffInDays = Math.ceil(timeDiff / (1000 * 60 * 60 * 24));
  if (timeDiffInDays > 5) {
    throw new Error('Time frame has to be less than 5 days');
  }

  const path = `/v1/timeframe?api_key=${METAL_PRICE_API_KEY}&start_date=${start_date}&end_date=${end_date}&base=XAU&currencies=EGP`;

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
        // Troy Ounce: Weighs 31.1035 grams.
        const parsedData = JSON.parse(data);
        const processedRates = {};
        for (const [date, rates] of Object.entries(parsedData.rates)) {
          processedRates[date] = {};
          processedRates[date].EGP = (rates.EGP / 31.1035).toFixed(2);
        }

        resolve(processedRates);
      });
      res.on('error', (err) => {
        reject(err);
      });
    });
    request.end();
  });
}

export { getGoldPrices, getGoldPricesTimeframe };

// (async () => {
//   try {
//     const data = await getGoldPrices();
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// })();

// getGoldPricesTimeframe('2024-04-22', '2024-04-27')
//   .then((data) => console.log(data))
//   .catch((error) => console.error(error));
