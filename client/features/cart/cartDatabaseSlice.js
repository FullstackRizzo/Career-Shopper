import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {};

export const getCart = createAsyncThunk("cart", async () => {
    try {
        let {data} = await axios.get(`http://localhost:8080/api/cart`);
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const addCareerToCart = createAsyncThunk(
    "cart",
    async ({ quantity, userId, careerId }) => {
        try {
            let { data } = await axios.post(`http://localhost:8080/api/cart`, {
                quantity,
                userId,
                careerId,
            });
            return data;
        } catch (error) {
            console.log(error);
        }
    }
);

const cartDatabaseSlice = createSlice({
    name: "cartDatabase",
    initialState,
    reducers: { },
    extraReducers: (builder) => {
    
        builder.addCase(addCareerToCart.fulfilled, (state, action) => {
            return action.payload;
        });
    },
});

export const selectDatabaseCart = (state) => {
    return state.cartDatabase;
}

export default cartDatabaseSlice.reducer;