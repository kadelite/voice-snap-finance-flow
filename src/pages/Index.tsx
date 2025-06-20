
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Mic, Camera, Plus, DollarSign, Receipt, Menu, X } from "lucide-react";
import { VoiceInput } from "@/components/VoiceInput";
import { PhotoCapture } from "@/components/PhotoCapture";
import { TransactionList } from "@/components/TransactionList";
import { FinancialChart } from "@/components/FinancialChart";
import { QuickStats } from "@/components/QuickStats";
import { AddTransactionModal } from "@/components/AddTransactionModal";
import { CurrencySelector } from "@/components/CurrencySelector";
import { UserMenu } from "@/components/UserMenu";
import { useAuth } from "@/contexts/AuthContext";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Index = () => {
  const [showVoiceInput, setShowVoiceInput] = useState(false);
  const [showPhotoCapture, setShowPhotoCapture] = useState(false);
  const [showAddModal, setShowAddModal] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { user } = useAuth();

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
              <div className="hidden sm:block">
                <h1 className="text-xl font-bold text-gray-900">FinanceTracker</h1>
                <p className="text-sm text-gray-600">Smart Business Finance</p>
              </div>
              <div className="sm:hidden">
                <h1 className="text-lg font-bold text-gray-900">FinanceTracker</h1>
              </div>
            </div>
            
            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-3">
              <CurrencySelector />
              
              {user && (
                <>
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
                </>
              )}
              
              <UserMenu />
            </div>

            {/* Mobile Navigation */}
            <div className="md:hidden flex items-center space-x-2">
              <CurrencySelector />
              
              <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="sm" className="p-2">
                    <Menu className="w-5 h-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent side="right" className="w-64">
                  <div className="flex flex-col space-y-4 mt-6">
                    {!user ? (
                      <div className="space-y-3">
                        <UserMenu />
                      </div>
                    ) : (
                      <>
                        {/* User Profile Section */}
                        <div className="pb-4 border-b">
                          <UserMenu />
                        </div>
                        
                        {/* Action Buttons */}
                        <div className="space-y-3">
                          <Button
                            onClick={() => {
                              setShowVoiceInput(true);
                              setMobileMenuOpen(false);
                            }}
                            className="w-full bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white justify-start"
                          >
                            <Mic className="w-4 h-4 mr-3" />
                            Voice Entry
                          </Button>
                          
                          <Button
                            onClick={() => {
                              setShowPhotoCapture(true);
                              setMobileMenuOpen(false);
                            }}
                            variant="outline"
                            className="w-full border-gray-300 hover:bg-gray-50 justify-start"
                          >
                            <Camera className="w-4 h-4 mr-3" />
                            Photo Capture
                          </Button>
                          
                          <Button
                            onClick={() => {
                              setShowAddModal(true);
                              setMobileMenuOpen(false);
                            }}
                            className="w-full bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white justify-start"
                          >
                            <Plus className="w-4 h-4 mr-3" />
                            Manual Entry
                          </Button>
                        </div>
                      </>
                    )}
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {!user ? (
          <div className="flex flex-col items-center justify-center py-12 text-center">
            <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-green-600 rounded-full flex items-center justify-center mb-6">
              <DollarSign className="w-10 h-10 text-white" />
            </div>
            <h2 className="text-2xl sm:text-3xl font-bold text-gray-900 mb-4">Welcome to FinanceTracker</h2>
            <p className="text-base sm:text-lg text-gray-600 max-w-md mb-8 px-4">
              Sign in or create an account to start tracking your business finances with ease.
            </p>
          </div>
        ) : (
          <>
            {/* Quick Stats */}
            <QuickStats />
            
            {/* Chart and Recent Transactions */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
              <FinancialChart />
              <TransactionList />
            </div>
            
            {/* Action Cards - Hidden on mobile since they're in the menu */}
            <div className="hidden md:grid grid-cols-1 md:grid-cols-3 gap-6">
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

            {/* Mobile Quick Action Bar - Only visible on mobile */}
            <div className="md:hidden fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 z-30">
              <div className="flex justify-around space-x-2">
                <Button
                  onClick={() => setShowVoiceInput(true)}
                  className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white"
                  size="sm"
                >
                  <Mic className="w-4 h-4" />
                </Button>
                
                <Button
                  onClick={() => setShowPhotoCapture(true)}
                  variant="outline"
                  className="flex-1 border-gray-300 hover:bg-gray-50"
                  size="sm"
                >
                  <Camera className="w-4 h-4" />
                </Button>
                
                <Button
                  onClick={() => setShowAddModal(true)}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white"
                  size="sm"
                >
                  <Plus className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </>
        )}
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
