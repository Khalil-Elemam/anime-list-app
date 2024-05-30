/* eslint-disable react/prop-types */
import { Link } from 'react-router-dom'
import defaultCover from '../assets/default-cover.jpg'
import Rating from './Rating'
import { capitalize } from './utils'


export default function AnimeCard({status, animeTitle, rating, episodesNumber, coverImageUrl, id}) {

    const iconStyles = {
        marginRight: '10px',
        color: "var(--gold-color)"
    }


    const cardLinkStyles = {
        textDecoration: 'none',
        display: 'block',
        color: 'inherit'
    }



    function getStatusIcon(status) {
        const animeStatusIcons = {
            ONGOING: 'fa-fire',
            COMPLETED: 'fa-medal',
            UPCOMING: 'fa-calendar-plus',
            ON_HOLD: 'fa-pause-circle',
            NOT_STARTED: 'fa-hourglass-start'
        }
        return animeStatusIcons[status]
    }

    return (
        <Link className="card" to={`/card/${id}`} style={cardLinkStyles}>
            <div className="cover-image">
                <img 
                    src={coverImageUrl ? coverImageUrl : defaultCover} 
                    onError={e => {e.target.src = defaultCover}}
                    alt={ `cover image for ${animeTitle}`} 
                />
            </div>
            <div className="info">
                <h3>{animeTitle}</h3>
                <p>
                    <i
                        className='fa-solid fa-film'
                        style={iconStyles}
                    />
                    {episodesNumber} Episodes
                </p>
                <p>
                    <i 
                        className={`fa-solid ${getStatusIcon(status)}`}
                        style={iconStyles}
                    />
                    {capitalize(status)}
                </p>
                <div className="rating">
                    <p>Rating </p>
                    <Rating rating = {rating}/>
                </div>
            </div>
            <div className='link'>
                <p>More here</p>
                <i className="fa-solid fa-arrow-right"></i>
            </div>
        </Link>
    )
}


