import CalMonDayItem from "./CalMonDayItem.jsx";
import { useData } from "../DataContext";
import { useEffect } from 'react';

export default function CalMonDayInner({ activeDateH2, calShortsH2Ref, setActiveDateH2 }) {
  const { data } = useData();

  useEffect(() => {
    const handleClickOutsideH2 = (event) => {
      if (
        calShortsH2Ref.current && // Проверяем, что ref существует
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

  return (
    <div ref={calShortsH2Ref} className={`modal-day`}>
      <h2>{activeDateH2}</h2>
      {data.rasp.map((el) => {
        const fullDate = new Date(el.дата);
        const formattedDate = `${fullDate.getFullYear()}-${String(
          fullDate.getMonth() + 1
        ).padStart(2, "0")}-${String(fullDate.getDate()).padStart(2, "0")}`;
        const isActiveH2 = activeDateH2 === formattedDate;

        return (
          isActiveH2 && (
            <div key={el.код}>
              <CalMonDayItem el={el} />
            </div>
          )
        );
      })}
    </div>
  );
}
