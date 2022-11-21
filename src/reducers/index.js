const initialState = {
    heroes: [],
    heroesLoadingStatus: 'idle',
    filtersLoadingStatus: 'idle',
    filters: [],
    activeFilter: 'Все'
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case 'HEROES_FETCHING':
            return {
                ...state,
                heroesLoadingStatus: 'loading'
            }
        case 'HEROES_FETCHED':
            return {
                ...state,
                heroes: action.payload,
                heroesLoadingStatus: 'idle'
            }
        case 'HEROES_FETCHING_ERROR':
            return {
                ...state,
                heroesLoadingStatus: 'error'
            }
        case 'DELETING_HERO':
            return {
                ...state,
                heroes: state.heroes.filter(i => {
                    return i.name !== action.payload
                }),
                /* filteredHeroes: state.filteredHeroes.filter(i => {
                    return i.name !== action.payload
                }) */
            }
        case 'FILTERS_FETCHING' :
            return {
                ...state,
                filtersLoadingStatus: 'loading'
            }
        case 'FILTERS_FETCHED' :
            return {
                ...state,
                filters: [...action.payload]
            }
        case 'FILTERS_FETCHING_ERROR' :
            return {
                ...state,
                filtersLoadingStatus: 'error'
            }
        case 'FILTERING_HEROES':
            return {
                ...state,
                /* filteredHeroes: action.payload === 'Все' ? state.heroes : state.heroes.filter(i => (i.element === action.payload)), */
                filtersLoadingStatus: 'idle',
                activeFilter: action.payload
            }
        case 'ADDING_HERO':
            return {
                ...state,
                heroes: [...state.heroes, action.payload],
                /* filteredHeroes: state.activeFilter === 'Все' || action.payload.element === state.activeFilter ? [...state.filteredHeroes,  action.payload] : state.filteredHeroes */
            }
        default: return state
    }
}

export default reducer;