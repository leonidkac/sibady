import CalMonHeader from "../CalendarMonth/CalMonHeader"
import CalWeekMain from "./CalWeekMain"
export default function CalWeek(){
    return(
        <>
        <div className="container">

        <CalMonHeader/>
        <CalWeekMain/>
        </div>
        </>
    )
}