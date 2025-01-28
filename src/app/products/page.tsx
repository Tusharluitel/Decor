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

      <div className="max-w-7xl mx-auto px-4 py-8">
        <h1 className="text-2xl font-bold text-[#1B365D] mb-8">Product List</h1>
        
        <div className="flex gap-8">
          {/* Left Sidebar */}
          <div className="w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow p-4 space-y-6">
              {/* Category Icons with Labels */}
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-gray-600 hover:text-[#FFA500] cursor-pointer">
                  <div className="w-6 h-6">
                    <img src="https://placehold.co/600x400" alt="Living Room" />
                  </div>
                  <span>Living Room</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 hover:text-[#FFA500] cursor-pointer">
                  <div className="w-6 h-6">
                    <img src="https://placehold.co/600x400" alt="Bedroom" />
                  </div>
                  <span>Bedroom</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 hover:text-[#FFA500] cursor-pointer">
                  <div className="w-6 h-6">
                    <img src="https://placehold.co/600x400" alt="Kitchen" />
                  </div>
                  <span>Kitchen</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 hover:text-[#FFA500] cursor-pointer">
                  <div className="w-6 h-6">
                    <img src="https://placehold.co/600x400" alt="Office" />
                  </div>
                  <span>Office</span>
                </div>
                <div className="flex items-center space-x-3 text-gray-600 hover:text-[#FFA500] cursor-pointer">
                  <div className="w-6 h-6">
                    <img src="https://placehold.co/600x400" alt="Outdoor" />
                  </div>
                  <span>Outdoor</span>
                </div>
              </div>

              {/* Filter Categories */}
              <div>
                <h3 className="font-semibold mb-2">Style</h3>
                <div className="space-y-2">
                  <button className="px-4 py-2 text-sm rounded-full border hover:border-[#FFA500] w-full text-left">Modern</button>
                  <button className="px-4 py-2 text-sm rounded-full border hover:border-[#FFA500] w-full text-left">Contemporary</button>
                  <button className="px-4 py-2 text-sm rounded-full border hover:border-[#FFA500] w-full text-left">Traditional</button>
                  <button className="px-4 py-2 text-sm rounded-full border hover:border-[#FFA500] w-full text-left">Industrial</button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Material</h3>
                <div className="space-y-2">
                  <button className="px-4 py-2 text-sm rounded-full border hover:border-[#FFA500] w-full text-left">Wood</button>
                  <button className="px-4 py-2 text-sm rounded-full border hover:border-[#FFA500] w-full text-left">Metal</button>
                  <button className="px-4 py-2 text-sm rounded-full border hover:border-[#FFA500] w-full text-left">Glass</button>
                  <button className="px-4 py-2 text-sm rounded-full border hover:border-[#FFA500] w-full text-left">Fabric</button>
                </div>
              </div>

              <div>
                <h3 className="font-semibold mb-2">Color</h3>
                <div className="space-y-2">
                  <button className="px-4 py-2 text-sm rounded-full border hover:border-[#FFA500] w-full text-left">Natural</button>
                  <button className="px-4 py-2 text-sm rounded-full border hover:border-[#FFA500] w-full text-left">Neutral</button>
                  <button className="px-4 py-2 text-sm rounded-full border hover:border-[#FFA500] w-full text-left">Bold</button>
                  <button className="px-4 py-2 text-sm rounded-full border hover:border-[#FFA500] w-full text-left">Pastel</button>
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <div className="grid grid-cols-3 gap-6">
              {[
                {name: 'Modern Accent Chair', code: 'DC500300', img: 'https://placehold.co/600x400'},
                {name: 'Minimalist Side Table', code: 'DC500301', img: 'https://placehold.co/600x400'},
                {name: 'Contemporary Vase', code: 'DC500302', img: 'https://placehold.co/600x400'},
                {name: 'Wall Art Abstract', code: 'DC500303', img: 'https://placehold.co/600x400'},
                {name: 'Decorative Mirror', code: 'DC500304', img: 'https://placehold.co/600x400'},
                {name: 'Table Lamp Modern', code: 'DC500305', img: 'https://placehold.co/600x400'},
                {name: 'Floor Cushion', code: 'DC500306', img: 'https://placehold.co/600x400'},
                {name: 'Shelf Unit', code: 'DC500307', img: 'https://placehold.co/600x400'},
                {name: 'Throw Blanket', code: 'DC500308', img: 'https://placehold.co/600x400'},
              ].map((product, index) => (
                <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
                  <div className="relative group">
                    <img 
                      src={product.img} 
                      alt={product.name} 
                      className="w-full h-64 object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
                      <button className="absolute bottom-4 right-4 bg-[#1B365D] text-white px-4 py-2 rounded opacity-0 group-hover:opacity-100 transition-all duration-300">
                        Try in Visualizer
                      </button>
                    </div>
                  </div>
                  <div className="p-4">
                    <h3 className="font-semibold text-[#1B365D]">{product.name}</h3>
                    <p className="text-sm text-gray-500">{product.code}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Pagination */}
            <div className="flex justify-center mt-8 space-x-2">
              <button className="px-4 py-2 border rounded text-sm hover:border-[#FFA500]">First</button>
              <button className="px-4 py-2 border rounded text-sm bg-[#FFA500] text-white">1</button>
              <button className="px-4 py-2 border rounded text-sm hover:border-[#FFA500]">2</button>
              <button className="px-4 py-2 border rounded text-sm hover:border-[#FFA500]">3</button>
              <button className="px-4 py-2 border rounded text-sm hover:border-[#FFA500]">4</button>
              <button className="px-4 py-2 border rounded text-sm hover:border-[#FFA500]">5</button>
              <button className="px-4 py-2 border rounded text-sm hover:border-[#FFA500]">Last</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductList;