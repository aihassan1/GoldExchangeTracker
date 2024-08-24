import express from 'express';
import exchangeRateRoutes from './routes/exchangeRatesRoutes.js';
import goldPricesRoutes from './routes/goldPricesRoutes.js';
import dotenv from 'dotenv';

dotenv.config();

const app = express();

app.use(express.json());

console.log('GOLD_API_TOKEN:', process.env.GOLD_API_TOKEN);


// Routes
app.use('/exchange-rate', exchangeRateRoutes);
app.use('/gold-prices', goldPricesRoutes);
export default app;
