const initialState = {
    filtersLoadingStatus: 'idle',
    filters: [],
    activeFilter: 'Все'
}

const filters = (state = initialState, action) => {
    switch (action.type) {
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
                filtersLoadingStatus: 'idle',
                activeFilter: action.payload
            }
        default: return state
    }
}

export default filters;