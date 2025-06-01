
import React, { useState, useRef, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Camera, X, Zap, Search, AlertCircle } from 'lucide-react';
import { cn } from '@/lib/utils';
import GlassCard from '@/components/ui/glass-card';

interface BarcodeScannerProps {
  onScanResult: (product: any) => void;
  onClose: () => void;
  isOpen: boolean;
}

interface ProductInfo {
  barcode: string;
  name: string;
  brand: string;
  calories: number;
  servingSize: string;
  nutrition: {
    protein: number;
    carbs: number;
    fat: number;
    fiber: number;
    sugar: number;
    sodium: number;
  };
  ingredients: string[];
  image?: string;
}

const BarcodeScanner: React.FC<BarcodeScannerProps> = ({ onScanResult, onClose, isOpen }) => {
  const [isScanning, setIsScanning] = useState(false);
  const [manualBarcode, setManualBarcode] = useState('');
  const [scanResult, setScanResult] = useState<ProductInfo | null>(null);
  const [error, setError] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  // Mock product database - in real app this would call an API like OpenFoodFacts
  const mockProducts: { [key: string]: ProductInfo } = {
    '123456789012': {
      barcode: '123456789012',
      name: 'Greek Yogurt',
      brand: 'Chobani',
      calories: 100,
      servingSize: '170g container',
      nutrition: {
        protein: 17,
        carbs: 6,
        fat: 0,
        fiber: 0,
        sugar: 4,
        sodium: 65
      },
      ingredients: ['Cultured Nonfat Milk', 'Natural Flavors', 'Live Active Cultures'],
      image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?w=200'
    },
    '987654321098': {
      barcode: '987654321098',
      name: 'Organic Banana',
      brand: 'Fresh Farms',
      calories: 105,
      servingSize: '1 medium banana (118g)',
      nutrition: {
        protein: 1.3,
        carbs: 27,
        fat: 0.4,
        fiber: 3.1,
        sugar: 14.4,
        sodium: 1
      },
      ingredients: ['Organic Banana'],
      image: 'https://images.unsplash.com/photo-1571771894821-ce9b6c11b08e?w=200'
    }
  };

  const startCamera = useCallback(async () => {
    try {
      setError(null);
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } 
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        streamRef.current = stream;
        setIsScanning(true);
      }
    } catch (err) {
      setError('Camera access denied. Please allow camera permissions or enter barcode manually.');
      console.error('Camera error:', err);
    }
  }, []);

  const stopCamera = useCallback(() => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach(track => track.stop());
      streamRef.current = null;
    }
    setIsScanning(false);
  }, []);

  const simulateScan = useCallback(() => {
    // Simulate scanning delay
    setTimeout(() => {
      const mockBarcode = '123456789012';
      const product = mockProducts[mockBarcode];
      if (product) {
        setScanResult(product);
        stopCamera();
      }
    }, 2000);
  }, [stopCamera]);

  const searchByBarcode = useCallback((barcode: string) => {
    const product = mockProducts[barcode];
    if (product) {
      setScanResult(product);
      setError(null);
    } else {
      setError('Product not found. Try scanning again or enter details manually.');
    }
  }, []);

  const handleManualSearch = () => {
    if (manualBarcode.length >= 8) {
      searchByBarcode(manualBarcode);
    }
  };

  const handleAddToFood = () => {
    if (scanResult) {
      onScanResult(scanResult);
      onClose();
    }
  };

  React.useEffect(() => {
    if (isOpen && !isScanning) {
      startCamera();
    }
    
    return () => {
      stopCamera();
    };
  }, [isOpen, startCamera, stopCamera, isScanning]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
      <GlassCard variant="premium" className="w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Camera className="w-6 h-6" />
            Barcode Scanner
          </h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="w-5 h-5" />
          </Button>
        </div>

        {!scanResult ? (
          <div className="space-y-6">
            {/* Camera View */}
            <div className="relative">
              <div className="bg-gray-900 rounded-2xl overflow-hidden aspect-video">
                {isScanning ? (
                  <div className="relative">
                    <video
                      ref={videoRef}
                      autoPlay
                      playsInline
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="border-4 border-white w-64 h-32 rounded-xl border-dashed opacity-80"></div>
                    </div>
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2">
                      <Button 
                        onClick={simulateScan}
                        className="bg-white/20 backdrop-blur-sm hover:bg-white/30 text-white border border-white/30"
                      >
                        <Zap className="w-4 h-4 mr-2" />
                        Simulate Scan
                      </Button>
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-full text-white">
                    <div className="text-center">
                      <Camera className="w-16 h-16 mx-auto mb-4 opacity-50" />
                      <p className="text-lg">Camera Loading...</p>
                    </div>
                  </div>
                )}
              </div>
            </div>

            {error && (
              <div className="flex items-center gap-2 p-4 bg-red-50 dark:bg-red-900/20 rounded-xl border border-red-200 dark:border-red-800">
                <AlertCircle className="w-5 h-5 text-red-500" />
                <p className="text-red-700 dark:text-red-400">{error}</p>
              </div>
            )}

            {/* Manual Entry */}
            <div className="space-y-4">
              <h3 className="font-semibold text-lg">Or enter barcode manually:</h3>
              <div className="flex gap-3">
                <input
                  type="text"
                  placeholder="Enter barcode number..."
                  value={manualBarcode}
                  onChange={(e) => setManualBarcode(e.target.value)}
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-300 dark:border-gray-600 bg-white/50 dark:bg-gray-800/50 backdrop-blur-sm"
                />
                <Button onClick={handleManualSearch} className="gap-2">
                  <Search className="w-4 h-4" />
                  Search
                </Button>
              </div>
              <p className="text-sm text-gray-500">
                Try: 123456789012 (Greek Yogurt) or 987654321098 (Banana)
              </p>
            </div>
          </div>
        ) : (
          /* Product Result */
          <div className="space-y-6">
            <div className="flex gap-4">
              {scanResult.image && (
                <img 
                  src={scanResult.image} 
                  alt={scanResult.name}
                  className="w-24 h-24 rounded-xl object-cover"
                />
              )}
              <div className="flex-1">
                <h3 className="text-xl font-bold">{scanResult.name}</h3>
                <p className="text-gray-600 dark:text-gray-400">{scanResult.brand}</p>
                <p className="text-sm text-gray-500">Barcode: {scanResult.barcode}</p>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-4">
                <p className="text-sm text-gray-500">Calories per serving</p>
                <p className="text-2xl font-bold">{scanResult.calories}</p>
                <p className="text-xs text-gray-500">{scanResult.servingSize}</p>
              </div>
              <div className="bg-white/30 dark:bg-gray-800/30 rounded-xl p-4">
                <p className="text-sm text-gray-500">Protein</p>
                <p className="text-2xl font-bold">{scanResult.nutrition.protein}g</p>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-3">
              <div className="text-center p-3 bg-white/20 dark:bg-gray-800/20 rounded-lg">
                <p className="text-xs text-gray-500">Carbs</p>
                <p className="font-bold">{scanResult.nutrition.carbs}g</p>
              </div>
              <div className="text-center p-3 bg-white/20 dark:bg-gray-800/20 rounded-lg">
                <p className="text-xs text-gray-500">Fat</p>
                <p className="font-bold">{scanResult.nutrition.fat}g</p>
              </div>
              <div className="text-center p-3 bg-white/20 dark:bg-gray-800/20 rounded-lg">
                <p className="text-xs text-gray-500">Fiber</p>
                <p className="font-bold">{scanResult.nutrition.fiber}g</p>
              </div>
            </div>

            <div className="space-y-2">
              <h4 className="font-semibold">Ingredients:</h4>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {scanResult.ingredients.join(', ')}
              </p>
            </div>

            <div className="flex gap-3">
              <Button onClick={handleAddToFood} className="flex-1 gap-2">
                <Plus className="w-4 h-4" />
                Add to Food Diary
              </Button>
              <Button variant="outline" onClick={() => setScanResult(null)}>
                Scan Another
              </Button>
            </div>
          </div>
        )}
      </GlassCard>
    </div>
  );
};

export default BarcodeScanner;
