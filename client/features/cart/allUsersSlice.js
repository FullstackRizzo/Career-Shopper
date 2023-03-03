import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = [];

export const getAllUsers = createAsyncThunk("allUsers", async () => {
    try {
        const token = window.localStorage.getItem("token");
        if (token) {
            const { data } = await axios.get("/api/users", {
                headers: { authorization: token },
            });

            return data;
        }
    } catch (error) {

        console.log(error);
    }
});

export const addUserAsync = createAsyncThunk("allUsers/addUser", async (addUser) => {
  try {
    const { data } = await axios.post('/api/users', addUser);
    return data;
  } catch (error) {
    console.log(error);
  }
});

export const deleteUserAsync = createAsyncThunk('allUsers/deleteUser', async (id) => {
  try {
    const { data } = await axios.delete(`/api/users/${id}`)
    return data
  }
  catch (error) {
    console.log(error)
  }
})

const allUsersSlice = createSlice({

name:  'allUsers',
initialState,
reducers: {},
extraReducers: (builder) => {
    builder.addCase(getAllUsers.fulfilled, (state, action) => {
        return action.payload;
    });
    builder.addCase(addUserAsync.fulfilled, (state, action) => {
      return action.payload;
    });
    builder.addCase(deleteUserAsync.fulfilled, (state, action) => {
      return state.filter(user => user.id !== action.payload.id)
    });
  }
})

export const selectUsers = (state) => {
    return state.allUsers;
};

export default allUsersSlice.reducer;