import React, { useState } from 'react';
import { useData } from './DataContext.jsx';

export default function SeachResponse({setSeachData, setPagFilter }) {
    const { data } = useData();
    const [active, setActive] = useState(false)
    const inputSeach = (e) => {
        setPagFilter(1)
        let inputValue = e.target.value.toLowerCase();
        if (data) { 
            const filArr = data.filter(el => 
                el.name.toLowerCase().includes(inputValue)
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
        <div className="seach-response">
            <input 
                type="text" 
                onChange={inputSeach} 
                id='seachResponse'
                onFocus={activeHandle}
                onBlur={offActiveHandle}
                placeholder={active ? 'Введите текст для поиска...' : null}
            />
            <label htmlFor="seachResponse" className={active ? 'active' : null}>Поиск</label>
        </div>
        </>
    );
}