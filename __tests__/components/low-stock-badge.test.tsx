import { render, screen } from '@testing-library/react';
import { Product, ProductVariant } from 'lib/shopify/types';
import LowStockBadge from '../../components/layout/low-stock-badge';

const mockVariant: ProductVariant = {
  id: 'mock-id',
  title: 'mock-title',
  availableForSale: true,
  quantityAvailable: 5,
  selectedOptions: [
    {
      name: 'Color',
      value: 'Red',
    },
  ],
  price: {
    amount: '10',
    currencyCode: 'USD',
  },
};

const mockProduct: Product = {
  id: 'mock-id',
  handle: 'mock-handle',
  availableForSale: true,
  title: 'mock-title',
  description: 'mock-description',
  descriptionHtml: 'mock-description-html',
  options: [
    {
      id: 'mock-id',
      name: 'Color',
      values: ['Red'],
    },
  ],
  priceRange: {
    maxVariantPrice: {
      amount: '10',
      currencyCode: 'USD',
    },
    minVariantPrice: {
      amount: '5',
      currencyCode: 'USD',
    },
  },
  variants: [mockVariant],
  featuredImage: {
    url: 'mock-url',
    altText: 'mock-alt-text',
    width: 100,
    height: 100,
  },
  images: [
    {
      url: 'mock-url',
      altText: 'mock-alt-text',
      width: 100,
      height: 100,
    },
  ],
  seo: {
    title: 'mock-title',
    description: 'mock-description',
  },
  tags: ['mock-tag'],
  updatedAt: '2023-05-14',
};

describe('LowStockBadge', () => {
  it('renders the badge when total quantity available is less than or equal to 10', () => {
    render(<LowStockBadge product={mockProduct} />);
    expect(screen.getByText('Almost Sold Out')).toBeInTheDocument();
  });

  it('does not render the badge when total quantity available is more than 10', () => {
    const highStockVariant: ProductVariant = {
      ...mockVariant,
      quantityAvailable: 10,
    };
    const highStockProduct: Product = {
      ...mockProduct,
      variants: [highStockVariant, mockVariant],
    };
    render(<LowStockBadge product={highStockProduct} />);
    expect(screen.queryByText('Almost Sold Out')).not.toBeInTheDocument();
  });
});
