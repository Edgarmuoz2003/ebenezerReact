import { useParams } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import { useProducts } from "./ProductsProvider";

const DetalleProductos = () => {
  const { id } = useParams();
  const { productos } = useProducts();

  const detalle = productos.find((producto) => producto.id === parseInt(id));

  if (!detalle) {
    return <div>Producto no encontrado</div>;
  }

  const formatPrice = (price) => {
    return `$${price.toLocaleString('es-CO')}`;
  };

  // sizes ya debería ser un array gracias a la conversión en el backend
  const sizesArray = Object.values(detalle.sizes);

  return (
    <MainLayout>
      <div className="container mt-4">
        <h1>Detalles del Producto</h1>
        <div className="row">
          <div className="col-md-6">
            <div className="imagenDetalle">
              <img src={detalle.rutaImagen} alt={detalle.productTitle} className="img-fluid" />
            </div>
          </div>
          <div className="col-md-6">
            <h2>{detalle.productTitle}</h2>
            <p>{detalle.productDescription}</p>
            <p className="h4">{formatPrice(detalle.productPrice)}</p>
            <p>Tallas disponibles:</p>
            <ul>
              {sizesArray.map((size, index) => (
                <li key={index}>{size}</li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default DetalleProductos;



