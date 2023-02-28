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

const viewCareersSlice = createSlice({
    name:'viewCareers',
    initialState,
    reducers: {},
    extraReducers:(builder) => {
        builder.addCase(fetchCareersAsync.fulfilled, (state,action)=>{
            return action.payload;
        });
    },
});

export const selectCarrers = (state) => state.viewCareers;

export default viewCareersSlice.reducer
