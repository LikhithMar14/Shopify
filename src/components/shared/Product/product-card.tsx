import { Card, CardContent, CardHeader } from "@/components/ui/card";
import Link from "next/link";
import Image from "next/image";
import { Star } from "lucide-react";
import { Product } from "@/types/product.types";

const ProductCard = ({ product }: { product: Product }) => {
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD'
    }).format(price);
  };

  // Generate star rating display
  const renderRating = (rating: string) => {
    return (
      <div className="flex items-center gap-1">
        {[...Array(5)].map((_, index) => (
          <Star
            key={index}
            size={14}
            className={`${
              index < Math.floor(Number(rating))
                ? 'fill-yellow-400 text-yellow-400'
                : 'text-gray-300'
            }`}
          />
        ))}
        <span className="ml-1 text-sm text-muted-foreground">({rating})</span>
      </div>
    );
  };

  return (
    <Card className="group w-full max-w-sm transition-all duration-300 hover:shadow-lg flex flex-col">
      <CardHeader className="p-0">
        <Link href={`/product/${product.slug}`} className="relative block aspect-square overflow-hidden">
          <div className="absolute inset-0 bg-black/5 transition-opacity duration-300 group-hover:opacity-0 z-10" />
          <Image
            src={product.images[0]}
            alt={product.name}
            width={400}
            height={400}
            priority={true}
            className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 rounded-lg"
          />
          {product.stock <= 5 && product.stock > 0 && (
            <span className="absolute top-2 right-2 bg-orange-500 text-white px-2 py-1 rounded-full text-xs font-medium z-20">
              Only {product.stock} left
            </span>
          )}
          {product.stock === 0 && (
            <div className="absolute inset-0 bg-black/60 flex items-center justify-center z-20">
              <span className="text-white font-semibold text-lg">Out of Stock</span>
            </div>
          )}
        </Link>
      </CardHeader>
      
      <CardContent className="p-4 flex flex-col flex-grow">
        <div className="flex items-center justify-between">
          <span className="text-sm font-medium text-muted-foreground">
            {product.brand}
          </span>
          {renderRating(product.rating.toString())}
        </div>
        

        <Link 
          href={`/product/${product.slug}`}
          className="block group-hover:text-primary transition-colors duration-200"
        >
          <h2 className="font-semibold text-base line-clamp-2 min-h-[3rem] mt-2">
            {product.name}
          </h2>
        </Link>


        <div className="flex items-end justify-between pt-2 mt-auto">
          {product.stock > 0 ? (
            <p className="text-lg font-bold text-primary">
              {formatPrice(Number(product.price))}
            </p>
          ) : (
            <p className="text-destructive font-semibold">Out of Stock</p>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default ProductCard;
