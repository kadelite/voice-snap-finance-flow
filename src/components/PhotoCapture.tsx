
import { useState, useRef } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Camera, Upload, X, Check } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface PhotoCaptureProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PhotoCapture = ({ isOpen, onClose }: PhotoCaptureProps) => {
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [isProcessing, setIsProcessing] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setCapturedImage(e.target?.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processReceipt = async () => {
    if (!capturedImage) return;
    
    setIsProcessing(true);
    
    // Simulate processing time
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    // Mock extracted data
    const extractedData = {
      amount: 45.67,
      merchant: "Coffee Shop Inc.",
      date: new Date().toISOString().split('T')[0],
      category: "Food & Dining"
    };
    
    toast({
      title: "Receipt Processed Successfully",
      description: `Found: $${extractedData.amount} at ${extractedData.merchant}`,
    });
    
    console.log("Extracted receipt data:", extractedData);
    setIsProcessing(false);
    setCapturedImage(null);
    onClose();
  };

  const resetCapture = () => {
    setCapturedImage(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Camera className="w-5 h-5 text-purple-600" />
            <span>Receipt Scanner</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          {!capturedImage ? (
            <div className="flex flex-col items-center space-y-4">
              <div className="w-full h-64 border-2 border-dashed border-gray-300 rounded-lg flex flex-col items-center justify-center space-y-4 hover:border-purple-400 transition-colors">
                <Camera className="w-16 h-16 text-gray-400" />
                <div className="text-center">
                  <p className="text-sm text-gray-600 mb-2">Upload a receipt photo</p>
                  <p className="text-xs text-gray-500">JPG, PNG up to 10MB</p>
                </div>
              </div>
              
              <Button
                onClick={() => fileInputRef.current?.click()}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800"
              >
                <Upload className="w-4 h-4 mr-2" />
                Choose Photo
              </Button>
              
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
          ) : (
            <div className="space-y-4">
              <div className="relative">
                <img
                  src={capturedImage}
                  alt="Captured receipt"
                  className="w-full h-64 object-cover rounded-lg"
                />
                <Button
                  onClick={resetCapture}
                  variant="destructive"
                  size="sm"
                  className="absolute top-2 right-2"
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              
              <div className="bg-blue-50 p-4 rounded-lg">
                <p className="text-sm text-blue-800 mb-2">
                  <strong>AI Processing:</strong>
                </p>
                <p className="text-xs text-blue-600">
                  Our AI will automatically extract amount, merchant, date, and category from your receipt.
                </p>
              </div>
              
              <div className="flex space-x-3">
                <Button
                  onClick={processReceipt}
                  disabled={isProcessing}
                  className="flex-1 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
                >
                  {isProcessing ? (
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin mr-2" />
                  ) : (
                    <Check className="w-4 h-4 mr-2" />
                  )}
                  {isProcessing ? "Processing..." : "Process Receipt"}
                </Button>
                
                <Button
                  onClick={resetCapture}
                  variant="outline"
                  disabled={isProcessing}
                >
                  Retake
                </Button>
              </div>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
};
