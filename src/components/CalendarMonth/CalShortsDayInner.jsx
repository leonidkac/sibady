import CalShortsDayItem from "./CalShortsDayItem.jsx";
import { useEffect, useState } from "react";
import { raspDic } from "../object/ClassNameDic.jsx";

export default function CalShortsDayInner({
  eventsForDate,
  setActiveCalPId,
  activeCalPId,
  calShortsRef,
  setActiveDateH2,
  calShortsH2Ref
}) {
  const [showMore, setShowMore] = useState(false);
  

  useEffect(() => {
    const handleClickOutsideH2 = (event) => {
      if (
        calShortsH2Ref.current &&
        !calShortsH2Ref.current.contains(event.target)
      ) {
        
        setActiveDateH2(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutsideH2);
    return () => {
      document.removeEventListener("mousedown", handleClickOutsideH2);
    };
  }, [calShortsH2Ref]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        calShortsRef.current &&
        !calShortsRef.current.contains(event.target)
      ) {
        setActiveCalPId(null);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [calShortsRef]);

  const displayedEvents = showMore ? eventsForDate : eventsForDate.slice(0, 4);
  const remainingCount = eventsForDate.length - displayedEvents.length;

  return (
    <>
      {displayedEvents.map((el) => {
        let nameDic = el.дисциплина[0] + el.дисциплина[1];
        raspDic.forEach((ele) => {
          if (ele.name === nameDic) nameDic = ele.class;
        });
        const shortsDic = el.дисциплина.substring(0, 20);
        const isActive = activeCalPId === el.код;

        return (
          <div
            key={el.код} // Убедитесь, что el.код уникален
            onClick={() => {
              setActiveCalPId((prev) => (prev === el.код ? null : el.код));
            }}
            className={`cal_p calendar_time ${nameDic} }`}
          >
            <p>
              {el.начало} {shortsDic}...
            </p>
            {isActive && (
              <div ref={calShortsRef} className="shortsCal-day">
                <CalShortsDayItem key={el.код} el={el} /> {/* Убедитесь, что здесь тоже есть уникальный ключ */}
              </div>
            )}
          </div>
        );
      })}

      {remainingCount > 0 && (
        <button
          id="btn-addMore"
          ref={calShortsH2Ref}
          onClick={(e) => {
            const parent = e.target.closest('.calendar-day');
            const childrenH2 = parent.querySelector('.date_h2');
            const dataDate = childrenH2.getAttribute('data-date');
            setActiveDateH2((prev) => (prev === dataDate ? null : dataDate));
          }}
        >
          {showMore ? "Скрыть" : `Ещё ${remainingCount}`}
        </button>
      )}
    </>
  );
}
