import { useMutation, gql, ApolloError } from '@apollo/client';

const SET_SHIPPING_METHOD = gql`
    mutation SetShippingMethodsOnCart($cartId: String!, $shippingMethod: [ShippingMethodInput]!) {
        setShippingMethodsOnCart(input: { cart_id: $cartId, shipping_methods: $shippingMethod }) {
            cart {
                shipping_addresses {
                    selected_shipping_method {
                        carrier_code
                        method_code
                        carrier_title
                        method_title
                    }
                }
            }
        }
    }
`;

export const useSetShippingMethod = () => {
    const [
        setShippingMethodFn,
        { data: shippingMethodData, loading: shippingMethodLoading, error: shippingMethodError },
    ] = useMutation(SET_SHIPPING_METHOD);

    if (shippingMethodLoading) {
        console.log('shipping method setting in progress...');
        return null;
    }

    if (shippingMethodError) {
        console.error('Error in setting shipping method... ', shippingMethodError);
        return null;
    }

    if (shippingMethodData) {
        console.log('shipping method::: ', shippingMethodData);
        console.log(shippingMethodData);
    }

    return setShippingMethodFn;
};

export const setShippingMethodHandler = (setShippingMethodFn: Function) => {
    return new Promise((resolve, reject) => {
        let shippingMethods: any = sessionStorage.getItem('shippingMethods');
        if (shippingMethods) {
            shippingMethods = JSON.parse(shippingMethods);
        }
        setShippingMethodFn({
            variables: {
                cartId: sessionStorage.getItem('cartId'),
                shippingMethod: [
                    {
                        carrier_code: shippingMethods[0].carrier_code,
                        method_code: shippingMethods[0].method_code,
                    },
                ],
            },
            onCompleted: (billingData: any) => {
                resolve(billingData);
            },
            onError: (error: ApolloError) => {
                reject(error);
                console.error(error);
            },
        });
    });
};
