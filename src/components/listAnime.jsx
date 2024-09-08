import { Suspense, useState, useEffect } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { FaGithub, FaExternalLinkSquareAlt } from "react-icons/fa";
import { motion } from "framer-motion"

export function ListAnime(props) {
  const [search, setsearch] = useState("");
  const [animedata, setdata] = useState();

  const { pathname } = useLocation();

  async function getData() {
    let url
    if (search == "") {
      url = "https://api.jikan.moe/v4/top/anime"
    }
    else {
      url = `https://api.jikan.moe/v4/anime?q=${search}&sort=asc&limit=20&sfw=true`
    }

    const res = await fetch(url)
    const data = await res.json()
    setdata(data.data)
  }

  useEffect(() => {
    getData()
  }, [search])

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  window.onscroll = () => {
    let div = document.getElementById('navegacion').getBoundingClientRect().bottom;

        if (div <= 2) {
          document.getElementsByClassName("header-content-2")[0].style.opacity = 1;
          document.getElementsByClassName("header-content-2")[0].style.top = 0;
          document.getElementById("buscador-1").disabled = true;
    
        } else {
          document.getElementsByClassName("header-content-2")[0].style.opacity = 0;
          document.getElementsByClassName("header-content-2")[0].style.top = "-100px";
          document.getElementById("buscador-1").disabled = false;
        }
  }


  return (
    <div className='list-anime-container'>


      <header className='header-content-2'>

        <a className='links-externos l1' href="https://github.com/GonzaloDanielL?tab=repositories" target='_blank'><FaGithub /> Github</a>

        <a className='links-externos l2' href="#"><FaExternalLinkSquareAlt /> Chalo</a>

        <h1>AnimeDetails</h1>

        <div className='nav-search'>
          <input type="text" onChange={(e) => setsearch(e.target.value)} placeholder='Buscar' value={search} />
          <p>Escribe el nombre del anime que deseas buscar</p>
        </div>

      </header>


      <motion.header
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='header-content' id='navegacion'>

        <a className='links-externos l1' href="https://github.com/GonzaloDanielL?tab=repositories" target='_blank'><FaGithub /> Github</a>

        <a className='links-externos l2' href="#"><FaExternalLinkSquareAlt /> Chalo</a>

        <h1>AnimeDetails</h1>

        <div className='nav-search'>
          <input type="text" onChange={(e) => setsearch(e.target.value)} placeholder='Buscar' value={search} id="buscador-1" />
          <p>Escribe el nombre del anime que deseas buscar</p>
        </div>

      </motion.header>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        className='container-list-grid'>
        <Suspense fallback={<div>Cargado...</div>}>
          {animedata?.map((item) => (
            <Link to={`/AnimeDetails/${item.mal_id}`} key={item.mal_id} className='list-grid-item'>
              <div className='list-grid-item-contenido'>
                <img className='card-anime-img' src={item.images.jpg.image_url} alt="" />
                <h2 className='card-anime-title'>{item.title}</h2>
                <div className='fondo-gradiente'>

                </div>
              </div>
            </Link>
          ))}
        </Suspense>
      </motion.div>

    </div>
  )
}