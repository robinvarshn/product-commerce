import { useMutation, useLazyQuery, gql, ApolloError } from '@apollo/client';

const GET_AVAILABLE_PAYMENT_METHODS = gql`
    query GetAvailablePaymentMethods($cartId: String!) {
        cart(cart_id: $cartId) {
            available_payment_methods {
                code
                title
            }
        }
    }
`;

const SET_PAYMENT_METHODS = gql`
    mutation SetPaymentMethodOnCart($cartId: String!, $paymentMethod: PaymentMethodInput!) {
        setPaymentMethodOnCart(input: { cart_id: $cartId, payment_method: $paymentMethod }) {
            cart {
                selected_payment_method {
                    code
                }
            }
        }
    }
`;

export type AvailablePaymentMethodType = {
    getAvailablePaymentMethodsFn: Function;
    setPaymentMethodFn: Function;
};

export const useAvailablePaymentMethods = (): AvailablePaymentMethodType | null => {
    const [
        getAvailablePaymentMethodsFn,
        {
            data: availablePaymentMethodData,
            loading: availablePaymentMethodLoading,
            error: availablePaymentMethodError,
        },
    ] = useLazyQuery(GET_AVAILABLE_PAYMENT_METHODS);

    const [
        setPaymentMethodFn,
        {
            data: setPaymentMethodData,
            loading: setPaymentMethodLoading,
            error: setPaymentMethodError,
        },
    ] = useMutation(SET_PAYMENT_METHODS);

    if (availablePaymentMethodLoading) {
        console.log('Available Payment Methods in...');
        return null;
    }

    if (availablePaymentMethodError) {
        console.error(
            'Error in setting availablePaymentMethod address... ',
            availablePaymentMethodError,
        );
        return null;
    }

    if (setPaymentMethodData) {
        console.log(setPaymentMethodData);
    }

    if (setPaymentMethodLoading) {
        console.log('Available Payment Methods in...');
        return null;
    }

    if (setPaymentMethodError) {
        console.error('Error in setting availablePaymentMethod address... ', setPaymentMethodError);
        return null;
    }

    return {
        getAvailablePaymentMethodsFn,
        setPaymentMethodFn,
    };
};

export const getAvailablePaymentMethodHandler = (getAvailablePaymentMethodsFn: Function) => {
    return new Promise((resolve, reject) => {
        getAvailablePaymentMethodsFn({
            variables: {
                cartId: sessionStorage.getItem('cartId'),
            },
            onCompleted: (paymentMethods: any) => {
                const paymentMethod = paymentMethods.cart.available_payment_methods[0];
                resolve(paymentMethod);
            },
            onError: (error: ApolloError) => {
                reject(error);
                console.error(error);
            },
        });
    });
};

export const setPaymentMethodOnCartHandler = (
    setPaymentMethodFn: Function,
    paymentMethodCode: string,
) => {
    return new Promise((resolve, reject) => {
        setPaymentMethodFn({
            variables: {
                cartId: sessionStorage.getItem('cartId'),
                paymentMethod: {
                    code: paymentMethodCode,
                },
            },
            onCompleted: (selectedPaymentCode: any) => {
                resolve(selectedPaymentCode);
            },
            onError: (error: ApolloError) => {
                reject(error);
                console.error(error);
            },
        });
    });
};
