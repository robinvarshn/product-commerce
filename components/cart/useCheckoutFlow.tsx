import { useSetShippingAddress, setShippingAddressHandler } from './useSetShippingAddress';
import { useSetBillingAddress, setBillingAddressHandler } from './useSetBillingAddress';

import {
    useAvailablePaymentMethods,
    AvailablePaymentMethodType,
    getAvailablePaymentMethodHandler,
    setPaymentMethodOnCartHandler,
} from './useAvailablePaymentMethods';

import { usePlaceOrder, placeOrderHandler } from './usePlaceOrder';

import { useSetShippingMethod, setShippingMethodHandler } from './useSetShippingMethod';

export const useCheckoutFlow = () => {
    const shippingAddressFn = useSetShippingAddress();
    const billingAddressFn = useSetBillingAddress();
    const shippingMethodFn = useSetShippingMethod();
    const paymentMethodFns: AvailablePaymentMethodType | null = useAvailablePaymentMethods();
    const placeOrderFn = usePlaceOrder();

    return (callbackFn: Function, shippingAddress: Object) => {
        shippingAddressFn &&
            setShippingAddressHandler(shippingAddressFn, shippingAddress)
                .then((shippingAddress) => {
                    console.log('shipping Address::: ', shippingAddress);
                    return billingAddressFn && setBillingAddressHandler(billingAddressFn);
                })
                .then((billingAddress) => {
                    console.log('billing Address::: ', billingAddress);
                    return shippingMethodFn && setShippingMethodHandler(shippingMethodFn);
                })
                .then((shippingMethod) => {
                    console.log('Shipping Method::: ', shippingMethod);
                    const fn = paymentMethodFns && paymentMethodFns.getAvailablePaymentMethodsFn;
                    if (fn) {
                        return fn && getAvailablePaymentMethodHandler(fn);
                    }
                })
                .then((paymentMethod: any) => {
                    console.log('payment method::: ', paymentMethod);
                    const fn = paymentMethodFns && paymentMethodFns.setPaymentMethodFn;
                    return fn && setPaymentMethodOnCartHandler(fn, paymentMethod.code);
                })
                .then((selectedPaymentCode) => {
                    console.log('Payment Code:::: ');
                    console.log(selectedPaymentCode);
                    return placeOrderFn && placeOrderHandler(placeOrderFn);
                })
                .then((orderNum) => {
                    console.log('Order Number::: ', orderNum);
                    if (callbackFn) {
                        callbackFn(orderNum);
                    }
                })
                .catch((error) => {
                    console.error(error);
                });
    };
};
