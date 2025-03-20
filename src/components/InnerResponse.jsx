import React from 'react';
import { useData } from './DataContext.jsx';
import ItemResponse from './ItemResponse.jsx';

export default function InnerResponse({ pagFilter, seachData }) {
    const { loading, error } = useData();

    // if (loading) return <div>Loading...</div>;
    // if (error) return <div>Error...</div>;

    // Проверяем, что seachData - это массив
    if (!Array.isArray(seachData)) {
        return <div>No</div>;
    }

    return (
        <div>
            <ul className='inner'>
             
                {seachData.slice((pagFilter - 1) * 10, pagFilter * 10).map(el => (
                    <ItemResponse key={el.id} el={el} />
                ))}
            </ul>
        </div>
    );
}
