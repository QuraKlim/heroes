/* import {heroesFetching, heroesFetched, heroesFetchingError} from '../components/heroesList/heroesSlice'
import { filtersFetching, filtersFetched, filtersFetchingError } from '../components/heroesFilters/filtersSlice'; */

/* export const fetchHeroes = (request) => (dispatch) => {
    dispatch(heroesFetching());
    request("http://localhost:3001/heroes")
        .then(data => dispatch(heroesFetched(data)))
        .catch(() => dispatch(heroesFetchingError()))
}

export const fetchFilter = (request) => (dispatch) => {
    dispatch(filtersFetching());
    request("http://localhost:3001/filters")
        .then(data => dispatch(filtersFetched(data)))
        .catch(dispatch(filtersFetchingError()))
} */

/* export const heroesFetching = () => {
    return {
        type: 'HEROES_FETCHING'
    }
}

export const heroesFetched = (heroes) => {
    return {
        type: 'HEROES_FETCHED',
        payload: heroes
    }
}

export const heroesFetchingError = () => {
    return {
        type: 'HEROES_FETCHING_ERROR'
    }
}

export const heroDeleting = (name) => {
    return {
        type: 'DELETING_HERO',
        payload: name
    }
} */
/* export const heroAdding = (newHero) => {
    return {
        type: 'ADDING_HERO',
        payload: newHero
    }
} */

/* export const filtersFetching = () => {
    return {
        type: 'FILTERS_FETCHING'
    }
} */



/* export const filtersFetched = (data) => {
    
    return {
        type: 'FILTERS_FETCHED',
        payload: data
    }
}

export const filtersFetchingError = () => {
    return {
        type: 'FILTERS_FETCHING_ERROR'
    }
}

export const filteringHeroes = (element) => {
    console.log(element)
    return {
        type: 'FILTERING_HEROES',
        payload: element
    }
}

 */