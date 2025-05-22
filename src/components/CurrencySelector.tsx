
import React from 'react';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { CurrencyOption, CURRENCIES, useCurrency } from '@/contexts/CurrencyContext';
import { 
  DollarSign, 
  Euro, 
  PoundSterling, 
  JapaneseYen, 
  IndianRupee,
  SwissFranc
} from 'lucide-react';

export const CurrencySelector = () => {
  const { selectedCurrency, setSelectedCurrency } = useCurrency();

  // Map currency codes to Lucide icons
  const getCurrencyIcon = (code: string) => {
    switch (code) {
      case 'USD':
      case 'CAD':
      case 'AUD':
        return <DollarSign className="w-4 h-4" />;
      case 'EUR':
        return <Euro className="w-4 h-4" />;
      case 'GBP':
        return <PoundSterling className="w-4 h-4" />;
      case 'JPY':
        return <JapaneseYen className="w-4 h-4" />;
      case 'INR':
        return <IndianRupee className="w-4 h-4" />;
      case 'CHF':
        return <SwissFranc className="w-4 h-4" />;
      default:
        return <DollarSign className="w-4 h-4" />;
    }
  };

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" size="sm" className="border-gray-300 hover:bg-gray-50 flex items-center gap-2">
          {getCurrencyIcon(selectedCurrency.code)}
          <span>{selectedCurrency.code}</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="bg-white">
        {CURRENCIES.map((currency: CurrencyOption) => (
          <DropdownMenuItem 
            key={currency.code}
            onClick={() => setSelectedCurrency(currency)}
            className="cursor-pointer flex items-center gap-2"
          >
            {getCurrencyIcon(currency.code)}
            <span>{currency.name} ({currency.symbol})</span>
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
