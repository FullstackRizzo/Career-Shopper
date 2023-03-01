import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const addCareerToCart = createAsyncThunk(
    "cart",
    async ({quantity, userId, careerId}) => {
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
});

export const getMyCart = createAsyncThunk("myCart", async (userId) => {
    try {
        let { data } = await axios.get(`http://localhost:8080/api/cart/myCart`, {
            userId,
        });
        return data;
    } catch (error) {
        console.log(error);
    }
});

    export const checkoutCart = createAsyncThunk(
        "checkoutCart",
        async ({id, userId, careerId, quantity, completed}) => {
            try {
                let { data } = await axios.put(`/api/cart/${id}`, {
                    userId,
                    careerId,
                    quantity,
                    completed,
                });
                return data;
            } catch (error) {
                console.log(error);
            }
        });

    export const deleteCareerFromCart = createAsyncThunk(
        "deleteCart", async ({id}) => {
            try {
                const { data } = await axios.delete(`/api/cart/${id}`);
                return data;
            } catch (error) {   
                console.log(error);
            }
        });

    const cartSlice = createSlice({
        name: "cart slice",
        initialState,
        reducers: {
            addToCart (state, action) {
                state.push(action.payload);
            }
        },
        extraReducers: (builder) => {
            builder.addCase(addCareerToCart.fulfilled, (state, action) => {
                return [...state, action.payload];
            });
            builder.addCase(getMyCart.fulfilled, (state, action) => {
                return action.payload.map((cart) => {
                    cart.career["quantity"] = cart.quantity;
                    cart.career["cartId"] = cart.id;
                    return cart.career;
                });
            });
          
            builder.addCase(checkoutCart.fulfilled, (state, action) => {
                return initialState;
            });
            builder.addCase(deleteCareerFromCart.fulfilled, (state, action) => {
                return state.filter((career) => {
                    return career.id !== action.payload;
                });
            });
        }
    });

    export const { addToCart } = cartSlice.actions;
    export const selectGetCart = (state) => {
        return state.cart;
    };
    export default cartSlice.reducer;