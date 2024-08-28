import {
  getExchangeRate,
  getExchangeRateTimeframe,
} from '../services/getExchangeRate.js';
import AIAnalysis from '../services/AIAnalysisService.js';
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

  static async getExchangeRateTimeframe(req, res) {
    const start_date = req.query.start_date;
    const end_date = req.query.end_date;
    if (!start_date || !end_date) {
      return res.status(500).json({ error: 'Missing start_date or end_date' });
    }

    try {
      const exchangeRates = await getExchangeRateTimeframe(
        start_date,
        end_date
      );
      const AI_Analysis = await AIAnalysis.analyzeData(
        exchangeRates,
        'exchangeRates'
      );

      return res.status(200).json({ exchangeRates, AI_Analysis });
    } catch (err) {
      console.log(err);
      return res.status(500).json({
        error: 'error fetching the exchange rate per time frame',
        details: err.message,
      });
    }
  }
}

export default ExchangeRateController;
