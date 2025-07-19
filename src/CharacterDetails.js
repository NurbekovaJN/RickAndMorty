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
                    <span>Имя - {character.name}</span>
                    <span>Раса - {character.species}</span>
                    <span>Пол -{character.gender}</span>
                    <span>Статус - {character.status}</span>  
                    {/* <span>{character.episode}</span> */}
                    <span>Локация - {character.location.name}</span>
                    <span>Ориджин - {character.origin.name}</span>
                </div>
            </div>
                <Button className="linkButton">
                    <Link to='/characters' className="BackLink">Назад</Link>
                </Button>
        </div>
    )
    
}

export default CharacterDetails