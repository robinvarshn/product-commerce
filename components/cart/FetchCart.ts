import { gql, useLazyQuery } from '@apollo/client';

// graphql query for fetching total items in cart
const FETCH_CART = gql`
    query FetchCart($cartId: String!) {
        cart(cart_id: $cartId) {
            total_quantity
        }
    }
`;

// Hanlder to fetch total items in cart
const useFetchCartData = (cartid: string) => {
    const [getFetchData, { loading, error, data }] = useLazyQuery(FETCH_CART, {
        fetchPolicy: 'network-only',
        variables: {
            cartId: cartid,
        },
    });

    return {
        getFetchData,
        loading,
        data,
        error,
    };
};

export { useFetchCartData };
