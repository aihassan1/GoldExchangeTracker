import express from 'express';
import exchangeRateRoutes from './routes/exchangeRatesRoutes.js';
import goldPricesRoutes from './routes/goldPricesRoutes.js';
import dotenv from 'dotenv';
import path from 'path';
import { fileURLToPath } from 'url';
dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();

app.use((req, res, next) => {
  console.log(`${req.method}  ${req.url}`);
  next();
});

app.use(express.json());
app.use(express.static(path.join(__dirname, '../public')));

// Routes
app.use('/exchange-rate', exchangeRateRoutes);
app.use('/gold-prices', goldPricesRoutes);

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

export default app;
