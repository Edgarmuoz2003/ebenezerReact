// Este componente provee de un Contexto del estado de Autenticasion
// del usuario, para renderizar vistas u objetos en funcion de ello

//Comenzamos importando de react los elementos createContext, useState, useContext
import React, { createContext, useState, useContext } from "react";

//Crear el contexto de autenticasion
const AuthContext = createContext();

//Componente proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const login = async (email, contrasenia) => {
    
  }



  const logout = () => setIsAuthenticated(false);

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Crear un hook para usar el contexto de autenticación
export const useAuth = () => useContext(AuthContext);
