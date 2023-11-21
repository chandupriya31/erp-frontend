import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Register from './components/Register';
import Home from './components/Home';
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/register' element={<Register />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
