import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const addCareerToOrder = createAsyncThunk(
    "order",
    async ({quantity, userId, careerId}) => {
        try {
            let { data } = await axios.post(`http://localhost:8080/api/order`, {
                quantity,
                userId,
                careerId,
        });
        return data;
    } catch (error) {
        console.log(error);
    }
});

export const getMyOrder = createAsyncThunk("myOrder", async (userId) => {
    try {
        let { data } = await axios.get(`http://localhost:8080/api/order/myOrder`, 
            { headers: { authid: userId }
         });
        return data;
    } catch (error) {
        console.log(error);
    }
});

    export const checkoutOrder = createAsyncThunk(
        "checkoutOrder",
        async ({id, userId, careerId, quantity, completed}) => {
            try {
                let { data } = await axios.put(`/api/order/${id}`, {
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

    export const deleteCareerFromOrder = createAsyncThunk(
        "deleteOrder", async ({id}) => {
            try {
                const { data } = await axios.delete(`/api/order/${id}`);
                return data;
            } catch (error) {   
                console.log(error);
            }
        });

        export const editCareerInDBOrder = createAsyncThunk(
            "editOrder", async ({id, careerId, quantity, completed}) => {
                try {
                    const { data } = await axios.put(`/api/order/${id}`, {
                        careerId,
                        quantity,
                        completed,
                    });
                    return data;
                } catch (error) {
                    console.log(error);
                }
            });

   
    const orderSlice = createSlice({
        name: "order slice",
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
            addToOrder (state, action) {
                state.push(action.payload);
            },

            removeFromOrder (state, action) {
                return state.filter((career) => {
                    return career.id !== action.payload;
                });
            },

            checkoutOrderSlice (state, action) {
                return initialState;
            }

        },
        extraReducers: (builder) => {
            builder.addCase(addCareerToOrder.fulfilled, (state, action) => {
                return [...state, action.payload];
            });

            builder.addCase(getMyOrder.fulfilled, (state, action) => {

                return action.payload.map((order) => {
                    order.career["quantity"] = order.quantity;
                    order.career["orderId"] = order.id;
                    return order.career;
                });
            });
          
            builder.addCase(checkoutOrder.fulfilled, (state, action) => {
                return initialState;
            });
            builder.addCase(deleteCareerFromOrder.fulfilled, (state, action) => {
                return state.filter((career) => {
                    return career.id !== action.payload;
                });
            });
            builder.addCase(editCareerInDBOrder.fulfilled, (state, action) => {
                return state.map((order) => {
                    if (order.id == action.payload.id) order = action.payload;
                    return order;
                });
            });
        },
    });

    export const { addToOrder, checkoutOrderSlice, removeFromOrder, addToQuantity, removeToQuantity } = orderSlice.actions;
    export const selectGetOrder = (state) => {
        return state.order;
    };
    export default orderSlice.reducer;