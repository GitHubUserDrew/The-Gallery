import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";


export const getImages = createAsyncThunk("get Images", async ()=>{
    return (await axios.get("/api/")).data;
})

export const addImage = createAsyncThunk("add Image", async ({src, title})=>{
    return (await axios.post("/api/", {src , title})).data;
})

export const deleteImage = createAsyncThunk("delete Image", async (id)=>{
    await axios.delete("/api/" + id)
    return id;
})





export const gallerySlice = createSlice({
name : "gallery",
reducers:[],
initialState: [],
extraReducers: (builder)=>{
    builder.addCase(getImages.fulfilled, (state , action)=>{
        return action.payload
    })
    builder.addCase(addImage.fulfilled, (state, action)=>{

        state.unshift(action.payload)
    })
    builder.addCase(deleteImage.fulfilled, (state, action)=>{
        return state.filter(image => image._id === action.payload? false: true)
    })
}

})


export default gallerySlice.reducer