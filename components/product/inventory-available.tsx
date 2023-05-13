'use client';

export default function InventoryAvailable({ variants }: { variants: any }) {
    const quantityAvailable = variants.reduce((acc: number, variant: any) => acc + variant.quantityAvailable, 0);
    return (
        <div>
            {quantityAvailable ? 'Inventory Available: ' + quantityAvailable : 'Inventory Available: ' + 'Out of Stock'}
        </div>
    )
}

