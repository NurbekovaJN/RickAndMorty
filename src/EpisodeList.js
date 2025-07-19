import { useEffect, useState } from "react";
import axios from "axios";


function EpisodeList(){
    const [episode, setEpisode] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const RickAndMortyApiBaseUrl = 'https://rickandmortyapi.com/api';
        const EpisodeEndPoint = '/episode'

        const fetchEpisodes = async () => {
            try {
                setLoading(true)
                setError(null)

                const response = await axios.get(RickAndMortyApiBaseUrl + EpisodeEndPoint)
                console.log('All episode of RickAndMorty', response.data.results)
                setEpisode(response.data.results)
            }
            catch(err) {
                console.log('error, episodes not found', err)
                setError('Can not find any episodes, please try again later')
            }
            finally {
                setLoading(false)
            }
        }
        fetchEpisodes()
    },

    [])
    if(loading){
        return <div className="loading-message">Загрузка эпизодов</div>
    }
    if(error){
        return <div className="error-message" style={{color: 'red'}}>`Ошибка: {error}`</div>
    }
    return(
        <div className="container">
            <h1 className="container-title">Все эпизоды "Рик и Морти"</h1>
            {episode.length > 0 ? (
                <ul>
                    {episode.map(episode => (
                        <li className="episode-li" key={episode.id}>
                            <span className="episode-span">Название серии - '{episode.name}'</span>
                            <span className="episode-span">Эпизод - {episode.episode}</span>
                            <span className="episode-span">Дата выхода - {episode.air_date}</span>
                        </li>
                    ))}
                </ul>
            ) : (<p>Нет эпизодов для отображения</p>)}
        </div>
    )

  
}

export default EpisodeList