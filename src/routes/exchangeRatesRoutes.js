import express from 'express';
import ExchangeRateController from '../controllers/exchangeRateController.js';

const router = express.Router();

router.get('/', ExchangeRateController.exchangeRate);

router.get('/timeframe', ExchangeRateController.getExchangeRateTimeframe);

export default router;
