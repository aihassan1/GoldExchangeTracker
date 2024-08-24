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

export default getGoldPrices;

// (async () => {
//   try {
//     const data = await getGoldPrices();
//     console.log(data);
//   } catch (err) {
//     console.log(err);
//   }
// })();
