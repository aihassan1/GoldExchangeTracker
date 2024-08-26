import express from 'express';
import GoldController from '../controllers/goldcontroller.js';

const router = express.Router();

router.get('/', GoldController.getGoldPrices);

router.get('/timeframe', GoldController.getGoldPricesTimeframe);

export default router;
