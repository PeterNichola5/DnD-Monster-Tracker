import React from 'react';
import './App.css';
import { SearchBar } from './features/searchBar/SearchBar';
import { Monster } from './components/Monster';
import { MonsterList } from './features/monsterList/MonsterList';

function App() {
  return (
    <div className="App">
      <header className="App-header">
        
      </header>
      <div className='search-bar-div'>
        <SearchBar />
        <Monster/>
      </div>
      <div className='mon-list'> 
      < MonsterList/>
      </div>
      
    </div>
  );
}

export default App;
