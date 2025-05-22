
import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Mic, MicOff, Volume2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface VoiceInputProps {
  isOpen: boolean;
  onClose: () => void;
}

export const VoiceInput = ({ isOpen, onClose }: VoiceInputProps) => {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState("");
  const [recognition, setRecognition] = useState<SpeechRecognition | null>(null);

  useEffect(() => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
      const recognitionInstance = new SpeechRecognition();
      
      recognitionInstance.continuous = false;
      recognitionInstance.interimResults = true;
      recognitionInstance.lang = 'en-US';

      recognitionInstance.onresult = (event) => {
        const current = event.resultIndex;
        const transcript = event.results[current][0].transcript;
        setTranscript(transcript);
      };

      recognitionInstance.onend = () => {
        setIsListening(false);
      };

      recognitionInstance.onerror = (event) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
        toast({
          title: "Voice Recognition Error",
          description: "There was an issue with voice recognition. Please try again.",
          variant: "destructive",
        });
      };

      setRecognition(recognitionInstance);
    }
  }, []);

  const startListening = () => {
    if (recognition) {
      setTranscript("");
      setIsListening(true);
      recognition.start();
    } else {
      toast({
        title: "Voice Recognition Not Supported",
        description: "Your browser doesn't support voice recognition.",
        variant: "destructive",
      });
    }
  };

  const stopListening = () => {
    if (recognition) {
      recognition.stop();
      setIsListening(false);
    }
  };

  const processVoiceInput = () => {
    if (transcript.trim()) {
      // Here you would process the transcript and extract transaction details
      // For demo purposes, we'll show a success message
      toast({
        title: "Transaction Added",
        description: `Processed: "${transcript}"`,
      });
      
      console.log("Processing voice input:", transcript);
      setTranscript("");
      onClose();
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="flex items-center space-x-2">
            <Volume2 className="w-5 h-5 text-blue-600" />
            <span>Voice Input</span>
          </DialogTitle>
        </DialogHeader>
        
        <div className="flex flex-col items-center space-y-6 py-6">
          <div className={`w-32 h-32 rounded-full flex items-center justify-center transition-all duration-300 ${
            isListening 
              ? 'bg-gradient-to-br from-red-400 to-red-600 animate-pulse' 
              : 'bg-gradient-to-br from-blue-400 to-blue-600'
          }`}>
            {isListening ? (
              <MicOff className="w-16 h-16 text-white" />
            ) : (
              <Mic className="w-16 h-16 text-white" />
            )}
          </div>
          
          <div className="text-center">
            <p className="text-lg font-medium text-gray-900 mb-2">
              {isListening ? "Listening..." : "Ready to listen"}
            </p>
            <p className="text-sm text-gray-600">
              {isListening 
                ? "Speak now - say something like 'I spent $50 on lunch'" 
                : "Click the microphone to start recording"
              }
            </p>
          </div>
          
          {transcript && (
            <div className="w-full p-4 bg-gray-50 rounded-lg">
              <p className="text-sm text-gray-700">
                <strong>Detected:</strong> {transcript}
              </p>
            </div>
          )}
          
          <div className="flex space-x-3">
            {!isListening ? (
              <Button
                onClick={startListening}
                className="bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800"
              >
                <Mic className="w-4 h-4 mr-2" />
                Start Recording
              </Button>
            ) : (
              <Button
                onClick={stopListening}
                variant="destructive"
              >
                <MicOff className="w-4 h-4 mr-2" />
                Stop Recording
              </Button>
            )}
            
            {transcript && (
              <Button
                onClick={processVoiceInput}
                className="bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800"
              >
                Add Transaction
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};
