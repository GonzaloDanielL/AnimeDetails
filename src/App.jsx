import { ListAnime } from './components/listAnime.jsx'
import { AnimeDetails } from './components/animeDetails.jsx'
import { Link, Route, Routes } from 'react-router-dom'
import { useEffect, useState } from 'react'
import fondo from '/fondo1.jpg';

function App() {

    return (
        <>
            <div className='fondo-pagina'>
                <img src={fondo} alt="" />
            </div>

            <main className='main-container'>
                <Routes>
                    <Route path="/" exact element={<ListAnime/>} />
                    <Route path="/listAnime" exact element={<ListAnime/>} />
                    <Route path="/animeDetails/:id" exact element={<AnimeDetails />} />
                </Routes>
            </main>
        </>
    )
}

export default App
