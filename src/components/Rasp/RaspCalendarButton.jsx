import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useData } from "../DataContext.jsx"
export default function RaspCalendarButton(){
    const {  date } = useData();
    const navigate = useNavigate();
    const generateUrl = (nameId, itemId) => {
        return `/name?id=${nameId}&item=${itemId}&date=${date}`;
    };
    const handleClick = (event) => {
        event.preventDefault(); 
        // Получаем текущие параметры из URL
        const currentParams = new URLSearchParams(location.search);
        const currentId = currentParams.get('item') || '0';
        const nameId = currentParams.get('id') || '0';
        // Формируем новый URL
        const newUrl = generateUrl(nameId, currentId);
        // Навигируем к новому URL
        navigate(newUrl);
    };

   
    return (
      
        <Link onClick={handleClick}>
          <button id="calendar_month__button">Календарь</button>
        </Link>
       
    )
}