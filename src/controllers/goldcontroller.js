import AIAnalysis from '../services/AIAnalysisService.js';
import {
  getGoldPrices,
  getGoldPricesTimeframe,
} from '../services/getGoldPrices.js';

class GoldController {
  static async getGoldPrices(req, res) {
    try {
      const goldPrices = await getGoldPrices();
      res.json(goldPrices);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch gold prices' });
    }
  }

  static async getGoldPricesTimeframe(req, res) {
    try {
      const start_date = req.query.start_date;
      const end_date = req.query.end_date;

      if (!start_date || !end_date) {
        return res
          .status(400)
          .json({ error: 'Missing start_date or end_date' });
      }
      const goldPrices = await getGoldPricesTimeframe(start_date, end_date);
      const analysis = await AIAnalysis.analyzeData(goldPrices, 'goldPrices');
      console.log(analysis);
      res.status(200).json({ goldPrices, analysis });
    } catch (err) {
      console.log(err);
      res.status(500).json({
        error: 'Failed to fetch gold prices by timeframe',
        details: err.message,
      });
    }
  }
}

export default GoldController;
