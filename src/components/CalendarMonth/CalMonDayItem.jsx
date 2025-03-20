import { raspDic } from "../object/ClassNameDic.jsx";

export default function CalMonDayItem({ el }) {
  let nameDic = el.дисциплина[0] + el.дисциплина[1];
  
  raspDic.forEach((ele) => {
    if (ele.name === nameDic) nameDic = ele.class;
  });
  return (
    <>
      <div className={`modal-day-item ${nameDic}`} key={el.дата}>
        <p>{el.дисциплина}</p>
        <div className="modal-day-item-description">
          <div className="modal-day-item-time">
            <p>{el.начало}:</p>
            <p>{el.конец}</p>
          </div>
          <p>{el.аудитория} </p>
          <p>{el.преподаватель} </p>
          <p>{el.группа} </p>
        </div>
      </div>
    </>
  );
}
