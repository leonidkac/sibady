import { useState } from "react";
import { useData } from "../DataContext.jsx";
import { raspDic } from "../object/ClassNameDic";
export default function RewievMainMonth() {
  const { data } = useData();

  
  const [activeMonth, setActiveMonth] = useState(null); // Изначально выбран сентябрь
  const monthNames = {
    1: "Сентябрь",
    2: "Октябрь",
    3: "Ноябрь",
    4: "Декабрь",
    5: "Январь",
    6: "Февраль",
    7: "Март",
    8: "Апрель",
    9: "Май",
    10: "Июнь",
    11: "Июль",
    12: "Август",
  };

  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() +1 ).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  const getCountByMonth = (data) => {
    return data.reduce((acc, el) => {
      if (el.дата) {
        const date = new Date(el.дата);
        const month = (date.getMonth() + 1 + 12 - 8) % 12; // Сдвиг для начала с сентября
        const adjustedMonth = month === 0 ? 12 : month; // Корректируем, чтобы август был 12
        acc[adjustedMonth] = {
          count: (acc[adjustedMonth]?.count || 0) + 1, // Увеличиваем счетчик для текущего месяца
          name: monthNames[adjustedMonth], // Добавляем название месяца
        };
      }
      return acc;
    }, {});
  };

  const monthlyCounts = data && Array.isArray(data.rasp) ? getCountByMonth(data.rasp) : {};

  // Фильтрация пар по выбранному месяцу
  const filteredDataRasp = data && Array.isArray(data.rasp) ? data.rasp.filter(el => {
    if (el.дата) {
      const date = new Date(el.дата);
      const month = (date.getMonth() + 1 + 12 - 8) % 12; // Сдвиг для начала с сентября
      const adjustedMonth = month === 0 ? 12 : month; // Корректируем, чтобы август был 12
      return adjustedMonth === activeMonth; // Сравниваем месяц
    }
    return false; // Если дата отсутствует, исключаем элемент
  }) : [];

  function handleActive(e) {
    const active = e.target.dataset.month; // Получаем номер месяца из атрибута data-month
    setActiveMonth(+active); // Устанавливаем активный месяц
  }

  return (
    <>
      <div className="lesson-grid">
        <ul className="lessonsMonthInner">
          {Object.entries(monthlyCounts).map(([month, { count, name }]) => (
            <li className="lessonMonthItem" key={month}>
              <p>{name}:</p>
              <p>{count} пар</p>
              <button data-month={month} onClick={handleActive}>+</button>
            </li>
          ))}
        </ul>
      
        <ul style={{display: 'flex', flexDirection : 'column', gap : '10px'}}>
        {filteredDataRasp.map((el, i) => {
             let nameDic = el.дисциплина[0] + el.дисциплина[1];
                        raspDic.forEach((ele) => {
                          if (ele.name === nameDic) nameDic = ele.class;
                        });
           return( 
            <li className={`lessonItem__li ${nameDic}`} key={el.код}>
                <div className="lessonItem__li-info">
               <p>{el.дисциплина} </p>  
               <p>{el.преподаватель}</p>
               <p>{el.группа} </p>
                </div>
                <div>
                <p style={{fontSize: '20px'}}>{formatDate(el.дата)}</p>
                </div>
            </li>
           )
            })}
        </ul>
      </div>
    </>
  );
}