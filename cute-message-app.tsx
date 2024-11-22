import React, { useState } from 'react';
import { Heart, Star } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"

const CuteMessageApp = () => {
  const [step, setStep] = useState(0);
  const [stressLevel, setStressLevel] = useState(50);
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [iceCreamChoice, setIceCreamChoice] = useState('');
  const [finalChoice, setFinalChoice] = useState(null);

  const screens = [
    // Welcome Screen with Image
    <div className="text-center space-y-4">
      <div className="relative w-full h-64 bg-pink-100 overflow-hidden rounded-t-lg">
        <img 
          src="/api/placeholder/400/320" 
          alt="Welcome" 
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-pink-500/50 to-transparent" />
        <div className="absolute bottom-4 left-0 right-0 text-white">
          <h1 className="text-2xl font-bold">Hey there! 💕</h1>
        </div>
      </div>
      <div className="p-6">
        <Button 
          onClick={() => setStep(1)}
          className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-6 py-2"
        >
          Let's Begin <Heart className="w-4 h-4 ml-2 inline" />
        </Button>
      </div>
    </div>,

    // Screen 1: Stress/Nap Level
    <div className="text-center p-6 space-y-4">
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center">
          <Star className="w-10 h-10 text-pink-500" />
        </div>
      </div>
      <h2 className="text-xl font-bold text-pink-500">How stressed or sleepy are you today?</h2>
      <div className="text-sm text-gray-500">
        <span className="float-left">Less stressed/sleepy</span>
        <span className="float-right">More stressed/sleepy</span>
      </div>
      <input 
        type="range" 
        min="0" 
        max="100" 
        value={stressLevel}
        onChange={(e) => setStressLevel(e.target.value)}
        className="w-full h-2 bg-pink-200 rounded-lg appearance-none cursor-pointer"
      />
      <Button 
        onClick={() => setStep(2)}
        className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-6 py-2"
      >
        Continue <Heart className="w-4 h-4 ml-2 inline" />
      </Button>
    </div>,

    // Screen 2: Ice Cream Flavors
    <div className="text-center p-6 space-y-4">
      <h2 className="text-xl font-bold text-pink-500">Which ice cream flavor would you like?</h2>
      <RadioGroup className="space-y-4" value={iceCreamChoice} onValueChange={setIceCreamChoice}>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Chocolate" id="chocolate" />
          <Label htmlFor="chocolate">Chocolate</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Vanilla" id="vanilla" />
          <Label htmlFor="vanilla">Vanilla</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="Strawberry" id="strawberry" />
          <Label htmlFor="strawberry">Strawberry</Label>
        </div>
        <div className="flex items-center space-x-2">
          <RadioGroupItem value="none" id="none" />
          <Label htmlFor="none">Don't want anything</Label>
        </div>
      </RadioGroup>
      <Button 
        onClick={() => {
          if (iceCreamChoice === 'none') {
            setFinalChoice(false);
            setStep(4);
          } else {
            setStep(3);
          }
        }}
        className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-6 py-2 mt-4"
      >
        Next <Heart className="w-4 h-4 ml-2 inline" />
      </Button>
    </div>,

    // Screen 3: Schedule
    <div className="text-center p-6 space-y-4">
      <h2 className="text-xl font-bold text-pink-500">When can I treat you to ice cream?</h2>
      <div className="space-y-4">
        <input
          type="date"
          className="w-full p-2 border rounded-lg border-pink-200"
          value={selectedDate}
          onChange={(e) => setSelectedDate(e.target.value)}
        />
        <input
          type="time"
          className="w-full p-2 border rounded-lg border-pink-200"
          value={selectedTime}
          onChange={(e) => setSelectedTime(e.target.value)}
        />
        <div className="space-x-2">
          <Button 
            onClick={() => {
              setFinalChoice(true);
              setStep(4);
            }}
            className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-6 py-2"
          >
            Yes, I'd love to!
          </Button>
          <Button 
            onClick={() => {
              setFinalChoice(false);
              setStep(4);
            }}
            className="bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-full px-6 py-2"
          >
            Another time
          </Button>
        </div>
      </div>
    </div>,

    // Screen 4: Final Message
    <div className="text-center p-6 space-y-4">
      <div className="flex justify-center mb-4">
        <div className="w-20 h-20 bg-pink-100 rounded-full flex items-center justify-center">
          <Heart className="w-10 h-10 text-pink-500" />
        </div>
      </div>
      {finalChoice ? (
        <>
          <h2 className="text-2xl font-bold text-pink-500">Thank you so much!</h2>
          <p className="text-gray-600">Can't wait to enjoy some {iceCreamChoice} ice cream with you!</p>
        </>
      ) : (
        <>
          <h2 className="text-2xl font-bold text-pink-500">I understand!</h2>
          {iceCreamChoice === 'none' ? (
            <p className="text-gray-600">I'll just drop off something sweet to brighten your day! 🍦</p>
          ) : (
            <p className="text-gray-600">Maybe some other time - no pressure at all!</p>
          )}
        </>
      )}
      <div className="flex justify-center space-x-2">
        <Button 
          onClick={() => setStep(0)}
          className="bg-pink-500 hover:bg-pink-600 text-white rounded-full px-6 py-2"
        >
          Start Over
        </Button>
      </div>
    </div>
  ];

  return (
    <Card className="w-full max-w-md mx-auto bg-white shadow-xl">
      <CardContent className="p-0">
        <div className="relative">
          {screens[step]}
          <div className="absolute top-2 right-2">
            <Heart className="w-4 h-4 text-pink-500" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CuteMessageApp;
