import {createSlice, createAsyncThunk, createEntityAdapter, createSelector } from '@reduxjs/toolkit'
import { useHttp } from '../../hooks/http.hook'

const heroesAdapter = createEntityAdapter();

/* const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle'
} */

const initialState = heroesAdapter.getInitialState({
    heroesLoadingStatus: 'idle'
});

export const fetchHeroes = createAsyncThunk(
    'heroes/fetchHeroes',
    async () => {
        const request = useHttp();
        /* dispatch(heroesFetching()); */
        return request("http://localhost:3001/heroes")
            /* .then(data => dispatch(heroesFetched(data)))
            .catch(() => dispatch(heroesFetchingError())) */
    }
)

const heroesSlice = createSlice({
    name: 'heroes',
    initialState,
    reducers: {
        /* heroesFetching: state => {state.heroesLoadingStatus = 'loading'},
        heroesFetched: (state, action) => {
            state.heroes = action.payload
            state.heroesLoadingStatus = 'idle'
        },
        heroesFetchingError : state => {state.heroesLoadingStatus = 'error'}, */
        heroAdding: (state, action) => {heroesAdapter.addOne(state, action.payload)},
        heroDeleting: (state, action) => {heroesAdapter.removeOne(state, action.payload)}
    },
    extraReducers: builder => {
        builder.addCase(fetchHeroes.pending, state => {state.heroesLoadingStatus = 'loading'})
        .addCase(fetchHeroes.fulfilled, (state, action) => {
            state.heroesLoadingStatus = 'idle'
            heroesAdapter.setAll(state, action.payload)
        })
        .addCase(fetchHeroes.rejected, state => {state.heroesLoadingStatus = 'error'})
        .addDefaultCase(() => {})
    }
})

const {actions, reducer} = heroesSlice;

export default reducer;

const {selectAll} = heroesAdapter.getSelectors(state => state.heroes);

export const filteredHeroesSelector = createSelector(
    (state) => state.filters.activeFilter,
    selectAll,
    (filter, heroes) => {
        if (filter === 'Все') {
            return heroes
        } else {
            return heroes.filter(i => (i.element === filter))
        }
    }
);

export const {
    /* heroesFetching,
    heroesFetched,
    heroesFetchingError, */
    heroAdding,
    heroDeleting
} = actions;
