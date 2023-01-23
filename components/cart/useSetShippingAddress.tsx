import { useMutation, gql, ApolloError } from '@apollo/client';

const SET_SHIPPING_ADDRESS = gql`
    mutation SetShippingAddress($cartId: String!, $shippingAddress: [ShippingAddressInput]!) {
        setShippingAddressesOnCart(
            input: { cart_id: $cartId, shipping_addresses: $shippingAddress }
        ) {
            cart {
                shipping_addresses {
                    firstname
                    lastname
                    company
                    street
                    city
                    region {
                        code
                        label
                    }
                    postcode
                    telephone
                    country {
                        code
                        label
                    }
                    available_shipping_methods {
                        carrier_code
                        carrier_title
                        method_code
                        method_title
                    }
                }
            }
        }
    }
`;

export const useSetShippingAddress = () => {
    const [
        setShippingAddressFn,
        { data: shippingData, loading: shippingLoading, error: shippingError },
    ] = useMutation(SET_SHIPPING_ADDRESS);

    if (shippingLoading) {
        console.log('setting shipping address in...');
        return null;
    }

    if (shippingError) {
        console.error('Error in setting shipping address... ', shippingError);
        return null;
    }

    if (shippingData) {
        console.log(shippingData);
    }

    return setShippingAddressFn;
};

export const setShippingAddressHandler = (
    setShippingAddressFn: Function,
    shippingAddress: Object,
) => {
    return new Promise((resolve, reject) => {
        setShippingAddressFn({
            variables: {
                cartId: sessionStorage.getItem('cartId'),
                shippingAddress: [
                    {
                        // address: {
                        //   firstname: "Veronica",
                        //   lastname: "Costello",
                        //   company: "Company Name",
                        //   street: ["3320 N Crescent Dr", "Beverly Hills"],
                        //   city: "Los Angeles",
                        //   region: "CA",
                        //   region_id: 12,
                        //   postcode: "90210",
                        //   country_code: "US",
                        //   telephone: "123-456-0000",
                        //   save_in_address_book: false,
                        // },
                        address: shippingAddress,
                    },
                ],
            },
            onCompleted: (shippingData: any) => {
                const shippingMethods =
                    shippingData.setShippingAddressesOnCart.cart.shipping_addresses[0]
                        .available_shipping_methods;
                console.log(shippingMethods);
                sessionStorage.setItem('shippingMethods', JSON.stringify(shippingMethods));
                resolve(shippingData);
            },
            onError: (error: ApolloError) => {
                reject(error);
                console.error(error);
            },
        });
    });
};
