import React from 'react';
import { Card } from '@/components/ui/card';

const WelcomeBanner = () => {
  return (
    <Card className="bg-gradient-to-r from-[#1B2C4B] to-[#FF9C27] p-8 shadow-lg mb-6">
      <div className="flex flex-col md:flex-row items-center justify-between">
        <div className="space-y-2">
          <h1 className="text-3xl font-bold text-white">Welcome to Decorsign</h1>
          <p className="text-white/90">Manage your interior design projects with ease</p>
        </div>
        <div className="mt-4 md:mt-0">
          <div className="flex items-center space-x-4">
            <div className="bg-white/10 p-4 rounded-lg">
              <div className="text-xl font-semibold text-white">Today</div>
              <div className="text-sm text-white/80">{new Date().toLocaleDateString()}</div>
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default WelcomeBanner;