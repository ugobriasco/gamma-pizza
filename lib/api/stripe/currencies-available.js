/*
* Handling Stripe-specific restrictions
* Ref: https://stripe.com/docs/currencies
*/

// List of all the available currencies
const availableCurrencies = [
  { symbol: "AED", isEnabled: false },
  { symbol: "AFN", isEnabled: false },
  { symbol: "ALL", isEnabled: false },
  { symbol: "AMD", isEnabled: false },
  { symbol: "ANG", isEnabled: false },
  { symbol: "AOA", isEnabled: false },
  { symbol: "ARS", isEnabled: false },
  { symbol: "AUD", min_amount: 0.5, isEnabled: false },
  { symbol: "AWG", isEnabled: false },
  { symbol: "AZN", isEnabled: false },
  { symbol: "BAM", isEnabled: false },
  { symbol: "BBD", isEnabled: false },
  { symbol: "BDT", isEnabled: false },
  { symbol: "BGN", isEnabled: false },
  { symbol: "BIF", isEnabled: false },
  { symbol: "BMD", isEnabled: false },
  { symbol: "BND", isEnabled: false },
  { symbol: "BOB", isEnabled: false },
  { symbol: "BRL", min_amount: 0.5, isEnabled: false },
  { symbol: "BSD", isEnabled: false },
  { symbol: "BWP", isEnabled: false },
  { symbol: "BZD", isEnabled: false },
  { symbol: "CAD", min_amount: 0.5, isEnabled: false },
  { symbol: "CDF", isEnabled: false },
  { symbol: "CHF", min_amount: 0.5, isEnabled: false },
  { symbol: "CLP", isEnabled: false },
  { symbol: "CNY", isEnabled: false },
  { symbol: "COP", isEnabled: false },
  { symbol: "CRC", isEnabled: false },
  { symbol: "CVE", isEnabled: false },
  { symbol: "CZK", isEnabled: false },
  { symbol: "DJF", isEnabled: false },
  { symbol: "DKK", min_amount: 2.5, isEnabled: false },
  { symbol: "DOP", isEnabled: false },
  { symbol: "DZD", isEnabled: false },
  { symbol: "EGP", isEnabled: false },
  { symbol: "ETB", isEnabled: false },
  { symbol: "EUR", min_amount: 0.5, isEnabled: true },
  { symbol: "FJD", isEnabled: false },
  { symbol: "FKP", isEnabled: false },
  { symbol: "GBP", min_amount: 0.5, isEnabled: false },
  { symbol: "GEL", isEnabled: false },
  { symbol: "GIP", isEnabled: false },
  { symbol: "GMD", isEnabled: false },
  { symbol: "GNF", isEnabled: false },
  { symbol: "GTQ", isEnabled: false },
  { symbol: "GYD", isEnabled: false },
  { symbol: "HKD", min_amount: 4.0, isEnabled: false },
  { symbol: "HNL", isEnabled: false },
  { symbol: "HRK", isEnabled: false },
  { symbol: "HTG", isEnabled: false },
  { symbol: "HUF", isEnabled: false },
  { symbol: "IDR", isEnabled: false },
  { symbol: "ILS", isEnabled: false },
  { symbol: "INR", isEnabled: false },
  { symbol: "ISK", isEnabled: false },
  { symbol: "JMD", isEnabled: false },
  { symbol: "JPY", min_amount: 50, isEnabled: false },
  { symbol: "KES", isEnabled: false },
  { symbol: "KGS", isEnabled: false },
  { symbol: "KHR", isEnabled: false },
  { symbol: "KMF", isEnabled: false },
  { symbol: "KRW", isEnabled: false },
  { symbol: "KYD", isEnabled: false },
  { symbol: "KZT", isEnabled: false },
  { symbol: "LAK", isEnabled: false },
  { symbol: "LBP", isEnabled: false },
  { symbol: "LKR", isEnabled: false },
  { symbol: "LRD", isEnabled: false },
  { symbol: "LSL", isEnabled: false },
  { symbol: "MAD", isEnabled: false },
  { symbol: "MDL", isEnabled: false },
  { symbol: "MGA", isEnabled: false },
  { symbol: "MKD", isEnabled: false },
  { symbol: "MMK", isEnabled: false },
  { symbol: "MNT", isEnabled: false },
  { symbol: "MOP", isEnabled: false },
  { symbol: "MRO", isEnabled: false },
  { symbol: "MUR", isEnabled: false },
  { symbol: "MVR", isEnabled: false },
  { symbol: "MWK", isEnabled: false },
  { symbol: "MXN", min_amount: 10, isEnabled: false },
  { symbol: "MYR", isEnabled: false },
  { symbol: "MZN", isEnabled: false },
  { symbol: "NAD", isEnabled: false },
  { symbol: "NGN", isEnabled: false },
  { symbol: "NIO", isEnabled: false },
  { symbol: "NOK", min_amount: 3.0, isEnabled: false },
  { symbol: "NPR", isEnabled: false },
  { symbol: "NZD", min_amount: 0.5, isEnabled: false },
  { symbol: "PAB", isEnabled: false },
  { symbol: "PEN", isEnabled: false },
  { symbol: "PGK", isEnabled: false },
  { symbol: "PHP", isEnabled: false },
  { symbol: "PKR", isEnabled: false },
  { symbol: "PLN", isEnabled: false },
  { symbol: "PYG", isEnabled: false },
  { symbol: "QAR", isEnabled: false },
  { symbol: "RON", isEnabled: false },
  { symbol: "RSD", isEnabled: false },
  { symbol: "RUB", isEnabled: false },
  { symbol: "RWF", isEnabled: false },
  { symbol: "SAR", isEnabled: false },
  { symbol: "SBD", isEnabled: false },
  { symbol: "SCR", isEnabled: false },
  { symbol: "SEK", min_amount: 3.0, isEnabled: false },
  { symbol: "SGD", min_amount: 0.5, isEnabled: false },
  { symbol: "SHP", isEnabled: false },
  { symbol: "SLL", isEnabled: false },
  { symbol: "SOS", isEnabled: false },
  { symbol: "SRD", isEnabled: false },
  { symbol: "STD", isEnabled: false },
  { symbol: "SZL", isEnabled: false },
  { symbol: "THB", isEnabled: false },
  { symbol: "TJS", isEnabled: false },
  { symbol: "TOP", isEnabled: false },
  { symbol: "TRY", isEnabled: false },
  { symbol: "TTD", isEnabled: false },
  { symbol: "TWD", isEnabled: false },
  { symbol: "TZS", isEnabled: false },
  { symbol: "UAH", isEnabled: false },
  { symbol: "UGX", isEnabled: false },
  { symbol: "USD", min_amount: 0.5, isEnabled: false },
  { symbol: "UYU", isEnabled: false },
  { symbol: "UZS", isEnabled: false },
  { symbol: "VND", isEnabled: false },
  { symbol: "VUV", isEnabled: false },
  { symbol: "WST", isEnabled: false },
  { symbol: "XAF", isEnabled: false },
  { symbol: "XCD", isEnabled: false },
  { symbol: "XOF", isEnabled: false },
  { symbol: "XPF", isEnabled: false },
  { symbol: "YER", isEnabled: false },
  { symbol: "ZAR", isEnabled: false },
  { symbol: "ZMW", isEnabled: false }
];

// Get a single currency
const getCurrencyRules = currency => {
  const selectedCurrency = availableCurrencies.filter(
    aCurrency => aCurrency.symbol === currency.toUpperCase()
  );
  return _mapCurrencyRule(selectedCurrency[0]);
};

// Get all the currencies with isEnabled == true
const getEnabledCurrencies = () => {
  const enabledCurrencies = availableCurrencies.filter(
    aCurrency => aCurrency.isEnabled
  );
  return enabledCurrencies.map(currency => _mapCurrencyRule(currency));
};

// Remap the currency available in a consumable object, with defined specs
function _mapCurrencyRule(currencyData = {}) {
  return {
    // The symbol should be mapped to lowercase
    symbol: currencyData.symbol.toLowerCase(),
    // isEnabled defines is a currency is accepted by the app
    isEnabled: currencyData.isEnabled,
    // the base is the moltiplication factor that the amount should be moltiplied on checkout
    base: currencyData.min_amount && currencyData.min_amount < 1 ? 100 : 1,
    min_amount: currencyData.min_amount ? currencyData.min_amount : 0
  };
}

module.exports = { getCurrencyRules, getEnabledCurrencies };
