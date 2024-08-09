import { useNavigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useProducts } from "../products/ProductsProvider";

const Tienda = () => {
  const { productos, loading, errorProductos } = useProducts();
  const navigate = useNavigate();

  return (
    <MainLayout>
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

        <div className="row">
          {productos.map((producto) => (
            <div className="col-md-3 mb-4" key={producto.id}>
              <div className="card h-100 ">
                <img 
                src={producto.rutaImagen} 
                className="card-img-top"
                alt={producto.title} 
                style={{ objectFit: "cover", height: "400px", cursor: "pointer" }}
                onClick={(e)=> {
                  e.preventDefault()
                  navigate(`/detalle/${producto.id}`)
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
