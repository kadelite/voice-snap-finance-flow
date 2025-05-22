
import React, { createContext, useState, useContext, ReactNode } from 'react';

// Define available currencies with their symbols and codes
export type CurrencyOption = {
  code: string;
  symbol: string;
  name: string;
};

export const CURRENCIES: CurrencyOption[] = [
  { code: 'USD', symbol: '$', name: 'US Dollar' },
  { code: 'EUR', symbol: '€', name: 'Euro' },
  { code: 'GBP', symbol: '£', name: 'British Pound' },
  { code: 'JPY', symbol: '¥', name: 'Japanese Yen' },
  { code: 'INR', symbol: '₹', name: 'Indian Rupee' },
  { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar' },
  { code: 'AUD', symbol: 'A$', name: 'Australian Dollar' },
  { code: 'CHF', symbol: 'Fr', name: 'Swiss Franc' },
  { code: 'NGN', symbol: '₦', name: 'Nigerian Naira' },
];

// Context type definition
type CurrencyContextType = {
  selectedCurrency: CurrencyOption;
  setSelectedCurrency: (currency: CurrencyOption) => void;
  formatAmount: (amount: number) => string;
};

const CurrencyContext = createContext<CurrencyContextType>({
  selectedCurrency: CURRENCIES[0],
  setSelectedCurrency: () => {},
  formatAmount: () => '',
});

export const useCurrency = () => useContext(CurrencyContext);

export const CurrencyProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [selectedCurrency, setSelectedCurrency] = useState<CurrencyOption>(CURRENCIES[0]);

  // Function to format amounts with the selected currency symbol
  const formatAmount = (amount: number): string => {
    return `${selectedCurrency.symbol}${amount.toFixed(2)}`;
  };

  return (
    <CurrencyContext.Provider value={{ selectedCurrency, setSelectedCurrency, formatAmount }}>
      {children}
    </CurrencyContext.Provider>
  );
};
