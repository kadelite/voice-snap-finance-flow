
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, TrendingDown, DollarSign, Calendar } from "lucide-react";

export const QuickStats = () => {
  const stats = [
    {
      title: "Total Income",
      value: "$12,450",
      change: "+12.5%",
      trend: "up",
      icon: TrendingUp,
      color: "green"
    },
    {
      title: "Total Expenses",
      value: "$8,320",
      change: "-5.2%",
      trend: "down",
      icon: TrendingDown,
      color: "red"
    },
    {
      title: "Net Profit",
      value: "$4,130",
      change: "+8.1%",
      trend: "up",
      icon: DollarSign,
      color: "blue"
    },
    {
      title: "This Month",
      value: "45 transactions",
      change: "+3 from last month",
      trend: "up",
      icon: Calendar,
      color: "purple"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {stats.map((stat, index) => (
        <Card 
          key={index} 
          className="hover:shadow-lg transition-all duration-200 hover:scale-105 animate-fade-in"
          style={{ animationDelay: `${index * 100}ms` }}
        >
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600 mb-1">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900">{stat.value}</p>
                <p className={`text-sm mt-1 flex items-center ${
                  stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                }`}>
                  {stat.trend === 'up' ? (
                    <TrendingUp className="w-4 h-4 mr-1" />
                  ) : (
                    <TrendingDown className="w-4 h-4 mr-1" />
                  )}
                  {stat.change}
                </p>
              </div>
              <div className={`w-12 h-12 rounded-lg flex items-center justify-center ${
                stat.color === 'green' ? 'bg-green-100' :
                stat.color === 'red' ? 'bg-red-100' :
                stat.color === 'blue' ? 'bg-blue-100' : 'bg-purple-100'
              }`}>
                <stat.icon className={`w-6 h-6 ${
                  stat.color === 'green' ? 'text-green-600' :
                  stat.color === 'red' ? 'text-red-600' :
                  stat.color === 'blue' ? 'text-blue-600' : 'text-purple-600'
                }`} />
              </div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};
