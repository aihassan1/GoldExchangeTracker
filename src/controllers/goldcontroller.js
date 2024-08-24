import { getGoldPrices } from '../services/getGoldPrices';

class GoldController {
  static async getGoldPrices(req, res) {
    try {
      const goldPrices = await getGoldPrices();
      res.json(goldPrices);
    } catch (err) {
      res.status(500).json({ error: 'Failed to fetch gold prices' });
    }
  }
}

export default GoldController;
