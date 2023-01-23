import '@styles/_default.scss';
import '@styles/_shipping.scss';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useCheckoutFlow } from '../cart/useCheckoutFlow';
import AddressComponent from './address-component';

const defaultValues = {
    firstname: 'Veronica',
    lastname: 'Costello',
    company: 'Company Name',
    street: ['3320 N Crescent Dr', 'Beverly Hills'],
    city: 'Los Angeles',
    region: 'CA',
    region_id: 12,
    postcode: '90210',
    country_code: 'US',
    telephone: '123-456-0000',
    save_in_address_book: false,
};

const ShippingDetails = () => {
    const [isShipping, setShipping] = useState<boolean>(false);
    const checkFlowFn = useCheckoutFlow();
    const router = useRouter();
    return (
        <>
            <div className="shipping-container">
                <div className="shipping-container__addresscontainer">
                    <AddressComponent
                        title="Shipping Information"
                        containerType="shipping-container__address shipping-container__addresswrapper"
                        defaultValues={defaultValues}
                        submitHandler={(data: any) => {
                            setShipping(true);
                            console.log('shipping address data...');
                            console.log(data);
                            checkFlowFn((orderNum: any) => {
                                if (orderNum) {
                                    console.log('Order Number... ', orderNum);
                                    //  sessionStorage.clear();
                                    sessionStorage.removeItem('cartId');
                                    sessionStorage.removeItem('token');
                                    sessionStorage.setItem('orderNum', JSON.stringify(orderNum));
                                    router.push('/order-success-page');
                                    window.dispatchEvent(new Event('refresh'));
                                }
                            }, data);
                            // router.push("/shipping-details-page");
                        }}
                    />

                    <AddressComponent
                        title="Billing Details"
                        containerType="shipping-container__billing-info"
                        defaultValues={defaultValues}
                        submitHandler={(data: any) => {
                            console.log(data);
                        }}
                    />
                </div>
                <div className="shipping-container__card-payment">
                    <h2> Payment Information</h2>
                    <ul>
                        <li>
                            <label>
                                {' '}
                                <span>Card type</span>
                                <select name="cardType" id="cardType">
                                    <option value="Visa">Visa</option>
                                    <option value="masterCard">MasterCard</option>
                                </select>
                            </label>
                        </li>
                        <li>
                            <label>
                                {' '}
                                <span>Name on card</span>
                                <input type="number" name="cardNumber" />
                            </label>
                        </li>
                        <li>
                            <label>
                                {' '}
                                <span>Card Number</span>
                                <input type="number" name="cardNumber" />
                            </label>
                        </li>
                    </ul>
                </div>
                <button type="submit" form="shippingAddress" className="button c-btn">
                    <span className="c-text">Continue</span>
                    {isShipping && <span className="c-loading"></span>}
                </button>
            </div>
        </>
    );
};

export default ShippingDetails;
