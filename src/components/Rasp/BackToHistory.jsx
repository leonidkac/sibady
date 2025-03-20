import React from "react"
import { useNavigate } from "react-router-dom"


export default function BackToHistory(){
    const navigate = useNavigate()
    const handleBackClick = () => {
        navigate(-1)
    }

    return (
        <>
            <button type="button" className="back" onClick={handleBackClick}> Назад </button>
        </>
    )
}