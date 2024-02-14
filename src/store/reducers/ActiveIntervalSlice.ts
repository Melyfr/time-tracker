import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export enum interval {
    day = 'day',
    week = 'week',
    month = 'month'
}

interface activeIntervalState {
    activeInterval: interval
}

const initialState:activeIntervalState = {
    activeInterval: interval.day
}

export const activeIntervalSlice = createSlice({
    name: 'activeInterval',
    initialState,
    reducers: {
        setActiveInterval(state, action: PayloadAction<interval>) {
            state.activeInterval = action.payload;
        }
    }
});

export default activeIntervalSlice.reducer;