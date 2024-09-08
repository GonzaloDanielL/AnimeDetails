import { TiArrowLeftThick } from "react-icons/ti";
import { useEffect, useState } from "react"
import { useParams } from "react-router";
import { Generos, LinksExternal } from './listFeatures'
import { Link, useLocation } from 'react-router-dom'
import { TbArrowBigLeftFilled } from "react-icons/tb";
import { motion } from "framer-motion"

export function AnimeDetails() {
    const [anime, getAnime] = useState([]);
    const [error, setError] = useState();
    const { id } = useParams();
    const { pathname } = useLocation();

    async function getData() {
        const res = await fetch(`https://api.jikan.moe/v4/anime/${id}/full`)

        if (!res.ok) {
            setError(res.status)
        }

        const data = await res.json()

        getAnime(data.data)
    }

    window.onscroll = () => {
        let div = document.getElementById('anDe-cabecera')
        let divPosicion = div.getBoundingClientRect().top;
        console.log(div)

        if (divPosicion <= 0) {
            div.style.top = "-2px";
            div.style.borderTopLeftRadius = 0;
            div.style.borderTopRightRadius = 0;
            div.style.backdropFilter = "blur(20px)";


        } else {
            div.style.top = "0px";
            div.style.borderTopLeftRadius = "10px";
            div.style.borderTopRightRadius = "10px";
            div.style.backdropFilter = "blur(0px)";
        }
    }


    useEffect(() => {
        getData()
    }, [])

    useEffect(() => {
        window.scrollTo(0, 0);
    }, [pathname]);


    if (error) return "Ocurrio un error!";

    if (anime.length != 0) {
        return (
            <>
                <motion.section
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.5 }}
                    className="animeDetails-container" key={anime.mal_id}>

                    <div className="anDe-cabecera" id="anDe-cabecera">

                        <header>

                            <h1 className="anDe-title"><Link to="/listAnime"><TbArrowBigLeftFilled />{anime.title}</Link></h1>

                        </header>

                        <div className="Des-top">
                            <div className="Des-top-item">
                                <div>
                                    Score
                                </div>
                                <div>
                                    {anime.score}
                                </div>
                            </div>

                            <div className="Des-top-item">
                                <div>
                                    Ranked
                                </div>
                                <div>
                                    #{anime.rank}
                                </div>
                            </div>

                            <div className="Des-top-item">
                                <div>
                                    Popularity
                                </div>
                                <div>
                                    #{anime.popularity
                                    }
                                </div>
                            </div>
                        </div>


                    </div>

                    <main className="anDe-body">

                        <div className="anDe-video">
                            <img className="anDe-img" src={anime.images.jpg.image_url} alt={anime.images.jpg.image_url} />
                            <iframe className="anDe-trailer"
                                src={anime.trailer.embed_url}
                            ></iframe>
                        </div>

                        <div className="anDe-des">
                            <h2>Synopsis</h2>
                            <p>{anime.synopsis
                            }</p>
                        </div>

                        <h3>Title-English: <span>{anime.title_english}</span></h3>
                        <h3>Title-japonese: <span>{anime.title_japanese}</span></h3>
                        <h3>Started: <span>{anime.aired.from}</span></h3>
                        <h3>Culminated: <span>{anime.aired.to}</span></h3>
                        <h3>Episodes: <span>{anime.episodes}</span></h3>
                        <h3>Duration: <span>{anime.duration}</span></h3>
                        <h3>Rating: <span>{anime.rating}</span></h3>
                        <h3>Score: <span>{anime.score}</span></h3>
                        <h3>Status: <span>{anime.status}</span></h3>
                        <h3>Genres: <span>{<Generos list={anime.genres} />}</span></h3>
                        <h3>Studios: <span>{<Generos list={anime.studios} />}</span></h3>
                        <h3>Producers: <span>{<Generos list={anime.producers} />}</span></h3>

                        <div className="anDe-links-external">
                            <h3>Streaming:</h3>
                            <ul>
                                {<LinksExternal list={anime.streaming} />}
                            </ul>
                        </div>

                        <div className="anDe-links-external">
                            <h3>Links External:</h3>
                            <ul>
                                {<LinksExternal list={anime.external} />}
                            </ul>
                        </div>
                    </main>

                </motion.section>
            </>
        )
    }
}