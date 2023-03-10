import { createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState= [];

export const fetchCareersAsync = createAsyncThunk('allCareers', async()=>{
    try{
        const {data} = await axios.get(`/api/careers`);
        return data;
    }
    catch (err){
        console.log(err);
    }
})

export const deleteCareerAsync = createAsyncThunk('deleteCareer', async (id)=>{
    try{
        const {data} = await axios.delete(`/api/singlecareer/${id}`);
        return data;
    }
    catch(err){
        console.log(err)
    }
})

export const addCareerAsync = createAsyncThunk('addCareer', async({name, salary, timeOfCompletion, description, cost, imageUrl, category})=>{
    try{
        const {data} = await axios.post(`/api/careers`, {
            name,
            salary,
            timeOfCompletion,
            description,
            cost,
            imageUrl,
            category,
        });
        return data;
    }
    catch(err){
        console.log(err)
    }
})

const viewCareersSlice = createSlice({
    name:'viewCareers',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(fetchCareersAsync.fulfilled, (state,action)=>{
            return action.payload;
        });
        builder.addCase(deleteCareerAsync.fulfilled, (state,action)=>{
            const newState = state.filter((career)=> career.id !== action.payload.id);
            return newState;
        });
        builder.addCase(addCareerAsync.fulfilled, (state,action)=>{
            state.push(action.payload);
        })
    },
});

export const selectCarrers = (state) => state.viewCareers;

export default viewCareersSlice.reducer
