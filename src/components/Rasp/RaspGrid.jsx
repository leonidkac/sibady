import image from './1.webp'

export default function RaspFlex({setGrid}){
    function handleGrid(){
        setGrid(prevState => !prevState)
    }
    return(
        <>
       <button className='flexWrap' onClick={handleGrid}>
       <img className='flexWrap' src={image} alt="" />
        </button> 
        </>
    )
}