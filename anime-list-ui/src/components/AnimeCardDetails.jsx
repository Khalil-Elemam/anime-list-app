/* eslint-disable react/prop-types */
import { useEffect, useRef, useState } from 'react'
import defaultCover from '../assets/default-cover.jpg'
import { createAnimeCard, deleteAnimeCard, getAnimeCard, updateAnimeCard, uploadPhoto } from '../api'
import Rating from './Rating'
import { useNavigate, useParams } from 'react-router-dom'
import { GenresSelectionList, StatusSelectionList } from './SelecionList'

export default function AnimeCardDetails() {

    const id = useParams().id

    const [cardData, setCardData] = useState({
        id: id,
        animeTitle: '',
        releaseYear: undefined,
        rating: undefined,
        coverImageUrl: '',
        episodesNumber: undefined,
        status: undefined,
        genres: undefined,
        synopsis: ''
    })


    const selectedImageStyles = {
        width: "100%",
        aspectRatio: "16 / 9",
        border: "2px dashed var(--gold-color)",
        borderRadius: "var(--main-border-rad)"
    }


    const [coverImage, setCoverImage] = useState()
    const synopsisRef = useRef(null)
    const imageRef = useRef()
    const [editable, setEditable] = useState(() => cardData?.id ? false : true)

    const navigate = useNavigate()

    async function handleSubmit(event) {
        event.preventDefault()
        if (id)
            await updateCard()
        else
            await createCard()
    }

    async function updateCard() {
        try {
            const data = (await updateAnimeCard(cardData.id, {...cardData, synopsis: synopsisRef.current.innerText})).data 
            setCardData(data)
            if (coverImage) {
                const imageUrl = (await saveImage(data.id)).data
                console.log(imageUrl)
                setCardData(prevCardData => ({
                    ...prevCardData,
                    coverImageUrl: `${imageUrl}?updated_at=${new Date().getTime()}`
                }))
            }
            setEditable(false)
        }catch(error) {
            console.log(error)
        }
    }

    async function createCard() {
        try {
            const data = (await createAnimeCard({...cardData, synopsis: synopsisRef.current.innerText})).data
            setCardData(data)
            if (coverImage) {
                const imageUrl = (await saveImage(data.id)).data
                setCardData(prevCardData => ({
                    ...prevCardData,
                    coverImageUrl: `${imageUrl}?updated_at=${new Date().getTime()}`
                }))
            }
            navigate(data.id)
            setEditable(false)
        }catch(error) {
            console.log(error)
        }
    }


    async function saveImage(id) {
        let formData = new FormData()
        formData.append('image', imageRef.current.files[0], coverImage.name)
        return await uploadPhoto(id, formData)
    }

    async function fetchCardData(id) {
        try {
            const request = await getAnimeCard(id)
            const card = request.data
            setCardData(card)
        } catch(error) {
            console.log(error)
        }
    }

    async function deleteCard() {
        try {
            await deleteAnimeCard(cardData.id)
            navigate('/')
        }catch(error) {
            console.log(error)
        }
    }

    function handleChange(event) {
        const {name, value} = event.target
        if (name === 'image') 
            setCoverImage(URL.createObjectURL(event.target.files[0]))
        else
            setCardData(prevCardData => ({
                ...prevCardData,
                [name]: value
            }))
    }


    useEffect(() => {
        if(id) {
            fetchCardData(id)
            setEditable(false)
        } else {
            setCardData({
                id: null,
                animeTitle: 'Anime Title',
                releaseYear: new Date().getFullYear(),
                rating: 0,
                coverImageUrl: '',
                episodesNumber: 0,
                status: 'UPCOMING',
                genres: 'ACTION',
                synopsis: 'This is synopsis'
            })
            setEditable(true)
        }
    }, [id])

    return (
        <>
            <div className="card-details">
                <div className="container">
                    <div className="image-container">
                    <img 
                        src={cardData?.coverImageUrl ? cardData.coverImageUrl : defaultCover} 
                        alt={`cover image for ${cardData?.animeTitle}`} 
                        onError={e => {e.target.onError = null; e.target.src = defaultCover}}
                    />
                    {
                        !editable &&
                        <div className="buttons">
                            <button className='delete-btn btn' onClick={deleteCard}>
                                <i className="fa-solid fa-trash"></i>
                                Delete
                            </button>
                            <button className='update-btn btn' onClick={() => setEditable(true)}>
                                <i className="fa-solid fa-wrench"></i>
                                Update
                            </button>
                        </div>
                    }
                    {
                        editable &&
                        <>
                            <button className='update-btn btn' onClick={() => imageRef.current.click()}>
                                <i className="fa-regular fa-images"></i>
                                Select Image
                            </button>
                            <p style={{marginBottom: "1em", textAlign: "center"}}>Selected Image</p>
                            <div className="selected-image" style={selectedImageStyles}>
                                <img src={coverImage}/>
                            </div>
                        </>
                    }
                </div>
                <form className={`details ${editable ? 'editable' : ''}`} id='my-form' onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor='anime-title'>Title: </label>
                        <input
                            type='text'
                            value={cardData?.animeTitle}
                            id='anime-title'
                            disabled={!editable}
                            name='animeTitle'
                            onChange={handleChange}
                        />
                    </div>
                    <div>
                        <label htmlFor='release-year'>Release Year: </label>
                        <input 
                            value={cardData?.releaseYear}
                            disabled={!editable}
                            type='number'
                            min={1980}
                            max={new Date().getFullYear()}
                            onChange={handleChange}
                            name='releaseYear'
                        />
                    </div>
                    
                    <div>
                        <label htmlFor='episodes-number'>Episodes Number: </label>
                        <input
                            value={cardData?.episodesNumber}
                            disabled={!editable}
                            name='episodesNumber'
                            onChange={handleChange}
                            type='number'
                            min={0}
                            max={10000}
                        />
                    </div>
                    <div>
                        <label htmlFor='status'>Status: </label>
                        <StatusSelectionList cardData = {cardData} setCardData = {setCardData} editable={editable}/>
                    </div>
                    <div>
                        <label htmlFor='genres'>Genres: </label>
                        <GenresSelectionList cardData = {cardData} setCardData = {setCardData} editable={editable}/>
                    </div>
                    <div>
                        <label>Rating: </label>
                        <Rating 
                            rating={cardData?.rating} 
                            additionalStyles = {{marginLeft: "10px"}} 
                            editable={editable}
                            cardData={cardData}
                            setCardData={setCardData}
                        />
                    </div>
                    <div>
                        <label htmlFor='synopsis'>Synopsis: </label>
                        <span 
                            contentEditable={editable}
                            role='textbox'
                            className='textarea'
                            ref={synopsisRef}
                            suppressContentEditableWarning
                            value={undefined}
                        >{cardData?.synopsis}</span>
                    </div>
                    <input 
                        type='file' 
                        accept='image/*' 
                        hidden 
                        ref={imageRef}
                        onChange={handleChange}
                        value={undefined}
                        name='image'
                    />
                </form>
                </div>
            </div>
            {
                editable &&
                <button 
                    className='btn save-btn'
                    form='my-form'
                >
                    <i className="fa-solid fa-cloud-arrow-up"></i>
                    Save
                </button>
            }
        </>
    )
}