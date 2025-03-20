
import ItemRasp from './ItemRasp.jsx';
export default function RaspMain({seachData, grid}){
    
        // Проверяем, что data и data.rasp существуют и являются массивом
        if (!seachData || !Array.isArray(seachData)) {
            return <div>Loading or no data available...</div>; // Сообщение о загрузке или отсутствии данных
        }
    
        // Получаем уникальные дни и даты
       
    
    const filter_day = Array.from(new Set(seachData.map(el => el.день_недели)));
    const filter_date = Array.from(new Set(seachData.map(el => {
        return new Date(el.дата).toISOString().split('T')[0]; // Формат YYYY-MM-DD
    })));
    return (
        <>
        <div className={grid ? 'rasp-container active' : null}>
        {filter_day.map((day, id) => (
        <div key={id}>
            <div className="day_weekend" >
                <h2>{day}</h2>
                <h2>{filter_date[id]}</h2>
            </div>
            <ul className='day_weekend-inner'>
                {seachData.filter(el => el.день_недели === day).map(el => (
                    <li key={el.код}>
                        <ItemRasp el={el} />
                    </li>
                ))}
            </ul>
        </div>
    ))}
        </div>
   
    </>
)
}