import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {};

export const getSingleUSer = createAsyncThunk("singleUser", async (id) => {
    try { 
        const token = window.localStorage.getItem("token");
        const {data} = await axios.get(`/api/users/${id}`, {
            headers: { authorization: token },
        });
        return data;
    } catch (error) {
        console.log(error);
    }
});

const singleUserSlice = createSlice({
    name: "singleUser",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(getSingleUSer.fulfilled, (state, action) => {
            return action.payload;
        });
    }
});

export const selectSingleUser = (state) => {
    return state.singleUser;
}

export default singleUserSlice.reducer;
