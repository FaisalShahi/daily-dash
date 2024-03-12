import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Menu from './components/menu/Menu.js';
import Todo from './components/todo/Main.js';
import Timer from './components/timer/Timer.js'

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Menu />} />
          <Route path='/todo' element={<Todo />} />
          <Route path='/timer' element={<Timer />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
