import {getExchangeRate} from '../services/getExchangeRate.js';
class ExchangeRateController {
  static async exchangeRate(req, res) {
    try {
      const exchangeRate = await getExchangeRate();
      res.status(200).json(exchangeRate);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }
}

export default ExchangeRateController;
