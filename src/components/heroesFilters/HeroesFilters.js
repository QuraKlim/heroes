import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import classNames from 'classnames'
import { filteringHeroes } from "./filtersSlice";
import { fetchFilters } from "./filtersSlice";
import Spinner from "../spinner/Spinner";
import { selectAll } from "./filtersSlice";
import store from "../../store";


// Задача для этого компонента:
// Фильтры должны формироваться на основании загруженных данных
// Фильтры должны отображать только нужных героев при выборе
// Активный фильтр имеет класс active
// Изменять json-файл для удобства МОЖНО!
// Представьте, что вы попросили бэкенд-разработчика об этом

const HeroesFilters = () => {

    

    const {activeFilter, heroesLoadingStatus} = useSelector(state => state.filters)
    const dispatch = useDispatch();
    const filters = selectAll(store.getState());
    console.log(filters)

    useEffect(() => {
        dispatch(fetchFilters())
            // eslint-disable-next-line
    }, [])

    if (heroesLoadingStatus === "loading") {
        return <Spinner/>;
    } else if (heroesLoadingStatus === "error") {
        return <h5 className="text-center mt-5">Ошибка загрузки</h5>
    }

    const filtersRender = (filters) => {
        
        if (filters.length === 0) {
            return <h5 className="text-center mt-5">Фильтров нет</h5>
        }

        

        return filters.map((item, i) => {
            const btnClass = classNames('btn', item.className, {'active': item.element === activeFilter});
            return <button 
                        key={i} 
                        className={btnClass}
                        onClick={() => dispatch(filteringHeroes(item.element))}>{item.element}</button>
        })
    }

    return (
        <div className="card shadow-lg mt-4">
            <div className="card-body">
                <p className="card-text">Отфильтруйте героев по элементам</p>
                <div className="btn-group">
                    {filtersRender(filters)}
                </div>
            </div>
        </div>
    )
}

export default HeroesFilters;