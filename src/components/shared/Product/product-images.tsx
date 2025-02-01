'use client';
import { useState } from 'react';
import Image from 'next/image';
import { cn } from '@/lib/utils';

const ProductImages = ({ images }: { images: string[] }) => {
  const [current, setCurrent] = useState(0);

  return (
    <div className="space-y-4">
      {/* Main Image */}
      <div className="relative rounded-lg overflow-hidden shadow-lg">
        <Image
          src={images[current]}
          alt="product image"
          width={500}
          height={500}
          className="min-h-[300px] object-cover object-center transition-transform duration-300 ease-in-out hover:scale-105"
        />
      </div>

      {/* Thumbnail Images */}
      <div className="flex justify-center gap-4">
        {images.map((image, index) => (
          <div
            key={image}
            onClick={() => setCurrent(index)}
            className={cn(
              'relative group border-2 border-transparent cursor-pointer transition-all duration-200 hover:border-green-400 rounded-lg overflow-hidden',
              current === index && 'border-green-300'
            )}
          >
            <Image
              src={image}
              alt="image"
              width={100}
              height={100}
              className="object-cover object-center transition-transform duration-200 group-hover:scale-110"
            />
            {/* Hover effect */}
            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductImages;
