import { PAGE_URL_HASH } from "../object/PageUrlHash";
import { useData } from "../DataContext";
import BackToHistory from "../Rasp/BackToHistory";
import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import RewievButtonMonth from "./RewiewButtonMonth";
import RewievButtonGroup from "./RewiewButtonGroup";
import RewievButtonDic from "./RewiewButtonDic";
export default function RewievHeader() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const getIdParams = queryParams.get("id");
  const [page, setPage] = useState(null);
  const [year, setYear] = useState(null);
  const pages = PAGE_URL_HASH[getIdParams]?.page;
  function firstUpper(str) {
    return str[0].toUpperCase() + str.slice(1);
  }
  const { data } = useData();
  const pagesUpper = firstUpper(pages);
  useEffect(() => {
    // Убедитесь, что data и data.rasp существуют
    if (data && data.rasp && data.rasp.length > 0) {
      setPage(data.rasp[0]);
      setYear(data.rasp[0].учебныйГод);
      document.title = data.rasp[0][pages] + " - " + "Расписание";
    }
  }, [data]);
  return (
    <>
      <div className="header-back">
        <BackToHistory /> <span>Анализ</span>
      </div>
      <div className="header-page">
        <p>
          {pagesUpper} : {page ? page[pages] : "Нет данных"}
        </p>
        <p>Учебный год:{year}</p>
      </div>
      <div className="header-rewiev-components">
        <div>
          <RewievButtonMonth/>
        </div>
        <div>
        <RewievButtonDic/>
        </div>
        <div>
          <RewievButtonGroup/>
        </div>
      </div>
      <div className="lengthLesson">
        <p>Общее количество пар за 2024-2025:</p>
        <h3>{data && data.rasp && data.rasp.length}</h3>
      </div>
    </>
  );
}
