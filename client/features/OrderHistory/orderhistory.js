import React from 'react';
import { useSelector } from 'react-redux';
import { selectOrderHistory } from './orderhistorySlice';

const OrderHistory = () => {
    const orderHistory = useSelector(selectOrderHistory);
    return(
        <div> 
            <h1>Order History"</h1>
            <p>Issues with a past order? please contact us at careershopper@gmail.com</p>
            <div>
                {orderHistory ? orderHistory.map((order) => {
                    return(
                        <div id='single-order'>
                            <h5>Order Date/Time: {order.updatedAt}</h5>
                            <p>Order: {order.careers}</p>
                            <p>Quantity: {order.careeer.quantity}</p>
                            <p>total: {order.total}</p>
                        </div>
                    )
                }):null}
            </div>
        </div>
    )
}
export default OrderHistory

    
 