import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchSingleCareerAsync = createAsyncThunk('singleCareer', async(id)=>{
    try{
        const {data} = await axios.get(`/api/singlecareer/${id}`)
        return data;
    }
    catch(err){
        console.log(err)
    }
});

export const editSingleCareerAsync = createAsyncThunk('editSingleCareer', async({ id, name, salary, timeOfCompletion, description, cost, imageUrl, category }) => {
    try {
        const updateFields = {};
        if (name) updateFields.name = name;
        if (salary) updateFields.salary = salary;
        if (timeOfCompletion) updateFields.timeOfCompletion = timeOfCompletion;
        if (description) updateFields.description = description;
        if (cost) updateFields.cost = cost;
        if (imageUrl) updateFields.imageUrl = imageUrl;
        if (category) updateFields.category = category;
        const { data } = await axios.put(`/api/singlecareer/${id}`, updateFields);
        return data;
    } catch (err) {
        console.log(err)
    }
});

const initialState = {};

const singleCareerDetailsSlice = createSlice({
    name: 'singleCareerDetails',
    initialState,
    reducers: {},
    extraReducers: (builder)=>{
        builder.addCase(fetchSingleCareerAsync.fulfilled, (state,action)=>{
            return action.payload
        })
        builder.addCase(editSingleCareerAsync.fulfilled, (state,action)=>{
            return action.payload
        })
    }
})

export const selectSingleCareer= (state)=>{
    return state.singleCareerDetails;
}

export default singleCareerDetailsSlice.reducer