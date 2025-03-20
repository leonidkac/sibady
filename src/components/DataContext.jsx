import { createContext, useEffect, useState, useContext } from 'react';
import { useLocation, useNavigate  } from 'react-router-dom'; // Импортируем useLocation
import { PAGE_URL_HASH } from './object/PageUrlHash';
import GetDate from './object/GetDate'; 

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const navigate = useNavigate();
    const [data, setData] = useState([]);
    const [date, setDate] = useState(GetDate())
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const location = useLocation(); // Используем useLocation для получения текущего URL

    const fetchData = async (url) => {
        setLoading(true); // Устанавливаем индикатор загрузки
        setError(null); // Сбрасываем ошибки перед новым запросом
        try {
            const response = await fetch(url);
            if (!response.ok) {
                throw new Error(`Ошибка сети: ${response.status} ${response.statusText}`);
            }
            const result = await response.json();
            setData(result.data);
        } catch (error) {
            console.error('Ошибка при загрузке данных:', error);
            setError(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search); // Используем location.search
        const id = queryParams.get('id');
        const item = queryParams.get('item')
        const dateid = queryParams.get('date')
        const weekid = queryParams.has('week')
        const rewiev = queryParams.has('rewiev')
        if (id && PAGE_URL_HASH[id] && !item) { // Проверяем, что id существует в PAGE_URL_HASH
            let newUrl = PAGE_URL_HASH[id].url; // Получаем новый URL по id
            fetchData(newUrl); // Загружаем данные по новому URL
        }
        else if(item && !dateid && !weekid && !rewiev) {

            let newUrl = `https://umu.sibadi.org/api/Rasp?id${PAGE_URL_HASH[id].shortsAPI}=${item}&sdate=${date}`   
            fetchData(newUrl);
        }
        else if(dateid || weekid || rewiev) {
            let newUrl = `https://umu.sibadi.org/api/Rasp?id${PAGE_URL_HASH[id].shortsAPI}=${item}`
            fetchData(newUrl);
            
        }
    }, [location.search, date]); // Зависимость от location.search
    const handleDateChange = (date) => {
        setDate(date); // Обновляем состояние выбранной даты
    };
    return (
        <DataContext.Provider value={{ data, loading, error, handleDateChange, date }}>
            {children}
        </DataContext.Provider>
    );
};

export const useData = () => {
    return useContext(DataContext);
};
