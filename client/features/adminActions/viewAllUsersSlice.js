import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState =[];

export const fetchUsersAsync = createAsyncThunk('allUsers', async()=>{
    try{
        const {data} = await axios.get(`/api/users`);
        return data;
    }
    catch (err){
        console.log(err)
    }
})

const viewAllUsersSlice = createSlice({
    name:'viewAllUsers',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchUsersAsync.fulfilled, (state,action)=>{
            return action.payload;
        })
    }
})

export const selectUsers = (state) => state.viewAllUsers;

export default viewAllUsersSlice.reducer