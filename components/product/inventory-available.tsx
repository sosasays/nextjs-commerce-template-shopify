'use client';

import { ProductVariant } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

type InventoryAvailableProps = {
  variants: ProductVariant[];
};

export default function InventoryAvailable({ variants }: InventoryAvailableProps) {
    const searchParams = useSearchParams();
    const [selectedVariantId, setSelectedVariantId] = useState(variants[0]?.id);
    const variantSelected = variants.filter((variant: any) => variant.id === selectedVariantId);
    const quantityAvailable = variantSelected[0]?.quantityAvailable;
    
    useEffect(() => {
    const variant = variants.find((variant: ProductVariant) =>
      variant.selectedOptions.every(
        (option) => option.value === searchParams.get(option.name.toLowerCase())
      )
    );

    if (variant) {
      setSelectedVariantId(variant.id);
    }
  }, [searchParams, variants, setSelectedVariantId]);

    return (
        <div>
            {quantityAvailable ? 'Inventory Available: ' + quantityAvailable : 'Inventory Available: ' + 'Out of Stock'}
        </div>
    )
}

