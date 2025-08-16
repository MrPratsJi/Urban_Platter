import React from 'react';
import { ArrowRight, Clock, Star, Truck } from 'lucide-react';

interface HeroProps {
  onOrderNow: () => void;
}

export const Hero: React.FC<HeroProps> = ({ onOrderNow }) => {
  return (
    <div className="bg-gradient-to-br from-orange-400 via-red-400 to-pink-500 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <h1 className="text-5xl lg:text-6xl font-bold leading-tight">
              Delicious Food
              <span className="block text-yellow-300">Delivered Fast</span>
            </h1>
            <p className="text-xl opacity-90 leading-relaxed">
              Order from your favorite restaurants and get fresh, hot meals delivered 
              right to your doorstep in just 30 minutes!
            </p>
            
            <div className="flex flex-wrap gap-6 text-sm">
              <div className="flex items-center space-x-2">
                <Clock className="w-5 h-5 text-yellow-300" />
                <span>30 min delivery</span>
              </div>
              <div className="flex items-center space-x-2">
                <Star className="w-5 h-5 text-yellow-300" />
                <span>4.8+ ratings</span>
              </div>
              <div className="flex items-center space-x-2">
                <Truck className="w-5 h-5 text-yellow-300" />
                <span>Free delivery</span>
              </div>
            </div>

            <button
              onClick={onOrderNow}
              className="bg-white text-orange-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-gray-100 transition-all transform hover:scale-105 inline-flex items-center space-x-2 shadow-lg"
            >
              <span>Order Now</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="relative">
            <div className="bg-white bg-opacity-10 backdrop-blur-sm rounded-3xl p-8 space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white bg-opacity-20 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold">1000+</div>
                  <div className="text-sm opacity-80">Restaurants</div>
                </div>
                <div className="bg-white bg-opacity-20 rounded-2xl p-4 text-center">
                  <div className="text-2xl font-bold">50K+</div>
                  <div className="text-sm opacity-80">Happy Customers</div>
                </div>
              </div>
              <div className="bg-white bg-opacity-20 rounded-2xl p-4 text-center">
                <div className="text-3xl font-bold">4.8★</div>
                <div className="text-sm opacity-80">Average Rating</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};