import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import { useProducts } from "../products/ProductsProvider";
import { useNavigate } from "react-router-dom";



const Home = () => {
  const [error, setError] = useState(null);
  const { productos, loading, errorProductos } = useProducts();
  const navigate = useNavigate();

  const handleFeaturedProducts = (destacado) => {
    return productos.filter((productos) => productos.isFeatured === destacado);
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
              <div className="card h-100"> {/* Asegura que todas las tarjetas tengan la misma altura */}

                <img
                  src={productos.rutaImagen}
                  className="card-img-top"
                  alt={productos.productTitle}
                  style={{ objectFit: "cover", height: "400px", cursor: "pointer" }}
                  onClick={(e)=> {
                    e.preventDefault();
                    navigate(`/detalle/${productos.id}`)
                  }}
                />
              
                <div className="card-body">
                  <h5 className="card-title">{productos.productTitle}</h5>
                  <p className="card-text">${productos.productPrice}</p>
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
      <div className="container">
        {/* inicio carrousel */}
        <div id="carouselExampleAutoplaying" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner">
            <div class="carousel-item active">
              <img src="/img/bienvenido.png" class="d-block w-100" alt="baner de bienvenida" />
            </div>
            <div class="carousel-item">
              <img src="/img/baner2.png" class="d-block w-100" alt="banner promocional" />
            </div>
          </div>
          <button
            class="carousel-control-prev"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="prev"
          >
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button
            class="carousel-control-next"
            type="button"
            data-bs-target="#carouselExample"
            data-bs-slide="next"
          >
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
        {/* fin carrousel */}

        {/* inicio destacados */}
        <section>
          <h1 className="mt-4">Lo mas Destacado!!!</h1>

          {renderProducts(handleFeaturedProducts(1))}
        </section>
        {/* fin destacados */}

         {/* inicio destacados */}
         <section>
          <h1 className="mt-4">Productos en promocion!!!</h1>

          {renderProducts(handleSaleProducts(1))}
        </section>
        {/* fin destacados */}
      </div>
    </MainLayout>
  );
};

export default Home;
