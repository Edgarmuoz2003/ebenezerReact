// Este componente provee de un Contexto del estado de Autenticasion
// del usuario, para renderizar vistas u objetos en funcion de ello

//Comenzamos importando de react los elementos createContext, useState, useContext
import React, { createContext, useState, useContext } from "react";
import axios from 'axios';

//Crear el contexto de autenticasion
const AuthContext = createContext();

//Componente proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [error, setError] = useState("");
  const [nombre, setNombre] = useState("");

  const login = async (email, contrasenia) => {
    try {
      const response = await axios.post('http://localhost:4000/api/login', { email, contrasenia })
      if (response.data.exitoso) {
        setIsAuthenticated(true);
        setNombre(response.data.nombre)
        setError(""); // Limpiamos cualquier error previo
      } else {
        setError(response.data.error || "Error desconocido"); 
      }
    } catch (error) {
      setError(error.response?.data?.error || "Error al enviar la solicitud al front");
    }
  }



  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error, nombre }}>
      {children}
    </AuthContext.Provider>
  );
};

// Crear un hook para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);
