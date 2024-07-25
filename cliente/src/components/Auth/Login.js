import { useNavigate } from "react-router-dom"
import { useState } from "react";
import { useAuth } from "./AuthProvider";
import "./Login.css";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail]= useState("")
  const [contrasenia, setContrasenia]= useState("")
  const [error, setError] = useState('');

  const handleLogin = async (event) => {
    event.preventDefault();

    try {
      await login(email, contrasenia);
      navigate('/home')
    } catch (error) {
      setError('Credenciales incorrectas o error del servidor');
      console.error('Error de login:', error);
    }
  };

  return (
    <div className="container-login">
            <div className="card card-login">
                <h3 className="card-title">Iniciar Sesión</h3>
                <form onSubmit={handleLogin}>
                    <div className="mb-3">
                        <label htmlFor="email" className="form-label">Correo Electrónico</label>
                        <input type="email" className="form-control" id="email" name="email" value={email} onChange={(e)=> setEmail(e.target.value)} required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="contrasenia" className="form-label">Contraseña</label>
                        <input type="password" className="form-control" id="contrasenia" name="contrasenia" value={contrasenia} onChange={(e)=>setContrasenia(e.target.value)} required />
                    </div>
                    <div className="mb-3 form-check">
                        <input type="checkbox" className="form-check-input" id="remember" name="remember" />
                        <label className="form-check-label" htmlFor="remember">Recordar Sesión</label>
                    </div>
                    {error && <div className="alert alert-danger">{error}</div>}
                    <button type="submit" className="btn btn-primary">Iniciar Sesión</button>
                </form>
            </div>
        </div>
  );
};

export default Login;
