import './App.css';
import './Main.css'
import MainPage from './MainPage';
import CharacterList from './CharacterList'; 
import EpisodeList from './EpisodeList'
import LocationList from './LocationList'
import CharacterDetails from './CharacterDetails';
import { Routes, Route, Link } from 'react-router-dom';


function App() {
  return (
    <div>
      <nav>
        <Link to='/' className='LinkStyle'>Главная</Link>
        <Link to='/characters' className='LinkStyle'>Персонажи</Link>
        <Link to='/episodes' className='LinkStyle'>Эпизоды</Link>
        <Link to='/locations' className='LinkStyle'>Локации</Link>
      </nav>
      <Routes>
        <Route path='/' element={<MainPage/>}/> 
        <Route path='/characters' element={<CharacterList/>}/> 
        <Route path='/characters/:characterId' element={<CharacterDetails/>}/>
        <Route path='/episodes' element={<EpisodeList/>}/>
        <Route path='/locations' element={<LocationList/>}/>
      </Routes>
    </div>
  )
}

export default App;

// ну если кратенько подсказать смотри
// 1. Создаём карточку персонажа как компонент, то есть каждый персонаж у тебя это должен быть компонент а не циклически созданная html верстка просто
// 2. Создаём саму динамическую страницу, в ней из url достаем параметр и отправляем запрос за данными и отрисовываем
// 3. Прописываем динамический маршрут в роуте

// Ну и да не забываем связать страницу основную и компонент, там мы получаем такой результат что компонент самой страницы занимает строчек 20-30 от силы






