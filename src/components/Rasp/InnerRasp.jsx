import React, { useState, useEffect } from 'react';
import RaspMain from './RaspMain.jsx';
import RaspHeader from './RaspHeader.jsx';
import { useData } from './../DataContext.jsx';
// Основной компонент


export default function InnerRasp() {
    const { data } = useData();
    const [seachData, setSeachData] = useState([])
    const [grid, setGrid] = useState(false)
    useEffect(() => {
        // Убедитесь, что data и data.rasp существуют
        if (data && data.rasp) {
            setSeachData(data.rasp);
        }
    }, [data]);
    
    return (
        <>
       
            <div className={grid ? 'container active' : 'container'}>
            <RaspHeader setSeachData={setSeachData} setGrid={setGrid}/>
             <RaspMain seachData={seachData} grid={grid} />  
            </div>
        </>
    );
}
