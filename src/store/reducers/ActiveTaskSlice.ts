import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface activeTaskState {
    activeTask: number
}

const initialState:activeTaskState = {
    activeTask: -1
}

export const activeTaskSlice = createSlice({
    name: 'activeTask',
    initialState,
    reducers: {
        togleActiveTask(state, action: PayloadAction<number>) {
            if (state.activeTask === action.payload) {
                state.activeTask = -1;
            } else {
                state.activeTask = action.payload;
            }
        }
    }
});

export default activeTaskSlice.reducer;