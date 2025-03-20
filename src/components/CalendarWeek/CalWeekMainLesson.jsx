import { raspDic } from "../object/ClassNameDic";
export default function CalWeekMainLesson({ el }) {
    let subDic = el.дисциплина.substring(3,15) + '...'
    let nameDic = el.дисциплина[0] + el.дисциплина[1];
            raspDic.forEach((ele) => {
              if (ele.name === nameDic) nameDic = ele.class;
            });
  return (
    <>
      <div className="lesson-inner">
        <div className="lesson-item">
            <div className="lesson-dic">
                <h4>{el.дисциплина.length > 15 ? subDic : el.дисциплина}</h4>
                <span id="circle-dic" className={nameDic}></span>
            </div>
            <div className="lesson-group">
                <p>{el.группа}</p>
            </div>
            <div className="lesson-time">
                <p>{el.начало}-{el.конец}</p>
            </div>
            <div className="lesson-auditor">
                <p>{el.аудитория}</p>
            </div>
        </div>
      </div>
    </>
  );
}
