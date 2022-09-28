import './App.css';
import Login from './component/Login';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import NoPage from './component/NoPage';
import Home from './component/Home';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/login/:id" element={<Login />} />
          <Route path="*" element={<NoPage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
