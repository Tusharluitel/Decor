import React from 'react';
import { ChevronRight } from 'lucide-react';

const ProductList = () => {
  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Breadcrumb */}
      <div className="max-w-7xl mx-auto py-4 px-4">
        <div className="flex items-center text-sm">
          <span>Home</span>
          <ChevronRight size={16} className="mx-2" />
          <span>Products</span>
        </div>
      </div>

      
    </div>
  );
};

export default ProductList;