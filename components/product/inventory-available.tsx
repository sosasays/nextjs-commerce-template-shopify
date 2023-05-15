'use client';

import { ProductVariant } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import { FaCheckCircle, FaTimesCircle } from 'react-icons/fa';

type InventoryAvailableProps = {
  variants: ProductVariant[];
};

export default function InventoryAvailable({ variants }: InventoryAvailableProps) {
    const searchParams = useSearchParams();
    const [quantityAvailable, setQuantityAvailable] = useState(variants[0]?.quantityAvailable);
    
    useEffect(() => {
    const variant = variants.find((variant: ProductVariant) => 
      variant.selectedOptions.every((option) => option.value === searchParams.get(option.name.toLowerCase()))
    );
        
    if (variant) {
      setQuantityAvailable(variant.quantityAvailable);
    }
    
  }, [searchParams, variants]);

    return (
        <div>
            {quantityAvailable && quantityAvailable > 0 ? (
                <div className='flex items-center justify-center bg-green-50 border border-green-200 text-green-700 p-2 rounded shadow-sm mb-4'>
                    <span className='mr-1'>Inventory Available: {quantityAvailable}</span>
                    <FaCheckCircle />
                </div>
            ) : (
                <div className='flex items-center justify-center bg-red-50 border border-red-200 text-red-700 p-2 rounded shadow-sm mb-4'>
                    <span className='mr-1'>Inventory Available: 0</span>
                    <FaTimesCircle />
                </div>
            )}
        </div>
    )
}

