import { useState } from "react";
import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useProducts } from "../products/ProductsProvider";
import './Tienda.css';

const Tienda = () => {
  const { productos, loading, errorProductos } = useProducts();
  const navigate = useNavigate();

  // Estado para manejar el filtro de categoría
  const [filtroCategoria, setFiltroCategoria] = useState("");

  // Función para manejar el cambio del filtro de categoría
  const handleFiltroCategoriaChange = (e) => {
    setFiltroCategoria(e.target.value);
  };

  // Filtrar los productos según la categoría seleccionada
  const productosFiltrados = productos.filter((producto) => 
    filtroCategoria === "" || producto.category === filtroCategoria || producto.subCategory === filtroCategoria
  );

  return (
    <MainLayout>
      <a href="https://api.whatsapp.com/send?phone=573004876678" className="banner1" target="blank">
        <img src="/img/1.png" alt="Banner de Estampados" />
      </a>
      <div className="container">
        {loading && (
          <div>
            <p>Loading...</p>
          </div>
        )}

        {errorProductos && (
          <div>
            <p>{errorProductos}</p>
          </div>
        )}

        {/* Selector de categoría */}
        <div className="filtro-categoria">
          <label htmlFor="categoria">Filtrar por categoría:</label>
          <select id="categoria" value={filtroCategoria} onChange={handleFiltroCategoriaChange}>
            <option value="">Todas</option>
            <option value="camisetas">Camisetas</option>
            <option value="pijamas">Pijamas</option>
            <option value="capri">PIjamas de Capri</option>
            <option value="short">Pijamas de Shorts</option>
            <option value="pantalons">Pijamas de Pantalon</option>
            <option value="vestido">Pijamas de Vestido</option>
            {/* Añadir más opciones según las categorías disponibles */}
          </select>
        </div>

        <br/><br/>

        <div className="row">
          {productosFiltrados.map((producto) => (
            <div className="col-md-3 mb-4" key={producto.id}>
              <div className="card h-100">
                <img 
                  src={producto.rutaImagen} 
                  className="card-img-top"
                  alt={producto.title} 
                  style={{ objectFit: "cover", height: "400px", cursor: "pointer" }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/detalle/${producto.id}`);
                  }}
                />
                <div className="card-body">
                  <h5 className="card-title">{producto.productTitle}</h5>
                  <p className="card-text">${producto.productPrice}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
};

export default Tienda;
