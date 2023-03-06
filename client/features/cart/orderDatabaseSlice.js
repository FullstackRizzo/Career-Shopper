import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchOrderAsync = createAsyncThunk('order', async(id)=>{
    try{
        const {data} = await axios.get('http://localhost:8080/api/${userId}/${orderId}/');
        return data
    }
    catch(err){
        console.log(err);
    }
})

export const addCareerToDBCart = createAsyncThunk('addCareerToDBCart', async(career)=>{
    try{
        let {data} = await axios.post(`http://localhost:8080/api/users/1/orders`, {career});
        return data;
    }
    catch(err){
        console.log(err);
    }
})


const initialState = [];

export const orderDBSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addToCart: (state, action) => {
            state.push(action.payload);
        
        },
        // removeFromDBQuantity: (state, action) => {
        //     state.map((career) => {
        //         if (career.id == action.payload.id) {
        //             career.order_item--;
        //         }
        //     })
        // },
        // addTDBQuantity: (state, action) => {
        //     state.map((career) => {
        //         if (career.id == action.payload.id) {
        //             career.order_item++;
        //         }
        //     })
        // },
        // addToQuantity: (state, action) => {
        //     return state.map((career) => {
        //         if (career.id === action.payload.id) {
        //             return { ...career, order_item: career.order_item + 1 };
        //         }
        //         return career;
        //     });
    },
    extraReducers: (builder) => {
        builder.addCase(fetchOrderAsync.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(addCareerToDBCart.fulfilled, (state, action) => {
            return action.payload;
        });
    }
});

export const { addToCart, removeFromDBQuantity, addToDBQuantity } = orderDBSlice.actions;

export const selectDatabaseOrder = (state) => {
    return state.order.careers};

export default orderDBSlice.reducer;
