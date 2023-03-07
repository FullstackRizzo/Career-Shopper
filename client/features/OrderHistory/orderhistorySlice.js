import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = [];

export const getOrderHistory = createAsyncThunk('myOrders', async () => {
 try {
    let {data} = await axios.get(`/api/orders/completed`);
    return data;
 }
    catch (err) {
        console.log(err);
    }
});

const orderHistorySlice = createSlice({
    name: 'orderHistory',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getOrderHistory.fulfilled, (state, action) => {
            return action.payload;
        });
    }
});

export const selectOrderHistory = (state) => {
    return state.orderHistory;
};
export default orderHistorySlice.reducer;