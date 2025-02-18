import React from "react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { Separator } from "@/components/ui/separator";

const ProductHorizontalCard = ({
  product,
}: {
  product: Record<string, any>;
}) => {
  return (
    <Card className="p-4 overflow-hidden max-w-2xl  group relative">
      <div className="flex gap-2">
        {/* Image Section with optimized transitions */}
        <div className="flex justify-center items-center w-[160px] h-[160px] bg-[#ECECEC]">
          {/* <div className="border border-red-700 w-[160px] h-[160px] bg-[#ECECEC] relative overflow-hidden will-change-transform transition-[width] ease-in-out duration-300 group-hover:w-full group-hover:absolute group-hover:inset-0"> */}
          <div className="relative  w-[100px] h-[100px]">
            <Image
              src={product?.image_path}
              alt={product?.name}
              className="object-contain"
              // className="object-cover transform transition-transform ease-in-out duration-300 group-hover:scale-105"
              fill
              priority
            />
            {/* {product?.category && (
            <Badge 
              className="absolute top-3 left-3 bg-amber-500 text-white border-none z-10"
            >
              {product.category}
            </Badge>
          )} */}
          </div>

          {/* Optimized overlay transition */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/40 opacity-0 transition-opacity duration-300 ease-in-out group-hover:opacity-100" />
        </div>

        <div className="w-4/6">
          {/* Title & Description */}
          <div className="mb-4">
            <h3 className="font-semibold text-[#1B365D] transition-colors duration-200 ease-in-out group-hover:text-white">
              {product?.name}
            </h3>
            <p className="mt-4 text-gray-600 text-sm transition-colors duration-200 ease-in-out group-hover:text-gray-200">
              {product?.description}
            </p>
          </div>
        </div>
      </div>

      <Separator className="my-4" />

      {/* Content Section with faster color transitions */}
      <div className="flex-1 relative z-10 transition-colors duration-200 ease-in-out group-hover:text-white">
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
