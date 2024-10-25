import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useProducts } from "../products/ProductsProvider";
import { useNavigate } from "react-router-dom";
import "./Home.css";


const Home = () => {
  const [error, setError] = useState(null);
  const { productos, loading, errorProductos } = useProducts();
  const navigate = useNavigate();

  const handleFeaturedProducts = (destacado) => {
    return productos.filter((productos) => productos.isFeatured === destacado);
  };

  const renderFeaturedProducts = (filteredProducts) => {
    if (loading) return <div>Loading...</div>;
    if (errorProductos) {
      setError(errorProductos);
      return <div>{error}</div>;
    }
  
    return (
      <div className="row">
        
        {filteredProducts.map((producto) => (
          <div className="col-md-3 mb-4" key={producto.id}>
            <div className="card card-inicio h-100">
              <img
                src={producto.rutaImagen}
                className="card-img-top"
                alt={producto.productTitle}
                style={{
                  objectFit: "cover",
                  height: "400px",
                  cursor: "pointer",
                }}
                onClick={() => navigate(`/detalle/${producto.id}`)}
              />
              <div className="card-body text-center">
                <h5 className="card-title">{producto.productTitle}</h5>
                <p
                  className="card-text"
                  style={{ fontWeight: "bold", fontSize: "1.2rem" }}
                >
                  ${producto.productPrice}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>
    );
  };
  


  const handleSaleProducts = (enPromo) => {
    return productos.filter((productos) => productos.isPromotion === enPromo);
  };

  const renderProducts = (filteredProducts) => {
    return (
      <div className="row">
        {filteredProducts.map((productos) => {
          if (loading) {
            return <div>Loading...</div>;
          }
          if (errorProductos) {
            setError(errorProductos);
            return <div>{error}</div>;
          }
          return (
            <div className="col-md-3 mb-4" key={productos.id}>
              <div className="card card-inicio h-100">
                {" "}
                {/* Asegura que todas las tarjetas tengan la misma altura */}
                <img
                  src={productos.rutaImagen}
                  className="card-img-top"
                  alt={productos.productTitle}
                  style={{
                    objectFit: "cover",
                    height: "400px",
                    cursor: "pointer",
                  }}
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/detalle/${productos.id}`);
                  }}
                />
                <div className="card-body text-center">
                  <h5 className="card-title">{productos.productTitle}</h5>
                  <p
                    className="card-text"
                    style={{ fontWeight: "bold", fontSize: "1.2rem" }}
                  >
                    ${productos.productPrice}
                  </p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  return (
    <MainLayout>
      {/* Banner de inicio */}
      <div className="banner-inicio">
        <div className="hero-section text-center text-light d-flex align-items-center justify-content-center">
          <div className="overlay"></div>
          <div className="content">
            <img src="/img/logo-ebenezer.png" alt="Logo de Ebenezer" />
            <h1 className="display-3">BIENVENIDO A EBENEZER-STORE</h1>
            <p className="lead">Ropa con propósito, Estilo con valores</p>
          </div>
        </div>
      </div>
  
      <div className="container">
        {/* Inicio destacados */}
        <section>
          <h1 className="mt-4">Lo más Destacado!!!</h1>
          {renderFeaturedProducts(handleFeaturedProducts(1))}
        </section>
        {/* Fin destacados */}
  
        {/* Inicio promoción */}
        <section>
          <h1 className="mt-4">Productos en promoción!!!</h1>
          {renderProducts(handleSaleProducts(1))}
        </section>
        {/* Fin promoción */}
      </div>
    </MainLayout>
  );
  
};

export default Home;
