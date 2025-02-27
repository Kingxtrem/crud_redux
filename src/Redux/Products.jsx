import {createSlice} from "@reduxjs/toolkit"
 
const initialState = { 
    products: []
}   

const productsSlice = createSlice({
    name: "products",
    initialState,       

    reducers: {     
        
        GetProducts: (state, action) => {
            return{...state, products: action.payload}
        },
    }
})

export const {GetProducts} = productsSlice.actions
export default productsSlice.reducer