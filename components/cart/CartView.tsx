import '@styles/_cartview.scss';
import '@styles/_default.scss';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useCheckoutFlow } from './useCheckoutFlow';

const CartView = (): JSX.Element => {
    const [cartData, setCartData] = useState();
    const checkFlowFn = useCheckoutFlow();
    const router = useRouter();
    useEffect(() => {
        let _cartData: any = sessionStorage.getItem('cartdata');
        if (_cartData) {
            _cartData = JSON.parse(_cartData);
            const cartItems = _cartData?.addSimpleProductsToCart?.cart?.items;
            if (cartItems && cartItems?.length > 0) {
                const newData = cartItems.map(
                    (item: {
                        quantity: any;
                        product: {
                            sku: any;
                            image: any;
                            price_range: any;
                            name: any;
                        };
                    }) => {
                        return {
                            name: item.product.name,
                            sku: item.product.sku,
                            imageUrl: item.product.image.url,
                            price: item.product.price_range.minimum_price.regular_price.value,
                            quantity: item.quantity,
                        };
                    },
                );
                setCartData(newData as any);
                console.log('New Data::: ');
                console.log(newData);
            }
        }
    }, [sessionStorage.getItem('cartdata')]);
    return (
        <>
            <div className="cart-page">
                <h1> Cart Items: </h1>
                <ul className="cart-list">
                    {cartData &&
                        (cartData as any).map((item: any) => {
                            return (
                                <li key={item.sku}>
                                    <div className="left">
                                        <img src={item.imageUrl} />
                                    </div>
                                    <div className="right">
                                        <h2> {item.name}</h2>
                                        <h4> ${item.price} </h4>
                                        <h5>Quantity : {item.quantity} </h5>
                                    </div>
                                </li>
                            );
                        })}
                </ul>
                <button
                    className="button"
                    type="button"
                    onClick={() => {
                        router.push('/shipping-details-page');
                    }}
                >
                    {' '}
                    Place Order
                </button>
            </div>
        </>
    );
};

export default CartView;
