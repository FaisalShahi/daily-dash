import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Menu from './components/menu/menu.js';
import Todo from './components/todo/todo.js';
import Timer from './components/timer/timer.js'

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
