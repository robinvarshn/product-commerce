import { useMutation, gql, ApolloError } from '@apollo/client';

const SET_BILLING_ADDRESS = gql`
    mutation SetBillingAddressOnCart($cartId: String!, $billingAddress: BillingAddressInput!) {
        setBillingAddressOnCart(input: { cart_id: $cartId, billing_address: $billingAddress }) {
            cart {
                billing_address {
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
                }
            }
        }
    }
`;

export const useSetBillingAddress = () => {
    const [
        setBillingAddressFn,
        { data: billingData, loading: billingLoading, error: billingError },
    ] = useMutation(SET_BILLING_ADDRESS);

    if (billingLoading) {
        console.log('logging in...');
        return null;
    }

    if (billingError) {
        console.error('Error in setting billing address... ', billingError);
        return null;
    }

    if (billingData) {
        console.log(billingData);
    }

    return setBillingAddressFn;
};

export const setBillingAddressHandler = (setBillingAddressFn: Function) => {
    return new Promise((resolve, reject) => {
        setBillingAddressFn({
            variables: {
                cartId: sessionStorage.getItem('cartId'),
                billingAddress: {
                    address: {
                        firstname: 'Veronica',
                        lastname: 'Costello',
                        company: 'Company Name',
                        street: ['64 Strawberry Dr', 'Beverly Hills'],
                        city: 'Los Angeles',
                        region: 'CA',
                        region_id: 12,
                        postcode: '90210',
                        country_code: 'US',
                        telephone: '123-456-0000',
                        save_in_address_book: true,
                    },
                },
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
