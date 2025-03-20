import React, { useState } from 'react';
import { useData } from '../DataContext.jsx';

export default function RaspSeach({ setSeachData }) {
    const { data } = useData();
    const [active, setActive] = useState(false)
    const inputSeach = (e) => {
        let inputValue = e.target.value.toLowerCase();
        // Проверяем, что data и data.rasp определены
        if (data && data.rasp) { 
            const searchFields = ['дисциплина', 'преподаватель', 'группа'];
            const filArr = data.rasp.filter(el =>  
                searchFields.some(field => 
                  el[field] && el[field].toLowerCase().includes(inputValue)
                )
            );
            setSeachData(filArr); 
        } else {
            setSeachData([]); 
        }
    };
    const activeHandle = () => {
        setActive(true)
    }
    const offActiveHandle = () => {
        setActive(false)
    }
    return (
        <>
        <div className="seachRasp"  >
        <input 
                type="text" 
                onChange={inputSeach}
                onFocus={activeHandle}
                onBlur={offActiveHandle}
                id='input-search-rasp' 
                placeholder={active ? 'Введите текст для поиска...' : null}
            />
            <label 
            htmlFor="input-search-rasp" 
            className={active ? 'active' : null}
            >Поиск</label>
        </div>
            

        </>
    );
}
