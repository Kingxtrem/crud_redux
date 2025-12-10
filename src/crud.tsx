import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

type CrudState = {
    value: string[];
};

const initialState: CrudState = {
    value: [],
};

export const crudSlice = createSlice({
    name: "crud",
    initialState,
    reducers: {
        addTask: (state, action: PayloadAction<string>) => {
            state.value.push(action.payload);
        },
        deleteTask: (state, action: PayloadAction<number>) => {
            state.value.splice(action.payload, 1);
        },
        updateTask: (
            state,
            action: PayloadAction<{ index: number; task: string }>
        ) => {
            state.value.splice(action.payload.index, 1, action.payload.task);
        },
    },
});

export const { addTask, deleteTask, updateTask } = crudSlice.actions;
export default crudSlice.reducer;