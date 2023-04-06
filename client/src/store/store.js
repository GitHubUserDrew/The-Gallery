import {configureStore} from "@reduxjs/toolkit"
import gallerySlice from "./gallerySlice";
import  authSlice  from "./authSlice";



const store = configureStore({
   reducer:{
    gallery:gallerySlice,
    auth:authSlice
   }
})


export default store;