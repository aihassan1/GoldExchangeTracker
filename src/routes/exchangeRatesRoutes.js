import express from 'express';
import ExchangeRateController from '../controllers/exchangeRateController.js';

const router = express.Router();

router.get('/', ExchangeRateController.exchangeRate);

export default router;
