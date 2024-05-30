/* eslint-disable react/prop-types */
import { useRef, useState } from "react"
import { capitalize, format } from "./utils"

function SelectionList({choices, name, setCardData, cardData, editable}) {
    const [active, setActive] = useState(false)
    const buttonRef = useRef()
    const buttonStyles = {
        backgroundColor: 'transparent',
        border: 'none',
        cursor: editable ? 'pointer' : 'auto'
    }

    function handleChoice(event) {
        setCardData(
            prevCardData => ({
                ...prevCardData,
                [name]: format(event.target.innerText)
            })
        )
    }

    function toggleList(event) {
        event.stopPropagation()
        setActive(prevActive => !prevActive)
    }

    function handleBlur(event) {
        console.log(event.type)
        setActive(false)
    }


    return (
        <div 
            className={`drop-down ${active ? 'active' : ''} ${!editable ? 'disabled': ''}`} 
            onClick={() => buttonRef.current.click()} 
            onBlur={handleBlur}
            onFocus={() => console.log('focus')}
            onBlurCapture={(event) => console.log(event)}
        >
            {capitalize(cardData[name])}
            <ul 
                className='list'
            >
                {
                    choices.map((choice, i) => (
                        choice !== capitalize(cardData[name]) &&
                        <li
                            onClick={handleChoice}
                            key={i}
                        >
                            {choice}
                        </li>
                    ))
                }
            </ul>
            <button 
                onClick={toggleList}
                style={buttonStyles} ref={buttonRef}
                type="button"
                disabled={!editable}
            >
                {editable && <i className="fa-solid fa-caret-down"></i>}
            </button>
        </div>
    )
}


export function StatusSelectionList({setCardData, cardData, editable}) {

    const choices = [ 'Ongoing', 'Completed', 'Upcoming', 'On Hold', 'Not Started' ]

    return (
        <SelectionList choices={choices} setCardData={setCardData} cardData={cardData} name='status' editable={editable}/>
    )
}

export function GenresSelectionList({setCardData, cardData, editable}) {

    const choices = [ 
        'Action', 
        'Adventure', 
        'Fantasy', 
        'Romance', 
        'Comedy', 
        'Drama', 
        'Horror', 
        'Mystery', 
        "Sci Fi", 
        'Slice Of Life', 
        'Supernatural', 
        'Thriller' 
    ]

    return (
        <SelectionList 
            choices={choices} 
            setCardData={setCardData} 
            cardData={cardData} 
            name='genres' 
            editable={editable}
        />
    )
}