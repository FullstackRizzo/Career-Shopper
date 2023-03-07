import React from 'react';
import { useSelector } from 'react-redux';
import { selectOrderHistory } from './orderhistorySlice';

const OrderHistory = () => {
    const orderHistory = useSelector(selectOrderHistory);
    return(
        <div> 
            <div>
                {orderHistory ? orderHistory.map((order) => {
                    return(
                        <div id='single-order'>
                            <h5>Order Date/Time: {order.updatedAt}</h5>
                            <p>Order: {order.careers}</p>
                            <p>Quantity: {order.careeer.quantity}</p>
                        </div>
                    )
                }):null}
            </div>
        </div>
    )
}
export default OrderHistory

    
 