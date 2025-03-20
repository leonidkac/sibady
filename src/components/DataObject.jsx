import { useState, useEffect } from "react";
import { useData } from "./DataContext.jsx";
import InnerResponse from "./InnerResponse.jsx";
import Pagination from "./Pagination.jsx";
import SeachResponse from "./SeachResponse.jsx";
import NavigationDataResponse from "./NavigationDataResponse.jsx";
import { useLocation } from "react-router-dom";
import InnerRasp from "./Rasp/InnerRasp.jsx";
import CalMon from "./CalendarMonth/CalMon.jsx";
import CalWeek from "./CalendarWeek/CalWeek.jsx";
import Rewiev from "./Rewiev/Rewiev.jsx";
export default function DataObject() {
  const { data } = useData();
  const [pagFilter, setPagFilter] = useState(1);
  const [seachData, setSeachData] = useState(data || []);
  const location = useLocation();

  useEffect(() => {
    if (data) {
      setSeachData(data);
    }
  }, [data]);

  const queryParams = new URLSearchParams(location.search);
  const hasItemParams = queryParams.has("item");
  const hasDateParams = queryParams.has("date");
  const hasWeekParams = queryParams.has("week");
  const hasRewievParams = queryParams.has("rewiev");

  return (
    <>
      {hasItemParams && hasDateParams && !hasWeekParams ? (
        <div>
          <CalMon />
        </div>
      ) : hasItemParams &&
        !hasDateParams &&
        !hasWeekParams &&
        !hasRewievParams ? (
        <InnerRasp />
      ) : hasRewievParams && hasItemParams && !hasDateParams ? (
        <>
          <Rewiev />
        </>
      ) : hasWeekParams && hasItemParams && !hasDateParams ? (
        <CalWeek></CalWeek>
      ) : (
        <div className="container">
          <NavigationDataResponse />
          <SeachResponse
            response={seachData}
            setSeachData={setSeachData}
            setPagFilter={setPagFilter}
          />
          <InnerResponse pagFilter={pagFilter} seachData={seachData} />
          <Pagination
            setPagFilter={setPagFilter}
            pagFilter={pagFilter}
            seachData={seachData}
          />
        </div>
      )}
    </>
  );
}
