import { ApolloError, gql, useMutation } from '@apollo/client';

const ADD_PRODUCT_TO_CART = gql`
    mutation AddSimpleProductsToCart($cartId: String!, $cartItems: [SimpleProductCartItemInput]!) {
        addSimpleProductsToCart(input: { cart_id: $cartId, cart_items: $cartItems }) {
            cart {
                items {
                    uid
                    product {
                        sku
                        image {
                            url
                        }
                        name
                        stock_status
                        price_range {
                            minimum_price {
                                regular_price {
                                    currency
                                    value
                                }
                            }
                        }
                    }
                    quantity
                }
            }
        }
    }
`;

export const useAddProductToCart = (): Function | null => {
    const [addToCartFn, { data: cartData, loading: cartLoading, error: cartError }] =
        useMutation(ADD_PRODUCT_TO_CART);

    if (cartLoading) {
        console.log('add to cart in progress...');
        return null;
    }

    if (cartError) {
        console.error('add to cart error... ', cartError);
        return null;
    }

    if (cartData) {
        console.log(cartData);
    }

    return addToCartFn;
};

export const addToCartHandler = (addToCartFn: Function, sku: string) => {
    return new Promise((resolve, reject) => {
        addToCartFn({
            variables: {
                // cartId: "QSvG66k68HLTLnSZ30rpbCQvkkCknGlM",
                cartId: sessionStorage.getItem('cartId'),
                cartItems: [
                    {
                        data: {
                            quantity: 1,
                            sku, // TODO: make it dynamic based on product selected
                        },
                    },
                ],
            },
            onCompleted: (data: any) => {
                resolve(data);
                sessionStorage.setItem('cartdata', JSON.stringify(data));
            },
            onError: (error: ApolloError) => {
                reject(error);
                console.error(error);
            },
        });
    });
};
