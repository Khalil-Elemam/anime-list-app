
import { Outlet } from "react-router-dom"
import Header from "./Header"
import AnimeList from "./AnimeList"

export default function Layout() {

    return (
        <>
            <Header/>
            <AnimeList />
        </>
    )
}