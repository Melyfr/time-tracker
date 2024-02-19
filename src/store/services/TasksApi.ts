import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import ITask from '../../interfaces/ITask';
import IUser from "../../interfaces/IUser";
import { LoginInputs } from "../../components/LogIn";
import { SignupInputs } from "../../components/SignUp";

export const tasksApi = createApi({
    reducerPath: 'tasksApi',
    baseQuery: fetchBaseQuery({baseUrl: 'https://time-tracker-back-us2m.onrender.com'}),
    tagTypes: ['Task'],
    endpoints: (builder) => ({
        getTasks: builder.query<ITask[], string>({
            query: (accessToken) => ({url: `/tasks/${accessToken}`}),
            providesTags: ['Task'],
        }),
        saveTime: builder.mutation<ITask, ITask>({
            query: (body) => ({
                url: '/savetime',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Task'],
        }),
        saveTask: builder.mutation<ITask[], ITask>({
            query: (body) => ({
                url: '/savetask',
                method: 'POST',
                body,
            }),
            invalidatesTags: ['Task'],
        }),
        deleteTask: builder.mutation<ITask[], ITask>({
            query: (body) => ({
                url: '/deletetask',
                method: 'DELETE',
                body,
            }),
            invalidatesTags: ['Task'],
        }),
        loginUser: builder.mutation<IUser, LoginInputs>({
            query: (body) => ({
                url: '/login',
                method: 'POST',
                body,
            }),
        }),
        signupUser: builder.mutation<string, SignupInputs>({
            query: (body) => ({
                url: '/signup',
                method: 'POST',
                body,
            }),
        }),
    })
});