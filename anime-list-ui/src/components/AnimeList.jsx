import {useState, useEffect} from "react"
import AnimeCard from "./AnimeCard"
import { useLocation } from "react-router-dom"
import { getAnimeCards } from "../api"
import Pagination from "./Pagination"

export default function AnimeList() {


    const [currentPage, setCurrentPage] = useState(1)
    const [pagesNum, setPagesNum] = useState(0)
    const [cards, setCards] = useState([])
    const location = useLocation()

    useEffect(() => {
        async function fetchData() {
            try {
                const data = (await getAnimeCards(currentPage - 1, 9)).data
                setCards(data.content)
                setPagesNum(data.totalPages)
            }catch(error) {
                console.log(error)
            }
        }
        fetchData()
    }, [currentPage, location])


    const animeCards = cards.map(card => (
        <AnimeCard 
            key={card?.id}
            animeTitle={card?.animeTitle}
            episodesNumber={card?.episodesNumber}
            status={card?.status}
            rating={card?.rating}
            id={card?.id}
            coverImageUrl={card?.coverImageUrl}
        />
    ))

    return (
        <div className="list">
            <div className="container">
                {animeCards}
            </div>
            <Pagination pagesNum={pagesNum} setCurrentPage={setCurrentPage} currentPage={currentPage}/>
        </div>
    )
}