// components/HeroWithText.js
"use client"
import { useState, useEffect } from 'react';

export default function HeroWithText() {
  const [showText, setShowText] = useState(false);
  
  useEffect(() => {
    // Show text after a short delay for animation effect
    const timer = setTimeout(() => setShowText(true), 300);
    return () => clearTimeout(timer);
  }, []);

  return (
     <section className="relative w-full h-screen">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: "url('/images/background/slider1.png')" }}
        />
      </section>
    
  );
}