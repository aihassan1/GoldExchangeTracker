import { getExchangeRate } from '../services/getExchangeRate';

class ExchangeRateController {
  static async exchangeRate(req, res) {
    const exchangeRate = await getExchangeRate();
    
  }
}
