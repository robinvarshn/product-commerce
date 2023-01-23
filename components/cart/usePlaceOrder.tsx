import { useMutation, gql, ApolloError } from '@apollo/client';

const PLACE_ORDER = gql`
    mutation PlaceOrder($cartId: String!) {
        placeOrder(input: { cart_id: $cartId }) {
            order {
                order_number
            }
        }
    }
`;

export const usePlaceOrder = () => {
    const [
        placeOrderFn,
        { data: placeOrderData, loading: placeOrderLoading, error: placeOrderError },
    ] = useMutation(PLACE_ORDER);

    if (placeOrderLoading) {
        console.log('Place Order in progress...');
        return null;
    }

    if (placeOrderError) {
        console.error('Error in placing order... ', placeOrderError);
        return null;
    }

    if (placeOrderData) {
        console.log('Order Number::: ', placeOrderData.placeOrder.order.order_number);
    }

    return placeOrderFn;
};

export const placeOrderHandler = (placeOrderFn: Function) => {
    return new Promise((resolve, reject) => {
        placeOrderFn({
            variables: {
                cartId: sessionStorage.getItem('cartId'),
            },
            onCompleted: (orderNumber: any) => {
                resolve(orderNumber);
            },
            onError: (error: ApolloError) => {
                reject(error);
                console.error(error);
            },
        });
    });
};
