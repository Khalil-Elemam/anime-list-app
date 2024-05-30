import { useEffect, useState } from "react";

/* eslint-disable react/prop-types */
function EditableRating({cardData, setCardData }) {

    const [rate, setRate] = useState(cardData.rating)
    const starStyles = {
        color: "var(--gold-color)",
        fontSize: "1.025rem",
        width: '9px',
        overflow: 'hidden',
    };

    useEffect(() => {
        setRate(cardData.rating)
    }, [cardData.rating])


    const starButtonStyles = {
        backgroundColor: 'transparent',
        border: 'none',
        outline: 'none',
        cursor: 'pointer',
    }
    
    const LEFT_FILLED_HALF_STAR = <i className="fa-solid fa-star-half" style={starStyles}></i>
    const RIGHT_FILLED_HALF_STAR = <i className="fa-solid fa-star-half fa-flip-horizontal" style={starStyles}></i>
    const LEFT_EMPTY_HALF_STAR = <i className="fa-regular fa-star-half" style={starStyles}></i>
    const RIGHT_EMPTY_HALF_STAR = <i className="fa-regular fa-star-half fa-flip-horizontal" style={starStyles}></i>

    function getStars() {
        let flipped = false
        let stars = []
        let rateNum = rate
        for(let i = 1; i <= 10; i++) {
            if(rateNum > 0 && !flipped) 
                stars.push(LEFT_FILLED_HALF_STAR)
            else if(rateNum > 0 && flipped)
                stars.push(RIGHT_FILLED_HALF_STAR)
            else if(rateNum <= 0 && !flipped)
                stars.push(LEFT_EMPTY_HALF_STAR)
            else if (rateNum <= 0 && flipped)
                stars.push(RIGHT_EMPTY_HALF_STAR)
            rateNum -= 0.5
            flipped = !flipped
        }
        return stars
    }

    function handleEvents(event) {
        let newRate = event.currentTarget.getAttribute('data-rate')
        if(event.type === 'click')
            setCardData(prevCardData => ({
                ...prevCardData,
                rating: newRate
            }))
        else if(event.type === 'mouseenter') 
            setRate(newRate)
        else if(event.type === 'mouseleave')
            setRate(cardData.rating)
    } 

    function createStarButtons() {
        const stars = getStars()
        const starElements = []
        for(let i = 0; i < 10; i++) {
            starElements.push(
                <div className="star" key={(i / 2) + 1}>
                    <button 
                        onClick = {handleEvents} 
                        style={starButtonStyles} 
                        type="button"
                        data-rate={(i + 1) * 0.5}
                        onMouseEnter={handleEvents}
                        onMouseLeave={handleEvents}
                    >{stars[i++]}</button>
                    <button 
                        onClick = {handleEvents} 
                        type="button"
                        style={starButtonStyles} 
                        data-rate={(i + 1) * 0.5}
                        onMouseEnter={handleEvents}
                        onMouseLeave={handleEvents}
                    >{stars[i]}</button>
                </div>
            )
        }
        return starElements
    }



    return (
        <div className="rating">
            {createStarButtons()}
        </div>
    );
}


function NonEditableRating({ rating, additionalStyles}) {

    const starStyles = {
        color: "var(--gold-color)",
        fontSize: "1.025rem"
    };
    const completeStarsNum = parseInt(rating);
    const halfStarsNum = Math.ceil(rating - completeStarsNum);
    const emptyStarsNum = 5 - completeStarsNum - halfStarsNum;

    const completeStars = Array.from({ length: completeStarsNum }).map((_, i) => (
        <i className="fa-solid fa-star" key={i} style={starStyles}></i>
    ));
    const halfStars = Array.from({ length: halfStarsNum }).map((_, i) => (
        <i className="fa-solid fa-star-half-stroke" key={i} style={starStyles}></i>
    ));
    const emptyStars = Array.from({ length: emptyStarsNum }).map((_, i) => (
        <i className="fa-regular fa-star" style={starStyles} key={i}></i>
    ));
    return (
        <div style={additionalStyles} className="rating">
            {completeStars}
            {halfStars}
            {emptyStars}
        </div>
    );
}


export default function Rating({editable, rating, additionalStyles, cardData, setCardData}) {

    return (
            editable ? 
            <EditableRating cardData = {cardData} setCardData = {setCardData}/> :
            <NonEditableRating rating={rating} additionalStyles={additionalStyles}/>
    )
}