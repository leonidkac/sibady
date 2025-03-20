import { useEffect, useState } from "react";
import { useData } from "../DataContext.jsx";
import { raspDic } from "../object/ClassNameDic";

export default function RewievMainGroup() {
  const { data } = useData();
  const [activeGroup, setActiveGroup] = useState('');
  function formatDate(isoDate) {
    const date = new Date(isoDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth() +1 ).padStart(2, '0');
    const year = date.getFullYear();
    return `${day}.${month}.${year}`;
  }

  function getCountDic(data) {
    return data.reduce((acc, el) => {
      if (el.группа) {
        const dicSub = el.группа;
        acc[dicSub] = {
          name: dicSub,
          count: (acc[dicSub]?.count || 0) + 1,
        };
      }
      return acc;
    }, {});
  }

  const countDic = data && Array.isArray(data.rasp) ? getCountDic(data.rasp) : {};

  const filtredDic = data && data.rasp && Array.isArray(data.rasp) 
    ? data.rasp.filter(el => {
        if (el.группа) {
          const disSub = el.группа;
          return disSub === activeGroup;
        }
        return false; // Возвращаем false, если условие не выполнено
      })
    : [];

  console.log(filtredDic);

  function handleActive(e) {
    const active = e.target.dataset.month; // Получаем значение из атрибута data-month
    setActiveGroup(active); // Устанавливаем активный месяц
  }

  return (
    <>
      <div className="lesson-grid">
        <ul className="lessonsMonthInner">
          {Object.entries(countDic).length > 0 ? (
            Object.entries(countDic).map(([name, { count }]) => (
              <li className="lessonMonthItem dicLesson" key={name}>
                <p>
                  {name.length > 20 ? name.substring(0, 20) + '... ' : name}: 
                </p>
                <p>{count}</p>
                <button data-month={name} onClick={handleActive}>+</button>
              </li>
            ))
          ) : (
            <p>Нет доступных данных для отображения.</p>
          )}
        </ul>
        <ul style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
          {filtredDic.length > 0 ? (
            filtredDic.map((el, index) => {
              let nameDic = el.дисциплина[0] + el.дисциплина[1];
              raspDic.forEach((ele) => {
                if (ele.name === nameDic) nameDic = ele.class;
              });
              return (
                <li className={`lessonItem__li ${nameDic}`} key={index}> {/* Добавляем уникальный ключ */}
                  <div className="lessonItem__li-info">
                    <p>{el.дисциплина}</p>  
                    <p>{el.преподаватель}</p>
                    <p>{el.группа}</p>
                  </div>
                  <div>
                  <p>{formatDate(el.дата)}</p>
                  </div>
                </li>
              );
            })
          ) : (
            <p>Нажмите на группу</p>
          )}
        </ul>
      </div>
    </>
  );
}
