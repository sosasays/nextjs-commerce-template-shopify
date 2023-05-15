import clsx from 'clsx';
import Grid from 'components/grid';
import { GridTileImage } from 'components/grid/tile';
import Price from 'components/price';
import { AddToCart } from 'components/product/add-to-cart';
import { Product } from 'lib/shopify/types';
import Link from 'next/link';
import LowStockBadge from './low-stock-badge';

export default function ProductGridItems({ products }: { products: Product[] }) {
  return (
    <>
      {products.map((product) => (
        <Grid.Item key={product.handle} className="animate-fadeIn">
          <div className="h-full w-full">
          <Link href={`/product/${product.handle}`}>
            <GridTileImage
              alt={product.title}
              labels={{
                isSmall: true,
                title: product.title,
                amount: product.priceRange.maxVariantPrice.amount,
                currencyCode: product.priceRange.maxVariantPrice.currencyCode
              }}
              src={product.featuredImage?.url}
              width={600}
              height={600}
              product={product}
            />
          </Link>
          {product && (
            <div className="absolute bottom-0 left-0 w-full bg-white dark:bg-black p-2">
              <h3
                data-testid="product-name"
                className={clsx(
                  'text-sm font-semibold leading-tight text-black dark:text-white',
                )}
              >
                {product.title}
              </h3>
              <Price
                className="text-xs font-semibold bg-white dark:bg-black"
                amount={product.priceRange.maxVariantPrice.amount}
                currencyCode={product.priceRange.maxVariantPrice.currencyCode}
              />
              <div className="mt-2">
                <AddToCart
                  variants={product.variants}
                  availableForSale={product.availableForSale}
                />
              </div>
            </div>
          )}
          {product && (
            <div className="absolute top-2 left-2">
              <LowStockBadge product={product} />
            </div>
          )}
          </div>
        </Grid.Item>
      ))}
    </>
  );
}
