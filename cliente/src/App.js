import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { AuthProvider } from './components/Auth/AuthProvider';
import Home from './components/home/Home';
import Login from './components/Auth/Login';
import Tienda from './components/shop/Tienda';
import Nosotros from './components/about/Nosotros';
import Contactenos from './components/contact/Contactenos';
import ProtectedRoute from './components/Auth/ProtectedRoutes';
import Productos from './components/products/Productos';
import { ProductsProvider } from './components/products/ProductsProvider';
import DetalleProductos from './components/products/DetalleProductos';

//se añadio AuthProvider (un componente que creé) para proveer de contexto
//del estado de autenticasion del usuario

function App() {
  return (
    <AuthProvider>
      <ProductsProvider> 
        <Router>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/tienda" element={<Tienda />} />
            <Route path="/nosotros" element={<Nosotros />} />
            <Route path='/contactenos' element={<Contactenos />} />
            <Route path='/detalle/:id' element={<DetalleProductos />} />
            <Route element={<ProtectedRoute />}>
              <Route path='/productos' element={<Productos />} />
            </Route>
          </Routes>
        </Router>
      </ProductsProvider>
    </AuthProvider>
  );
}

export default App;
