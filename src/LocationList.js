import { useEffect, useState } from "react";
import axios from "axios";


function LocationList(){
    const [location, setLocation] = useState([])
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const RickAndMortyApiBaseUrl = 'https://rickandmortyapi.com/api'
        const LocationEndPoint = '/location'

        
        const fetchLocation = async() => {
            try {
                setLoading(true)
                setError(null)

                const response = await axios.get(RickAndMortyApiBaseUrl + LocationEndPoint)
                console.log('All locations of RickAndMorty', response.data)
                setLocation((response).data.results)
            }
            catch(err){
                console.log('error, found no location', err)
                setError('Can not find any location, please try again later')
            }
            finally{
                setLoading(false)
            }
        }
        fetchLocation()
    },

    [])
    if(loading){
        return <div className="loading-message">Загрузка локаций</div>
    }
    if(error){
        return <div className="error-message" style={{color: 'red'}}>`Error ${error}`</div>
    }
    return(
        <div className="container">
            <h1 className="container-title">Все локации "Рик и Морти"</h1>
            {location.length > 0 ? (
                <ul>
                    {location.map(location => 
                        <li className="location-li" key={location.id}>
                            <div className="span-div">
                                <span>Название</span>
                                <span className="location-span">'{location.name}'</span>
                            </div>
                            <div className="span-div">
                                <span>Измерение</span>
                                <span className="location-span">{location.dimension}</span>
                            </div>
                            <div className="span-div">
                                <span>Тип</span>
                                <span className="location-span">{location.type}</span>
                            </div>
                        </li>
                    )}
                </ul>
            ) : (<p>Нет локаций для отображения</p>)}
        </div>
    )

}

export default LocationList