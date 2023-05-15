import { render, screen } from '@testing-library/react';
import { ProductVariant } from 'lib/shopify/types';
import { useSearchParams } from 'next/navigation';
import InventoryAvailable from '../../components/product/inventory-available';

jest.mock('next/navigation', () => ({
  useSearchParams: jest.fn(),
}));

describe('InventoryAvailable', () => {
  it('renders inventory available message when quantity available is greater than 0', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('color=Red'));

    const variants: ProductVariant[] = [
      {
        id: 'variant-id',
        title: 'Variant Title',
        availableForSale: true,
        quantityAvailable: 5,
        selectedOptions: [{ name: 'Color', value: 'Red' }],
        price: { amount: '10', currencyCode: 'USD' },
      },
    ];

    render(<InventoryAvailable variants={variants} />);

    expect(screen.getByText('Inventory Available: 5')).toBeInTheDocument();
  });

  it('renders out of stock message when quantity available is 0', () => {
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('color=Red'));

    const variants: ProductVariant[] = [
      {
        id: 'variant-id',
        title: 'Variant Title',
        availableForSale: true,
        quantityAvailable: 0,
        selectedOptions: [{ name: 'Color', value: 'Red' }],
        price: { amount: '10', currencyCode: 'USD' },
      },
    ];

    render(<InventoryAvailable variants={variants} />);

    expect(screen.getByText('Inventory Available: 0')).toBeInTheDocument();
  });
});
