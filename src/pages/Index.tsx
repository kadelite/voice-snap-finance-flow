
import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Camera, Plus, TrendingUp, TrendingDown, DollarSign, Receipt } from "lucide-react";
import { VoiceInput } from "@/components/VoiceInput";
import { PhotoCapture } from "@/components/PhotoCapture";
import { TransactionList } from "@/components/TransactionList";
import { FinancialChart } from "@/components/FinancialChart";
import { QuickStats } from "@/components/QuickStats";
import { AddTransactionModal } from "@/components/AddTransactionModal";

const Index = () => {
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const [showPhotoCapture, setShowPhotoCapture] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {/* Header */}
      <div className="bg-white/80 backdrop-blur-sm border-b border-gray-200 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-blue-600 to-green-600 rounded-xl flex items-center justify-center">
                <DollarSign className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-900">FinanceTracker</h1>
                <p className="text-sm text-gray-600">Smart Business Finance</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-3">
              <Button
                onClick={() => setShowVoiceInput(true)}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white transition-all duration-200 hover:scale-105"
                size="sm"
              >
                <Mic className="w-4 h-4 mr-2" />
                Voice
              </Button>
              
              <Button
                onClick={() => setShowPhotoCapture(true)}
                variant="outline"
                className="border-gray-300 hover:bg-gray-50 transition-all duration-200 hover:scale-105"
                size="sm"
              >
                <Camera className="w-4 h-4 mr-2" />
                Photo
              </Button>
              
              <Button
                onClick={() => setShowAddModal(true)}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white transition-all duration-200 hover:scale-105"
                size="sm"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Quick Stats */}
        <QuickStats />
        
        {/* Chart and Recent Transactions */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <FinancialChart />
          <TransactionList />
        </div>
        
        {/* Action Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 bg-gradient-to-br from-blue-50 to-blue-100 border-blue-200"
            onClick={() => setShowVoiceInput(true)}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Mic className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Voice Entry</h3>
              <p className="text-gray-600 text-sm">Say "I spent $50 on lunch" or "Received $1000 payment"</p>
            </CardContent>
          </Card>
          
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 bg-gradient-to-br from-purple-50 to-purple-100 border-purple-200"
            onClick={() => setShowPhotoCapture(true)}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-purple-600 to-purple-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Receipt className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Receipt Scan</h3>
              <p className="text-gray-600 text-sm">Capture receipts and automatically extract details</p>
            </CardContent>
          </Card>
          
          <Card 
            className="cursor-pointer hover:shadow-lg transition-all duration-200 hover:scale-105 bg-gradient-to-br from-green-50 to-green-100 border-green-200"
            onClick={() => setShowAddModal(true)}
          >
            <CardContent className="p-6 text-center">
              <div className="w-16 h-16 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center mx-auto mb-4">
                <Plus className="w-8 h-8 text-white" />
              </div>
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Manual Entry</h3>
              <p className="text-gray-600 text-sm">Add transactions manually with detailed information</p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modals */}
      <VoiceInput 
        isOpen={showVoiceInput} 
        onClose={() => setShowVoiceInput(false)} 
      />
      
      <PhotoCapture 
        isOpen={showPhotoCapture} 
        onClose={() => setShowPhotoCapture(false)} 
      />
      
      <AddTransactionModal 
        isOpen={showAddModal} 
        onClose={() => setShowAddModal(false)} 
      />
    </div>
  );
};

export default Index;
