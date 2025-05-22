
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Receipt, ShoppingCart, Coffee, Car, Home, Briefcase } from "lucide-react";

export const TransactionList = () => {
  const transactions = [
    {
      id: 1,
      type: "expense",
      amount: 45.67,
      description: "Lunch at Italian Restaurant",
      category: "Food",
      date: "2024-01-15",
      icon: Coffee,
      color: "orange"
    },
    {
      id: 2,
      type: "income",
      amount: 2500.00,
      description: "Client Payment - Website Design",
      category: "Business",
      date: "2024-01-14",
      icon: Briefcase,
      color: "green"
    },
    {
      id: 3,
      type: "expense",
      amount: 89.99,
      description: "Office Supplies",
      category: "Business",
      date: "2024-01-13",
      icon: ShoppingCart,
      color: "blue"
    },
    {
      id: 4,
      type: "expense",
      amount: 120.00,
      description: "Gas Station",
      category: "Transportation",
      date: "2024-01-12",
      icon: Car,
      color: "purple"
    },
    {
      id: 5,
      type: "income",
      amount: 1800.00,
      description: "Freelance Project Payment",
      category: "Business",
      date: "2024-01-11",
      icon: Briefcase,
      color: "green"
    }
  ];

  return (
    <Card className="hover:shadow-lg transition-all duration-200">
      <CardHeader>
        <CardTitle className="flex items-center space-x-2">
          <Receipt className="w-5 h-5 text-purple-600" />
          <span>Recent Transactions</span>
        </CardTitle>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[300px]">
          <div className="space-y-4">
            {transactions.map((transaction, index) => (
              <div 
                key={transaction.id}
                className="flex items-center space-x-4 p-3 rounded-lg hover:bg-gray-50 transition-colors animate-fade-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                  transaction.color === 'orange' ? 'bg-orange-100' :
                  transaction.color === 'green' ? 'bg-green-100' :
                  transaction.color === 'blue' ? 'bg-blue-100' : 'bg-purple-100'
                }`}>
                  <transaction.icon className={`w-5 h-5 ${
                    transaction.color === 'orange' ? 'text-orange-600' :
                    transaction.color === 'green' ? 'text-green-600' :
                    transaction.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                  }`} />
                </div>
                
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {transaction.description}
                  </p>
                  <div className="flex items-center space-x-2 mt-1">
                    <Badge variant="secondary" className="text-xs">
                      {transaction.category}
                    </Badge>
                    <span className="text-xs text-gray-500">{transaction.date}</span>
                  </div>
                </div>
                
                <div className="text-right">
                  <p className={`font-semibold ${
                    transaction.type === 'income' ? 'text-green-600' : 'text-red-600'
                  }`}>
                    {transaction.type === 'income' ? '+' : '-'}${transaction.amount.toFixed(2)}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
};
