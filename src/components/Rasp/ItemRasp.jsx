import { raspDic } from '../object/ClassNameDic.jsx';
// Компонент для отображения отдельного элемента расписания
export default function ItemRasp ({ el }) {
    let nameDic = el.дисциплина.substring(0,2);
    raspDic.forEach(ele => {
        if (ele.name === nameDic) nameDic = ele.class;
    });
    return (
        <div className='rasp'>
            <div className={`date ${nameDic}`}>
                <p>{el.начало}</p>
                <hr />
                <p>{el.конец}</p>
            </div>
            <div className= {`info_par  ${nameDic}`}>
                <p className="disciplina"> {el.дисциплина}</p>
                <p>Преподаватель: {el.преподаватель}</p>
                <p className="group">Группа: {el.группа}</p>
            </div>
        </div>
    );
};