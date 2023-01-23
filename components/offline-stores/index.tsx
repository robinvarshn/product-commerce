import '@styles/_default.scss';
import '@styles/_offline-stores.scss';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { addToCartHandler, useAddProductToCart } from '../cart/useAddProductToCart';
import { OfflineStoreProps } from './offline-stores';

const OfflineStoreWrapper = ({ title, vendors, sku }: OfflineStoreProps): JSX.Element => {
    const router = useRouter();
    const addProductToCartFn = useAddProductToCart();
    return (
        <div className="offline-store">
            <p className="offline-store__title">{title}</p>
            <ul className="offline-store__stores">
                {vendors.map((x, i) => (
                    <li key={i}>
                        <Image src={`/${x}.png`} alt="" width={100} height={100} />
                    </li>
                ))}
            </ul>
            <button
                className="button-addtocart"
                onClick={async () => {
                    const addToCartData =
                        addProductToCartFn && (await addToCartHandler(addProductToCartFn, sku));
                    if (addToCartData) {
                        router.push('/cart-page');
                    }
                }}
            >
                Add to cart
            </button>
        </div>
    );
};

export default OfflineStoreWrapper;
