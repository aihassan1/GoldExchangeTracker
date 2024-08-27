# Exchange Rate and Gold Price API

## Overview

This API provides current and historical exchange rates for USD to EGP, as well as gold prices in EGP. It leverages Google Cloud's Vertex AI for data analysis, offering valuable insights into currency and gold price trends.

## Features

- Real-time USD to EGP exchange rates
- Historical USD to EGP exchange rate data
- Current gold prices in EGP (24k, 21k, 18k)
- Historical gold price data in EGP
- AI-powered analysis using Vertex AI

## Prerequisites

- Node.js (v14+)
- npm
- Google Cloud account with Vertex AI enabled
- API keys for Metal Price API and Gold API

### Endpoint Details

1. **Current Exchange Rate**

- URL: `/exchange-rate`
- Response: Current USD to EGP exchange rate

2. **Historical Exchange Rates**

- URL: `/exchange-rate/timeframe`
- Query Params:
  - `start_date`: Start date (YYYY-MM-DD)
  - `end_date`: End date (YYYY-MM-DD)
- Response: USD to EGP rates for the specified period

3. **Current Gold Prices**

- URL: `/gold-prices`
- Response: Current prices for 24k, 21k, and 18k gold in EGP

4. **Historical Gold Prices**

- URL: `/gold-prices/timeframe`
- Query Params:
  - `start_date`: Start date (YYYY-MM-DD)
  - `end_date`: End date (YYYY-MM-DD)
- Response: Gold prices in EGP for the specified period

## AI Analysis

Each response includes an AI-powered analysis provided by Vertex AI, offering:

- Overall trend analysis
- Current market direction
- Key observations
- Future price predictions
- Confidence level of predictions

## Error Handling

The API implements robust error handling for scenarios such as:

- Missing or invalid parameters
- API failures
- Invalid date ranges
