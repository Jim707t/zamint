import React, { useState, useEffect } from 'react';
import { Play, Pause } from 'lucide-react';

type ZamintItem = {
  image: string;
  concept: string;
  description: string;
};

type ZamintData = {
  zamintData: ZamintItem[];
};

const SCROLL_INTERVAL = 5000;

const Gallery = () => {
  const [data, setData] = useState<ZamintData | null>(null);
  const [error, setError] = useState<string>('');
  const [isAutoScroll, setIsAutoScroll] = useState(true);
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const loadData = async () => {
      try {
        const response = await import('../data/zamint-ideology.json');
        setData(response.default);
      } catch (err) {
        setError('failed to load gallery data');
        setIsAutoScroll(false);
      }
    };
    loadData();
  }, []);

  useEffect(() => {
    if (!data || !isAutoScroll) return;
    
    const intervalId = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % data.zamintData.length);
    }, SCROLL_INTERVAL);

    return () => clearInterval(intervalId);
  }, [isAutoScroll, data]);

  const handleImageError = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const img = e.target as HTMLImageElement;
    img.src = '/placeholder.jpg';
  };

  if (error) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-rose-900 to-red-950 text-white flex items-center justify-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  if (!data) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen bg-black text-white overflow-hidden">
      <div className="absolute inset-0 opacity-30 bg-gradient-to-tr from-red-600 to-green-600 mix-blend-overlay" />
      
      <div className="relative z-10 flex flex-col items-center justify-center min-h-screen p-8">
        <div className="max-w-4xl w-full grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
          <div className="relative w-full aspect-square overflow-hidden rounded-2xl shadow-2xl border-4 border-white-900">
            <img 
              src={`/MyImage/${data.zamintData[currentSlide].image}`}
              alt={`${data.zamintData[currentSlide].concept} concept visualization`}
              onError={handleImageError}
              className="absolute inset-0 w-full h-full object-cover transition-all duration-700 transform scale-105 hover:scale-110"
            />
            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 p-4">
              <div className="text-sm uppercase tracking-wide text-green-400" aria-live="polite">
                {data.zamintData[currentSlide].concept}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-black-200">
              Zamint Order
            </h1>
            <p className="text-gray-300 leading-relaxed" aria-live="polite">
              {data.zamintData[currentSlide].description}
            </p>
            
            <div className="flex space-x-2" role="tablist">
              {data.zamintData.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  aria-label={`Show slide ${index + 1}`}
                  aria-selected={currentSlide === index}
                  role="tab"
                  className={`w-3 h-3 rounded-full transition-all duration-300 ${
                    currentSlide === index 
                      ? 'bg-red-500 scale-125' 
                      : 'bg-green-900 hover:bg-green-700'
                  }`}
                />
              ))}
            </div>
          </div>
        </div>

        <button 
          onClick={() => setIsAutoScroll(!isAutoScroll)}
          aria-label={isAutoScroll ? 'Pause auto-scroll' : 'Start auto-scroll'}
          className="absolute bottom-10 right-10 bg-black bg-opacity-50 border border-red-600 hover:bg-red-900 p-4 rounded-full transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-red-500"
        >
          {isAutoScroll ? <Pause color="white" /> : <Play color="red" />}
        </button>
      </div>
    </div>
  );
};

export default Gallery;