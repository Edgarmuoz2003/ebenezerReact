// Este componente provee de un Contexto del estado de Autenticasion
// del usuario, para renderizar vistas u objetos en funcion de ello

//Comenzamos importando de react los elementos createContext, useState, useContext
import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    JSON.parse(localStorage.getItem("isAuthenticated")) || false
  );
  const [error, setError] = useState("");
  const [nombre, setNombre] = useState(localStorage.getItem("nombre") || "");

  useEffect(() => {
    localStorage.setItem("isAuthenticated", isAuthenticated);
    localStorage.setItem("nombre", nombre);
  }, [isAuthenticated, nombre]);

  const login = async (email, contrasenia) => {
    try {
      const response = await axios.post("http://localhost:4000/api/login", { email, contrasenia });
      if (response.data.exitoso) {
        setIsAuthenticated(true);
        setNombre(response.data.nombre);
        setError("");
      } else {
        setError(response.data.error || "Error desconocido");
      }
    } catch (error) {
      setError(error.response?.data?.error || "Error al enviar la solicitud al front");
    }
  };

  const logout = () => {
    setIsAuthenticated(false);
    setNombre("");
    localStorage.removeItem("isAuthenticated");
    localStorage.removeItem("nombre");
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout, error, nombre }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);

