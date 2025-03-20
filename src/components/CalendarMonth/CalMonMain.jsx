import React, { useEffect, useState, useRef } from "react";
import { useData } from "../DataContext";
import CalMonDayInner from "./CalMonDayInner.jsx";
import CalShortsDayInner from "./CalShortsDayInner.jsx";
import CalMonMainButtonWeek from "./CalMonMainButtonWeek.jsx";
export default function CalMonMain({ over }) {
  const { data } = useData();
  const yearC = 2025;
  const currentMonth = new Date().getMonth();
  const currentDate = new Date().getDate();
  const [month, setMonth] = useState(currentMonth);
  const [monthYear, setMonthYear] = useState("");
  const [calendarDays, setCalendarDays] = useState([]);
  const [activeCalPId, setActiveCalPId] = useState(null); // Состояние для хранения активного cal_p
  const [activeDateH2, setActiveDateH2] = useState(null); // Состояние для хранения активного cal_p

  const calShortsRef = useRef(null); // Ссылка на компонент CalShortsDay
  const calShortsH2Ref = useRef(null); // Ссылка на компонент CalShortsDay

  useEffect(() => {
    setMonthYear(
      new Date(yearC, month).toLocaleString("ru-RU", {
        month: "long",
        year: "numeric",
      })
    );

    const firstDay = new Date(yearC, month, 1).getDay();
    const adjustedFirstDay = firstDay === 0 ? 6 : firstDay - 1;
    const lastDate = new Date(yearC, month + 1, 0).getDate();

    const days = [];
    for (let i = 0; i < adjustedFirstDay; i++) {
      days.push(<div key={`empty-${i}`} className="calendar-day empty"></div>);
    }
    for (let date = 1; date <= lastDate; date++) {
      const fullDateAttr = `${yearC}-${String(month + 1).padStart(
        2,
        "0"
      )}-${String(date).padStart(2, "0")}`;
      const dayClass =
        fullDateAttr === over ? "calendar-day active" : "calendar-day";
      days.push(
        <div key={date} className={dayClass} data-date={fullDateAttr}>
          <h2 className="date_h2" data-date={fullDateAttr}>
            {date === currentDate && month === currentMonth ? (
              <strong>{date}</strong>
            ) : (
              date
            )}
          </h2>
        </div>
      );
    }

    const calendarDaysWithData = days.map((day) => {
      const dateAttr = day.props["data-date"];
      if (!dateAttr) {
        return day;
      }
      const dayDate = parseInt(dateAttr.split("-")[2]);

      const eventsForDate =
        data && data.rasp
          ? data.rasp.filter((el) => {
              const fullDate = new Date(el.дата);
              const formattedDate = `${fullDate.getFullYear()}-${String(
                fullDate.getMonth() + 1
              ).padStart(2, "0")}-${String(fullDate.getDate()).padStart(
                2,
                "0"
              )}`;
              return formattedDate === dateAttr;
            })
          : [];

      return (
        <div key={dayDate} className={day.props.className} data-date={dateAttr}>
          <h2
            className="date_h2"
            data-date={dateAttr}
            onClick={() => {
              setActiveDateH2((prev) => (prev === dateAttr ? null : dateAttr));
            }}
          >
            {dayDate === currentDate && month === currentMonth ? (
              <strong>{dayDate}</strong>
            ) : (
              dayDate
            )}
          </h2>

          <CalShortsDayInner
           eventsForDate={eventsForDate}
            setActiveCalPId={setActiveCalPId} 
            activeCalPId={activeCalPId}
            calShortsRef={calShortsRef}
            setActiveDateH2={setActiveDateH2}
            activeDateH2={activeDateH2}
            calShortsH2Ref={calShortsH2Ref}
          
            />
        </div>
      );
    });

    setCalendarDays(calendarDaysWithData);
  }, [month, over, data, activeCalPId, activeDateH2]);

  

  return (
    <>
      <div className="header-cal-month">
        <div className="header-cal-month__button">
        <button id="prevMonth" onClick={() => setMonth((prev) => prev - 1)}>
          Назад
        </button>
        <h2>{monthYear}</h2>
        <button id="nextMonth" onClick={() => setMonth((prev) => prev + 1)}>
          Вперед
        </button>
        </div>
       <div className="header-cal-month__link">
        <CalMonMainButtonWeek/>
       </div>
      </div>
      <div className="days">
        <div className="day">Пн</div>
        <div className="day">Вт</div>
        <div className="day">Ср</div>
        <div className="day">Чт</div>
        <div className="day">Пт</div>
        <div className="day">Сб</div>
        <div className="day">Вс</div>
      </div>
      <div className="calendar-days">{calendarDays}</div>

      {activeDateH2 && (
        <>
          <CalMonDayInner
            activeDateH2={activeDateH2}
            calShortsH2Ref={calShortsH2Ref}
            setActiveDateH2={setActiveDateH2}
         
          />
        </>
      )}
    </>
  );
}
