import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react'

export const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({baseUrl: 'http://localhost:3001'}),
    tagTypes: ['Heroes'], //связывание мутации и данных из запроса
    endpoints: builder => ({
        getHeroes: builder.query({
            query: () => '/heroes',
            providesTags: ['Heroes'] //связывание мутации и данных из запроса
        }),
        createHero: builder.mutation({
            query: hero => ({
                url: '/heroes',
                method: "POST",
                body: hero
            }),
            invalidatesTags:['Heroes'] //связывание мутации и данных из запроса
        }),
        deleteHero: builder.mutation({
            query: id => ({
                url: `/heroes/${id}`,
                method: 'DELETE'
            }),
            invalidatesTags: ['Heroes']
        }),
        getFilters: builder.query({
            query: () => '/filters'
        })
    })
})

export const {useGetHeroesQuery, useGetFiltersQuery, useCreateHeroMutation, useDeleteHeroMutation} = apiSlice;