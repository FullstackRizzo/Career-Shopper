import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    id: null,
    completed: false,
    total: null,
    userId: null,
    order_items:[
        {
            id: null,
            quantity: null,
            orderId: null,
            careerId: null,
            career:{
                id: null,
                name: "",
                salary: null,
                timeOfCompletion: null,
                description: "",
                cost: null,
                imageUrl: "",
                category: "",
                quantity: null,
            }
        }
    ]
};

export const fetchUserOrderAsync = createAsyncThunk('userOrder', async(userId)=>{
    try{
        const {data} = await axios.get(`/api/users/${userId}/activeorder`)
        return data;
    }
    catch(err){
        console.log(err)
    }
})

export const deleteUserOrderAsync = createAsyncThunk('deleteUserOrder', async(id)=>{
    try {
        const {data} = await axios.delete(`/api/orderitems/${id}`);
        const orderId = data.orderId;
        const careerId = data.careerId;
        const quantity = data.quantity
        const careerRes = await axios.get(`/api/singlecareer/${careerId}`)
        const career = careerRes.data
        const orderRes = await axios.get(`/api/orders/${orderId}`);
        const order = orderRes.data;
        const updatedTotal = order.total - (career.cost * quantity);
        await axios.put(`/api/orders/${orderId}`, { total: updatedTotal });
        return {data, updatedTotal};
    } catch(err) {
        console.log(err);
    }
});

export const addToUserCartAsync = createAsyncThunk('addToUserCartAsync', async({userId, career}) => {
    try {
        const userRes = await axios.get(`/api/users/${userId}`);
        const user = userRes.data;

        const ordersRes = await axios.get(`/api/orders`);
        const orders = ordersRes.data;

        const orderItemsRes = await axios.get(`/api/orderitems`);
        const orderItems = orderItemsRes.data;

        const existingUserOrder = orders.find((order) => order.userId === user.id && order.completed === false);
        let orderId;

        if(existingUserOrder){
            orderId = existingUserOrder.id;
        }
        else{
            const orderRes = await axios.post(`/api/orders`,{
                userId: user.id
            });
            orderId = orderRes.data.id
        }

        const existingOrderItem = orderItems.find((item) => item.orderId === orderId && item.careerId === career.id);
        if (existingOrderItem) {
            await axios.put(`/api/orderitems/${existingOrderItem.id}`, {
                quantity: existingOrderItem.quantity + 1
            });
            const order = await axios.get(`/api/orders/${orderId}`);
            const updatedTotal = order.data.total + career.cost;
            await axios.put(`/api/orders/${orderId}`, { total: updatedTotal });
        } else {
            await axios.post('/api/orderitems',{
                orderId: orderId,
                careerId: career.id,
                quantity: 1
            });
            const order = await axios.get(`/api/orders/${orderId}`);
            const updatedTotal = order.data.total + career.cost;
            await axios.put(`/api/orders/${orderId}`, { total: updatedTotal });
        }
       
    } catch(err){
        console.log(err)
      }
})

export const addToUserOrderQuantityAsync = createAsyncThunk('addToUserOrderQuantity', async(id)=>{
    try{
        const { data } = await axios.get(`/api/orderitems/${id}`)
        const orderId = data.orderId;
        const careerCost = data.career.cost;
        const orderRes = await axios.get(`/api/orders/${orderId}`);
        const order = orderRes.data;
        const currentQuantity = data.quantity;
        const updatedQuantity = currentQuantity + 1;
        const updatedTotal = order.total + careerCost;
        await axios.put(`/api/orderitems/${id}`, {quantity : updatedQuantity})
        await axios.put(`/api/orders/${orderId}`, {total: updatedTotal});
        return {id, updatedTotal}
    }
    catch(err){
        console.log(err)
    }
})

export const subtractFromUserOrderQuantityAsync = createAsyncThunk('subtractFromUserOrderQuantity', async(id)=>{
    try{
        const {data} = await axios.get(`/api/orderitems/${id}`)
        const orderId = data.orderId;
        const careerCost = data.career.cost;
        const orderRes = await axios.get(`/api/orders/${orderId}`);
        const order = orderRes.data;
        const currentQuantity = data.quantity
        const updatedQuantity = currentQuantity - 1;
        const updatedTotal = order.total - careerCost;
        await axios.put(`/api/orderitems/${id}`, {quantity: updatedQuantity})
        if(updatedQuantity <= 0){
            await axios.delete(`api/orderitems/${id}`);
        }
        await axios.put(`/api/orders/${orderId}`, {total: updatedTotal});
        return {id, updatedTotal}
    }
    catch(err){
        console.log(err)
    }
})



const userCartSlice = createSlice({
    name:'userCart',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchUserOrderAsync.fulfilled, (state, action)=>{
            return action.payload
        })
        builder.addCase(deleteUserOrderAsync.fulfilled, (state, action) => {
            return {
              ...state,
              order_items: state.order_items.filter((item) => item.id !== action.payload.data.id),
              total: action.payload.updatedTotal
            };
        });
        builder.addCase(addToUserOrderQuantityAsync.fulfilled, (state,action)=>{
            const { id, updatedTotal } = action.payload
            const orderItemIndex = state.order_items.findIndex(item => item.id === id);
            if (orderItemIndex !== -1) {
                state.order_items[orderItemIndex].quantity++;
                state.total = updatedTotal;
            }
            return state;
        });
        builder.addCase(subtractFromUserOrderQuantityAsync.fulfilled, (state,action)=>{
            const { id, updatedTotal } = action.payload
            const orderItemIndex = state.order_items.findIndex(item => item.id === id);
            if (orderItemIndex !== -1) {
                state.order_items[orderItemIndex].quantity--;
                if (state.order_items[orderItemIndex].quantity === 0) {
                    state.order_items.splice(orderItemIndex, 1);
                }
                state.total = updatedTotal;
            }
            return state;
        })
    }
});

export const selectUserCart = (state) => state.userCart;
export default userCartSlice.reducer
