import React from 'react';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

const ProductHorizontalCard = ({
  product
} : {
  product : Record<string,any>
}) => {
  return (
    <Card className="flex overflow-hidden max-w-2xl bg-white group relative">
      {/* Image Section with optimized transitions */}
      <div className="w-1/3 min-w-[150px] h-64 relative overflow-hidden will-change-transform transition-[width] ease-in-out duration-300 group-hover:w-full group-hover:absolute group-hover:inset-0">
        <div className="relative w-full h-full">
          <Image
            src={product?.image_path} 
            alt={product?.name}
            className="w-full h-full object-cover transform transition-transform ease-in-out duration-300 group-hover:scale-105"
            fill
            priority
          />
          {product?.category && (
            <Badge 
              className="absolute top-3 left-3 bg-amber-500 text-white border-none z-10"
            >
              {product.category}
            </Badge>
          )}
        </div>
        
        {/* Optimized overlay transition */}
        <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
      </div>

      {/* Content Section with faster color transitions */}
      <div className="flex-1 p-6 relative z-10 transition-colors duration-200 ease-in-out group-hover:text-white">
        {/* Title & Description */}
        <div className="mb-4">
          <h3 className="font-semibold text-[#1B365D] transition-colors duration-200 ease-in-out group-hover:text-white">
            {product?.name}
          </h3>
          <p className="text-gray-600 text-sm transition-colors duration-200 ease-in-out group-hover:text-gray-200">
            {product?.description}
          </p>
        </div>

        {/* Specifications */}
        <div 
          className="text-sm text-gray-600 specifications-content transition-colors duration-200 ease-in-out group-hover:text-gray-200" 
          dangerouslySetInnerHTML={{ __html: product?.specifications }} 
        />
      </div>
    </Card>
  );
};

export default ProductHorizontalCard;