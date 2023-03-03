import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {};

export const getSingleUser = createAsyncThunk("singleUser", async (id) => {
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

export const editSingleUser = createAsyncThunk(
    "singleUser/edit",
    async ({
        id,
        username,
        password,
     
    }) => {
        try {
            const { data } = await axios.put(`/api/users/${id}`, {
                username,
                password,
            });
            return data;
        } catch (err) {
            console.log(err);
        }
    }
);

export const addUserAsync = createAsyncThunk("addUser", async (addUser) => {
    try {
      const { data } = await axios.post('/api/users', addUser);
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
        builder.addCase(getSingleUser.fulfilled, (state, action) => {
            return action.payload;
        });
        builder.addCase(editSingleUser.fulfilled, (state, action) => {
            return action.payload;
        });

        builder.addCase(addUserAsync.fulfilled, (state, action) => {
            return action.payload;
          });
    }
});

export const selectSingleUser = (state) => {
    return state.singleUser;
}

export default singleUserSlice.reducer;
