import { raspDic } from "../object/ClassNameDic.jsx";

export default function CalShortsDayItem({el}){
    // console.log(el.дата);
    let date = new Date(el.дата);
    let setDay = `${date.getFullYear()}.${(date.getMonth() + 1).toString().padStart(2, '0')}.${date.getDate().toString().padStart(2, '0')}`;
    

    let nameDic = el.дисциплина[0] + el.дисциплина[1];
                raspDic.forEach((ele) => {
                  if (ele.name === nameDic) nameDic = ele.class;
                });
    return(
        <>
        <div className="item-dics">
          <span className={`span-nameDic ${nameDic}`}></span>
          <div className="item-time__day">
            <span> {el.дисциплина} </span>
            <span>
              <p>
                {el.день_недели},{setDay} {el.начало} :{" "}
                {el.конец}
              </p>{" "}
            </span>
          </div>
        </div>
        <div className="item-aud__day">
          <span> Ауд </span>
          <span> {el.аудитория} </span>
        </div>
        <div className="item-prep__day">
          <span>Преп </span>
          <span>{el.преподаватель} </span>
        </div>
        <div className="item-group__day">
          <span>Группа </span>
          <span>{el.группа} </span>
        </div>
      </>
        
    )
}