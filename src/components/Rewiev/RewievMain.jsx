import { useLocation } from 'react-router-dom';
import RewievMainMonth from "./RewievMainMonth.jsx";
import RewievMainDic from './RewiewMainDic.jsx';
import RewievMainGroup from './RewiewMainGroup.jsx';
export default function RewievMain() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const hasRewievParams = queryParams.get('rewiev');
  
  return(
    <>
      {hasRewievParams === 'month' ? (
        <RewievMainMonth/>
      ) : hasRewievParams === 'dic' ? (
        <RewievMainDic/>
      ) : hasRewievParams === 'group' && (
        <>
        <RewievMainGroup/>
        </>
      )}
    </>
  )

}