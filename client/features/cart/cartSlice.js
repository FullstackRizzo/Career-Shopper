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
        let { data } = await axios.get(`http://localhost:8080/api/cart/myCart`, 
            { headers: { authid: userId }
         });
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const getMyHomeCart = createAsyncThunk("myHomeCart", async (userId) => {
    try {
        let { data } = await axios.get(
            `http://localhost:8080/api/cart/myHomeCart`,
            { headers: { authid: userId } }
        );
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const getMyOrders = createAsyncThunk("myOrders", async (userId) => {
    try {
        let { data } = await axios.get(
            `http://localhost:8080/api/cart/myOrders`,
            { headers: { authid: userId } }
        );
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

        export const editCareerInDBCart = createAsyncThunk(
            "editCart", async ({id, careerId, quantity, completed}) => {
                try {
                    const { data } = await axios.put(`/api/cart/${id}`, {
                        careerId,
                        quantity,
                        completed,
                    });
                    return data;
                } catch (error) {
                    console.log(error);
                }
            });

   
    const cartSlice = createSlice({
        name: "cart slice",
        initialState,
        reducers: {
            addToQuantity(state, action) {
                state.map((career) => {
                    if (action.payload.id == career.id) career.quantity++;
                });
            },
            removeToQuantity(state, action) {
                state.map((career) => {
                    if (action.payload.id == career.id && career.quantity > 0) career.quantity--;
                });
            },
            addToCart (state, action) {
                state.push(action.payload);
            },

            removeFromCart (state, action) {
                return state.filter((career) => {
                    return career.id !== action.payload;
                });
            },

            checkoutCartSlice (state, action) {
                return initialState;
            }

        },
        extraReducers: (builder) => {
            builder.addCase(addCareerToCart.fulfilled, (state, action) => {
                return [...state, action.payload];
            });

            builder.addCase(getMyCart.fulfilled, (state, action) => {
                // console.log(action, '------------action')
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
            builder.addCase(editCareerInDBCart.fulfilled, (state, action) => {
                return state.map((cart) => {
                    if (cart.id == action.payload.id) cart = action.payload;
                    return cart;
                });
            });
       
            builder.addCase(getMyHomeCart.fulfilled, (state, action) => {
                return action.payload 
            });
        },
    });

    export const { addToCart, checkoutCartSlice, removeFromCart, addToQuantity, removeToQuantity } = cartSlice.actions;
    export const selectGetCart = (state) => {
        return state.cart;
    };
    export default cartSlice.reducer;