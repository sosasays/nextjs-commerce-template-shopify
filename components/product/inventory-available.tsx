'use client';

export default function InventoryAvailable({ quantityAvailable }: { quantityAvailable: any }) {
    return (
        <div>
            {quantityAvailable ? 'Inventory Available: ' + quantityAvailable : 'Inventory Available: ' + 'Out of Stock'}
        </div>
    )
}

