import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';
import { getCartFromLocalStorage, saveCartToLocalStorage } from '../../../server/localStorage/localStorage';

export const fetchGuestOrderAsync = createAsyncThunk('guestOrder', async()=>{
    try{
        const data = getCartFromLocalStorage()
        return data;
    }
    catch(err){
        console.log(err);
    }
})

export const deleteGuestOrderAsync = createAsyncThunk('deleteGuestOrder', async(id)=>{
    try{
        const data  = getCartFromLocalStorage();
        const itemIndex = data.findIndex(item => item.career.id === id);
        if (itemIndex !== -1){
            data.splice(itemIndex, 1);
        }
        saveCartToLocalStorage(data);
        return data;
    }
    catch(err){
        console.log(err)
    }
})

export const addToOrderQuantityAsync = createAsyncThunk('addToOrderQuantity', async(id)=>{
    try{
        const data = getCartFromLocalStorage();
        const itemIndex = data.findIndex(item => item.career.id === id);
        data[itemIndex].quantity++;
        saveCartToLocalStorage(data);
        return data;
    }
    catch(err){
        console.log(err)
    }
})

export const subtractFromOrderQuantityAsync = createAsyncThunk('subtractfromOrderQuantity', async(id)=>{
    try{
        const data = getCartFromLocalStorage();
        const itemIndex = data.findIndex(item => item.career.id === id);
        if(itemIndex!== -1){
            if(data[itemIndex].quantity === 1){
                data.splice(itemIndex, 1);
            }
            else{
                data[itemIndex].quantity--;
            }
        }
        saveCartToLocalStorage(data);
        return data;
    }
    catch(err){
        console.log(err)
    }
})

export const addToUserCartAsync = createAsyncThunk('addToUserCartAsync', async({userId, career}) => {
    try {
        const userRes = await axios.get(`/api/users/${userId}`);
        const user = userRes.data;

        const ordersRes = await axios.get(`/api/orders`);
        const orders = ordersRes.data;

        const orderItemsRes = await axios.get(`/api/orderitems`);
        const orderItems = orderItemsRes.data;

        const hasUserOrder = orders.some((order) => order.userId === user.id);
        let orderId;

        if(!hasUserOrder){
            const orderRes = await axios.post(`/api/orders`,{
                userId: user.id
            });
            orderId = orderRes.data.id
        }
        else{
            const userOrder = orders.find((order)=> order.userId === user.id);
            orderId = userOrder.id;
        }

        const existingOrderItem = orderItems.find((item) => item.orderId === orderId && item.careerId === career.id);
        if (existingOrderItem) {
            await axios.put(`/api/orderitems/${existingOrderItem.id}`, {
                quantity: existingOrderItem.quantity + 1
            });
        } else {
            await axios.post('/api/orderitems',{
                orderId: orderId,
                careerId: career.id,
                quantity: 1
            });
        }
       
    } catch(err){
        console.log(err)
      }
})

const initialState = [];

const cartSlice = createSlice({
    name:'cart',
    initialState,
    reducers:{},
    extraReducers:(builder)=>{
        builder.addCase(fetchGuestOrderAsync.fulfilled,(state,action)=>{
            return action.payload
        });
        builder.addCase(deleteGuestOrderAsync.fulfilled, (state,action)=>{
            const newState = state.filter((item)=> {
                return action.payload.some(payloadItem => payloadItem.career.id === item.career.id)
            });
            return newState;
        });
        builder.addCase(addToOrderQuantityAsync.fulfilled, (state,action)=>{
            const newState = action.payload;
            return newState;
        });
        builder.addCase(subtractFromOrderQuantityAsync.fulfilled, (state,action)=>{
            const newState = action.payload;
            return newState;
        });
    }
})

export const selectCart = (state) => state.cart;
export default cartSlice.reducer