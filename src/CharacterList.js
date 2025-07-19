import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { Button } from 'antd'



function CharacterList() {
    // 2. Используем более осмысленные имена для состояний
    const [characters, setCharacters] = useState([]); // Для хранения списка персонажей
    const [loading, setLoading] = useState(true); // Для индикации загрузки данных
    const [error, setError] = useState(null); // Для хранения ошибок, если они возникнут

    useEffect(() => {
        const RickAndMortyApiBaseUrl = 'https://rickandmortyapi.com/api'; 
        const characterEndpoint = '/character'; 

        // Асинхронная функция для выполнения запроса
        const fetchCharacters = async () => {
            try {
                // Устанавливаем состояние загрузки в true перед запросом
                setLoading(true);
                // Сбрасываем предыдущие ошибки
                setError(null);

                const response = await axios.get(RickAndMortyApiBaseUrl + characterEndpoint);
                console.log('All characters of "Rick and Morty"', response.data.results);
                setCharacters(response.data.results); // 3. Сохраняем данные в состоянии

            } 
            catch (err) {
                // Обработка ошибок
                console.error("Error fetching characters:", err);
                setError('Не удалось загрузить персонажей. Пожалуйста, попробуйте позже.');
            } 
            finally {
                // 4. Всегда устанавливаем loading в false после завершения запроса (успех или ошибка)
                setLoading(false);
            }
        };

        fetchCharacters(); // Вызываем асинхронную функцию
        
}, 

[]); // 4. Пустой массив зависимостей: эффект запустится один раз при монтировании компонента

 // 2. Возвращаем JSX в зависимости от состояния
    if (loading) {
        return <div className="loading-message">Загрузка персонажей...</div>;
    }

    if (error) {
        return <div className="error-message" style={{ color: 'red' }}> Ошибка: {error}</div>;
    }

        // Если данные загружены и нет ошибок, отображаем список персонажей
    return (
        <div className="container">
            <h1 className='container-title'>Все персонажи "Рик и Морти"</h1>
            {characters.length > 0 ? (
                <ul>
                    {characters.map(character => (
                        <li className="character-li" key={character.id}>
                            <img src={character.image} alt={character.name} style={{ width: '150px', height: '150px', borderRadius: '50%', border: '2px solid black'}} />
                            <div className='allSpans'>
                                <span className="character-span">{character.name} - {character.species}</span>
                                <Link to={`/characters/${character.id}`} className='detailsLink'>                    
                                    <Button className='linkButton'>
                                        Подробнее
                                    </Button>
                                </Link>
                            </div>
                        </li>
                    ))}
                </ul>
            ) : (<p>Нет персонажей для отображения.</p>)}
        </div>
    );
}

export default CharacterList;