import { ApolloError, gql, useLazyQuery } from '@apollo/client';

const GET_CART_ID = gql`
    query {
        customerCart {
            id
        }
    }
`;

export const useGetCartId = () => {
    const [customerCartFn, { loading: cartIdLoading, error: cartIdError, data: cartIdData }] =
        useLazyQuery(GET_CART_ID);
    if (cartIdLoading) {
        return null;
    }

    if (cartIdError) {
        console.error('Error in generating cart ID: ', cartIdError);
        return null;
    }

    return customerCartFn;
};

export const cartIdGenerationHandler = (cartIdGeneratorFn: Function) => {
    return new Promise((resolve, reject) => {
        if (!cartIdGeneratorFn) {
            reject();
        }
        cartIdGeneratorFn({
            onCompleted: (cartIdData: any) => {
                if (cartIdData) {
                    const cartId = cartIdData.customerCart ? cartIdData.customerCart.id : null;
                    if (cartId) {
                        sessionStorage.setItem('cartId', cartId);
                        window.dispatchEvent(new Event('storage'));
                    }
                }
                resolve(cartIdData);
            },
            onError: (error: ApolloError) => {
                reject(error);
            },
        });
    });
};
