import { cn } from '@/lib/utils';

const ProductPrice = ({
  value,
  className,
  currency = '₹', 
}: {
  value: number;
  className?: string;
  currency?: string;
}) => {

  const formattedValue = value.toLocaleString();

  return (
    <div className={cn('text-2xl font-semibold ', className)}>
      <div className="text-md text-gray-600">
        {currency}{formattedValue}
      </div>
    </div>
  );
};

export default ProductPrice;
