import React, { useState } from "react";
import { useData } from "../DataContext";
import CalWeekMainLesson from "./CalWeekMainLesson";
export default function CalWeekMain() {
  const { data } = useData()
  
  
  
  const [activeCalPId, setActiveCalPId] = useState(null);
  const currentParams = new URLSearchParams(window.location.search);
  const currentWeek = currentParams.get('week') || new Date().toISOString().slice(0, 10);

  // Функция для получения ближайшего предыдущего понедельника
  const getMonday = (date) => {
    const d = new Date(date);
    if (isNaN(d)) {
      return new Date(); // Возвращаем текущую дату, если дата некорректна
    }
    const day = d.getDay();
    const diff = d.getDate() - day + (day === 0 ? -6 : 1);
    return new Date(d.setDate(diff));
  };

  // Устанавливаем дату с понедельника
  const [currentDate, setCurrentDate] = useState(getMonday(currentWeek));

  // Функция для получения дней недели
  const getWeekDays = (startDate) => {
    const days = [];
    for (let i = 0; i < 7; i++) {
      const day = new Date(startDate);
      day.setDate(startDate.getDate() + i);
      days.push(day);
    }
    return days;
  };

  // Переключение на предыдущую неделю
  const goToPreviousWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() - 7);
    setCurrentDate(newDate);
  };

  // Переключение на следующую неделю
  const goToNextWeek = () => {
    const newDate = new Date(currentDate);
    newDate.setDate(currentDate.getDate() + 7);
    setCurrentDate(newDate);
  };

  // Дни недели для отображения
  const weekDays = getWeekDays(currentDate);
  

  // Форматирование дат
  const formatDate = (date) => {
    return `${String(date.getDate()).padStart(2, "0")}.${String(date.getMonth() + 1).padStart(2, "0")}`;
  };

  return (
    <div>
      <div className="header-week">
        <button onClick={goToPreviousWeek}>Предыдущая неделя</button>
        <div>{formatDate(weekDays[0])} - {formatDate(weekDays[6])}</div>
        <button onClick={goToNextWeek}>Следующая неделя</button>
      </div>
      <table style={{ width: "100%", borderCollapse: "collapse" }}>
        <thead>
          <tr>
            {weekDays.map((day, index) => (
              <th  key={index} style={{ border: "1px solid #ccc", padding: "10px" }}>
                {day.toLocaleDateString("ru-RU", { weekday: "short" })} <br />
                {day.toLocaleDateString("ru-RU", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric"
                })}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {Array.from({ length: 7 }).map((_, rowIndex) => (
            <tr key={rowIndex}>
              {weekDays.map((day, colIndex) => {
                  return(
                      
                      <td className="td-lesson-item" 
                      key={colIndex}
                      style={{ border: "1px solid #ccc", padding: "3px" }}>
                      {data && data.rasp && data.rasp.map(el => {
                        const fullDate = new Date(el.дата);
                        const formattedDate = `${String(fullDate.getDate()).padStart(
                          2,
                          "0"
                        )}.${String(
                            fullDate.getMonth() + 1
                          ).padStart(2, "0")}.${fullDate.getFullYear()}`
                        return(
                            (rowIndex+1 === el.номерЗанятия && formattedDate === day.toLocaleDateString()) && 
                            <CalWeekMainLesson el={el}/>

                        )
                })}
                </td>
              )})}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
