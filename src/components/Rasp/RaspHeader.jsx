import BackToHistory from "./BackToHistory";
import RaspSeach from "./RaspSeach";
import { useEffect, useState } from "react";
import { useData } from "../DataContext";
import { useLocation } from "react-router-dom";
import { PAGE_URL_HASH } from "../object/PageUrlHash";
import RaspGrid from "./RaspGrid";
import RaspDate from "./RaspDate";
import RaspCalendarButton from "./RaspCalendarButton";
import RaspRewievButton from "./RaspRewievButton";
export default function RaspHeader({ setSeachData, setGrid }) {
    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const getIdParams = queryParams.get('id');
    const [page, setPage] = useState(null); 
    const [year, setYear] = useState(null); 
    const pages = PAGE_URL_HASH[getIdParams]?.page; 
    function firstUpper(str){
        return str[0].toUpperCase() + str.slice(1)
    }
    const { data } = useData();
    const pagesUpper = firstUpper(pages)
    useEffect(() => {
        if (data && data.rasp && data.rasp.length > 0) {
            setSeachData(data.rasp);
            setPage(data.rasp[0]);
            setYear(data.rasp[0].учебныйГод)
            document.title = data.rasp[0][pages] + ' - ' +'Расписание'
        }
    }, [data, setSeachData]);

    return (
        <>
            <div className="header">
                <div className="header-back-seach">
                    <div className="header-back">
                        <BackToHistory /> <span>Расписание</span>
                    </div>
                    <div className="header-seach">
                        <RaspSeach setSeachData={setSeachData} />
                        <RaspGrid setGrid={setGrid}/>
                    </div>
                </div>
                <div className="header-page">
                    <p>{pagesUpper} : {page ? page[pages] : 'Нет данных'}</p>
                    <p>Учебный год:{year}</p>
                </div>
                <div className="header-date">
                    <div>
                       <RaspDate/>
                    </div>
                    <div>
                      <RaspCalendarButton/>
                    </div>
                    <div>
                    <RaspRewievButton/>
                    </div>
                </div>
                
            </div>
        </>
    );
}
