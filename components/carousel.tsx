import { getCollectionProducts } from 'lib/shopify';
import Image from 'next/image';
import Link from 'next/link';

export async function Carousel() {
  // Collections that start with `hidden-*` are hidden from the search page.
  const products = await getCollectionProducts({ collection: 'Hydrogen' });

  if (!products?.length) return null;

  return (
    <div className="relative w-full overflow-hidden bg-black dark:bg-white">
      <div className="flex animate-carousel">
        {[...products, ...products].map((product, i) => (
          <Link
            key={`${product.handle}${i}`}
            href={`/product/${product.handle}`}
            className="relative h-[30vh] w-1/2 flex-none md:w-1/3 flex items-center justify-center"
          >
            {product.featuredImage ? (
              <Image
                alt={product.title}
                className="h-full object-contain text-sm text-center"
                fill
                sizes="33vw"
                src={product.featuredImage.url}
              />
            ) : null}
          </Link>
        ))}
      </div>
    </div>
  );
}
