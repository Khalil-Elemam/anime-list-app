import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import AnimeCardDetails from './components/AnimeCardDetails'
import Layout from './components/Layout'
import AnimeList from './components/AnimeList'

function App() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<AnimeList />} />
          <Route path='card/:id?' element={<AnimeCardDetails />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
