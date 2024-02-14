import { combineReducers, configureStore } from "@reduxjs/toolkit";
import  activeCardReducer from "./reducers/ActiveTaskSlice";
import activeIntervalReducer from "./reducers/ActiveIntervalSlice";
import { tasksApi } from "./services/TasksApi";

const rootReducer = combineReducers({
    activeCardReducer,
    activeIntervalReducer,
    [tasksApi.reducerPath]: tasksApi.reducer,
});

const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(tasksApi.middleware),
})

export type RootState = ReturnType<typeof rootReducer>
export default store;