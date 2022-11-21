import { useDispatch, useSelector } from "react-redux";
import { heroAdding } from "../heroesList/heroesSlice";
import { useState } from "react";
import { v4 as uuidv4 } from 'uuid';
import { useHttp } from "../../hooks/http.hook";
import { selectAll } from "../heroesFilters/filtersSlice";
import store from "../../store";
// Задача для этого компонента:
// Реализовать создание нового героя с введенными данными. Он должен попадать
// в общее состояние и отображаться в списке + фильтроваться
// Уникальный идентификатор персонажа можно сгенерировать через uiid
// Усложненная задача:
// Персонаж создается и в файле json при помощи метода POST
// Дополнительно:
// Элементы <option></option> желательно сформировать на базе
// данных из фильтров

const HeroesAddForm = () => {
    const dispatch = useDispatch();
    const request = useHttp();
    const filters = selectAll(store.getState());
    
    const {filtersLoadingStatus} = useSelector(state => state.filters);
    const [name, setName] = useState('');
    const [description, setDescription] = useState('');
    const [element, setElement] = useState('Огонь')

    const filtersRender = (filters, status) => {

        if (status === "loading") {
            return <option>Загрузка элементов</option>
        } else if (status === "error") {
            return <option>Ошибка загрузки</option>
        }
        if (filters && filters.length > 0 ) {
            return filters.map((item, i) => {
                // eslint-disable-next-line
                if (name === 'Все')  return;

                return <option key={i} value={item}>{item.element}</option>
            })
        }
    }

    function sendHero(e) {
        e.preventDefault();
        const id = uuidv4();
        let hero = {
            id,
            name,
            description,
            element
        };
        dispatch(heroAdding(hero));
        request(`http://localhost:3001/heroes/`, "POST", JSON.stringify(hero))
        e.target.reset()
        setName('');
        setDescription('');
        setElement('Огонь');
    }

    const filtersList = filtersRender(filters, filtersLoadingStatus);

    return (
        <form className="border p-4 shadow-lg rounded" 
              onSubmit={sendHero}>
            <div className="mb-3">
                <label htmlFor="name" className="form-label fs-4">Имя нового героя</label>
                <input 
                    required
                    value={name}
                    minLength={2}
                    type="text" 
                    name="name" 
                    className="form-control" 
                    id="name" 
                    placeholder="Как меня зовут?"
                    onChange={(e) => setName(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="text" className="form-label fs-4">Описание</label>
                <textarea
                    required
                    value={description}
                    minLength={3}
                    name="text" 
                    className="form-control" 
                    id="text" 
                    placeholder="Что я умею?"
                    style={{"height": '130px'}}
                    onChange={(e) => setDescription(e.target.value)}/>
            </div>

            <div className="mb-3">
                <label htmlFor="element" className="form-label">Выбрать элемент героя</label>
                <select 
                    required
                    value={element}
                    className="form-select" 
                    id="element" 
                    name="element"
                    onChange={(e) => setElement(e.target.value)}>
                    {filtersList}
                </select>
            </div>

            <button 
                type="submit" 
                className="btn btn-primary">Создать</button>
        </form>
    )
}

export default HeroesAddForm;