import React, { useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';

const ItemResponse = ({ el }) => {
    const navigate = useNavigate();
    const generateUrl = (currentId, itemId) => {
        return `/name?id=${currentId}&item=${itemId}`;
    };
    const handleClick = (event) => {
        event.preventDefault(); 
        // Получаем текущие параметры из URL
        const currentParams = new URLSearchParams(location.search);
        const currentId = currentParams.get('id') || '0'; 
        // Формируем новый URL
        const newUrl = generateUrl(currentId, el.id);
        // Навигируем к новому URL
        navigate(newUrl);
    };

    // Используем useMemo для кэширования URL
    const linkUrl = useMemo(() => `/name?id=${el.id}`, [el.id]);

    return (
        <li>
            <div className='item'>
                <Link to={linkUrl} onClick={handleClick}>
                    {el.name}
                </Link>
            </div>
        </li>
    );
};

export default ItemResponse;
