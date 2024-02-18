import { createSlice } from "@reduxjs/toolkit";

const menuSlice  = createSlice({
    name:"menu",
    initialState:{
        isMenuOpen:true,
    },
    reducers:{
        toggleMenu: (state) => {
            
            state.isMenuOpen = !state.isMenuOpen;
        },
        toggleOpen: (state) => {
            state.isMenuOpen = true;
        },
    }
});

export const {toggleMenu,toggleOpen} = menuSlice.actions;
export default menuSlice.reducer;