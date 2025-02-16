import { createSlice } from "@reduxjs/toolkit";
export const crudSlice = createSlice({
    name: "crud",
    initialState: {
        value: []

    },
    reducers: {
        addtask: (state, action) => {
            state.value.push(action.payload);
        },
        deletetask:(state,action)=>{
            state.value.splice(action.payload,1);
        },
        updatetask:(state,action)=>{
            state.value.splice(action.payload.index,1,action.payload.task);

        }
        
    }
});
export const {addtask,deletetask,updatetask} = crudSlice.actions;
export default crudSlice.reducer;