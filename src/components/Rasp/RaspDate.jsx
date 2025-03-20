
import { useData } from "../DataContext.jsx"

export default function RaspDate(){
    const { handleDateChange, date } = useData();
    function handleDate(e){
        const date = e.target.value
        handleDateChange(date) 
    }
    
    return(
        <>
        <input id="date_input" onChange={handleDate} type="date" name="" value={date}/>
        </>
    )
}