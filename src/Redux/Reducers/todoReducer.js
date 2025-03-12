import { createSlice } from "@reduxjs/toolkit";

const initialState={
    Tasks:[],
}

export const todoSlice = createSlice({
    name:"todo",
    initialState,
    reducers:{
        addTask:(state, action )=>{
            state.Tasks = [...state.Tasks,action.payload]
        },
        deleteTask:(state, action )=>{
            state.Tasks.splice(action.payload,1);
        },
        editTask:(state, action )=>{
            const {id, text} = action.payload;
            state.Tasks[id] = text;
        }
    }
})

export const {addTask, deleteTask, editTask } = todoSlice.actions;
export default todoSlice.reducer;
