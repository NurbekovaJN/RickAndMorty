import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom"
import { Link } from "react-router-dom";
import { Button } from 'antd'


function CharacterDetails(){
    const { characterId } = useParams()
    const [character, setCharacter] = useState(null)
    const [loading, setLoading] = useState(true)
    const [error, setError] = useState(null)

    useEffect(() => {
        const RickAndMortyApiBaseUrl = 'https://rickandmortyapi.com/api'

        const fetchCharacterDetails = async() => {
            if(!characterId){
                setLoading(false)
                setError('Error ID not found')
                return
            }

            
            try {
                setLoading(true)
                setError(null)
                setCharacter(null)
                
                const response = await axios.get(`${RickAndMortyApiBaseUrl}/character/${characterId}`)
                console.log('Character details: ', response.data)
                setCharacter(response.data)
            }
            catch(err){
                console.log(`error, ID of ${characterId} not found`, err)
                setError('no ID')
            }
            finally{
                setLoading(false)
            }
          
        }

        fetchCharacterDetails()

    },

    [characterId])
    if(loading){
        return <div className="loading-message">Загрузка персонажа...</div>
    }

    if(error){
        return <div className="error-message" style={{color: 'red'}}>Error: {error}</div>
    }
    return(
        <div className="container">
            <h1 className="container-title">Подробнее о персонаже</h1>
            <div className="character-card">
                <img src={character.image} alt={character.name} style={{width: '300px', height: '300px', borderRadius: '25px', border: "1px solid black"}} />
                <div className="allSpans">
                    <div className="span-div">
                        <span>Имя - </span>
                        <span className="character-span">{character.name}</span>
                    </div>
                    <div className="span-div">
                        <span>Раса - </span>
                        <span className="character-span">{character.species}</span>
                    </div>
                    <div className="span-div">
                        <span>Пол - </span>
                        <span className="character-span">{character.species}</span>
                    </div>
                    <div className="span-div">
                        <span>Статус - </span>
                        <span className="character-span">{character.status}</span>
                    </div>
                    <div className="span-div">
                        <span>Локация - </span>
                        <span className="character-span">{character.location.name}</span>
                    </div>
                    <div className="span-div">
                        <span>Ориджин - </span>
                        <span className="character-span">{character.origin.name}</span>
                    </div>

                    {/* <span>{character.episode}</span> */}
                </div>
            </div>
                <Button className="linkButton">
                    <Link to='/characters' className="BackLink">Назад</Link>
                </Button>
        </div>
    )
    
}

export default CharacterDetails