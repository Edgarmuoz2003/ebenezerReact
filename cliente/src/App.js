import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthProvider';
import Home from './components/home/Home';
import Login from './components/Auth/Login';

//se añadio AuthProvider (un componente que creé) para proveer de contexto
//del estado de autenticasion del usuario

function App() {
  return (
    <AuthProvider> 
      <Router>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

export default App;
