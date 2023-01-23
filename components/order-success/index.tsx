import { useEffect, useState } from 'react';
import '@styles/_order-success.scss';

const OrderSuccess = () => {
    const [orderNumber, setOrderNumber] = useState();
    useEffect(() => {
        const orderData = sessionStorage.getItem('orderNum');
        if (orderData) {
            const orderObj = JSON.parse(orderData);
            setOrderNumber(orderObj.placeOrder.order.order_number);
        }
    }, [sessionStorage.getItem('orderNum')]);
    return (
        <div className="order-success">
            <h1>Congrats !!! Your Order is placed successfully.</h1>
            <h3>
                Order Number: <span>{orderNumber}</span>
            </h3>
            <h6>Kindly note the OrderNumber for future reference.</h6>
        </div>
    );
};

export default OrderSuccess;
