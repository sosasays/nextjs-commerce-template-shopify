import { Product } from 'lib/shopify/types';
import { FaFire } from 'react-icons/fa';

type LowStockBadgeProps = {
  product: Product;
};

export default function LowStockBadge({ product }: LowStockBadgeProps) {
    const totalQuantityAvailable = product?.variants.reduce((acc, variant) => acc + variant.quantityAvailable, 0);
    
    return (
        <>
        {totalQuantityAvailable !== 0 && totalQuantityAvailable <= 10 && (
            <div className='inline-flex items-center justify-center bg-red-50 border border-red-200 text-red-500 text-xs p-1 rounded shadow-sm pr-2 pl-2'>
                <FaFire className='mr-1' />
                <span>Almost Sold Out</span>
            </div>
        )}
        </>
    )
}
