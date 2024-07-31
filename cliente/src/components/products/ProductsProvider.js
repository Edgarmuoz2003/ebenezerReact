import React, { createContext, useState, useContext, useEffect } from "react";
import axios from "axios";

const ProductsContext = createContext();

export const ProductsProvider = ({ children }) => {
    const [productos, setProductos] = useState([]);
    const [loading, setLoading] = useState(true);
    const [errorProductos, setErrorProductos] = useState(null);


    useEffect(() => {
        // Función para cargar los productos desde la API
        const fetchProducts = async () => {
          try {
            const response = await axios.get('http://localhost:4000/api/productos');
            setProductos(response.data);
            setErrorProductos(response.data.error);
          } catch (error) {
            console.error('Error fetching products:', error);
          } finally {
            setLoading(false);
          }
        };
    
        fetchProducts();
      }, []);

 

  return (
    <ProductsContext.Provider value={{ productos, loading, errorProductos }}>
      {children}
    </ProductsContext.Provider>
  );
};

export const useProducts = () => useContext(ProductsContext);