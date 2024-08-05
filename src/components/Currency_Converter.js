import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './Currency_Converter.css';
const CurrencyConverter = () => {
  const [currencies, setCurrencies] = useState([]);
  const [baseCurrency, setBaseCurrency] = useState('USD');
  const [targetCurrency, setTargetCurrency] = useState('EUR');
  const [amount, setAmount] = useState(1);
  const [convertedAmount, setConvertedAmount] = useState(0);

  useEffect(() => {
    fetchCurrencies();
  }, []);

  const fetchCurrencies = async () => {
    try {
      const response = await axios.get('https://api.exchangerate-api.com/v4/latest/USD');
      setCurrencies(Object.keys(response.data.rates));
    } catch (error) {
      console.error('Error fetching currency data:', error);
    }
  };

  const convertCurrency = async () => {
    try {
      const response = await axios.get(`https://api.exchangerate-api.com/v4/latest/${baseCurrency}`);
      const rate = response.data.rates[targetCurrency];
      setConvertedAmount(amount * rate);
    } catch (error) {
      console.error('Error converting currency:', error);
    }
  };

  return (
    <div className="currency-converter">
      <h1>Currency Converter</h1>
      <div>
        <label>Base Currency:</label>
        <select value={baseCurrency} onChange={(e) => setBaseCurrency(e.target.value)}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Target Currency:</label>
        <select value={targetCurrency} onChange={(e) => setTargetCurrency(e.target.value)}>
          {currencies.map((currency) => (
            <option key={currency} value={currency}>
              {currency}
            </option>
          ))}
        </select>
      </div>
      <div>
        <label>Amount:</label>
        <input
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
      </div>
      <button onClick={convertCurrency}>Convert</button>
      {convertedAmount > 0 && (
        <div>
          <h2>
            {amount} {baseCurrency} = {convertedAmount.toFixed(2)} {targetCurrency}
          </h2>
        </div>
      )}
    </div>
  );
};

export default CurrencyConverter;
