import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import "./Productos.css";
import Swal from "sweetalert2";
import axios from "axios";
import { useProducts } from "./ProductsProvider";
import { useNavigate } from "react-router-dom";
import ProductModal from "./partials/ModalPublicar";
import ModalEditar from "./partials/ModalEditar";

const Productos = () => {
  const [loadImage, setLoadImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [productTitle, setProductTitle] = useState("");
  const [productDescription, setProductDescription] = useState("");
  const [productPrice, setProductPrice] = useState("");
  const [category, setCategory] = useState("");
  const [subCategory, setSubCategory] = useState("");
  const [sizes, setSizes] = useState({
    XS: false,
    S: false,
    M: false,
    L: false,
    XL: false,
    XXL: false,
  });
  const [isPromotion, setIsPromotion] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [productId, setProductId] = useState("");
  const [error, setError] = useState("");
  const { productos, loading, errorProductos } = useProducts();
  const navigate = useNavigate();

  const subCategories = {
    pijamas: ["short", "capri", "vestido", "pantalon"],
    camisetas: [],
  };

  const handleLoadImage = (event) => {
    const image = event.target.files[0];
    setLoadImage(image);

    if (image) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result);
      };
      reader.readAsDataURL(image);
    } else {
      setPreview(null);
    }
  };

  const resetValues = () => {
    setLoadImage(null);
    setPreview(null);
    setProductTitle("");
    setProductDescription("");
    setProductPrice("");
    setCategory("");
    setSubCategory("");
    setSizes({
      XS: false,
      S: false,
      M: false,
      L: false,
      XL: false,
      XXL: false,
    });
    setIsPromotion(false);
    setIsFeatured(false);
    setError("");
    document.getElementById("productImage").value = ""; // Restablece el valor del input

    const modal = document.getElementById("exampleModal");
    const modalInstance = window.bootstrap.Modal.getInstance(modal);

    // Verificar que modalInstance no sea null antes de llamar a hide()
    if (modalInstance) {
      modalInstance.hide();
    }
  };

  const validateForm = () => {
    if (!Object.values(sizes).includes(true)) {
      setError("Por favor, selecciona al menos una talla disponible.");
      return false;
    }
    setError("");
    return true;
  };

  const handleAddProducts = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    // Crear un FormData para enviar la imagen y otros datos
    const formData = new FormData();
    formData.append("rutaImagen", loadImage);
    formData.append("productTitle", productTitle);
    formData.append("productDescription", productDescription);
    formData.append("productPrice", productPrice);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append(
      "sizes",
      JSON.stringify(Object.keys(sizes).filter((size) => sizes[size]))
    );
    formData.append("isPromotion", isPromotion);
    formData.append("isFeatured", isFeatured);

    try {
      await axios.post("http://localhost:4000/api/productos", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
      await resetValues();
      Swal.fire("Éxito", "El Producto ha Sido Publicado", "success");
      window.location.reload();
    } catch (error) {
      console.error("Error al agregar el producto:", error);
      // Mostrar mensaje de error
      Swal.fire("Error", "El Producto no ha Sido Publicado", "error");
    }
  };

  const handleUpdateProduct = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }

    const formData = new FormData();
    if (loadImage) {
      formData.append("rutaImagen", loadImage); // Solo si hay una nueva imagen
    }
    formData.append("productTitle", productTitle);
    formData.append("productDescription", productDescription);
    formData.append("productPrice", productPrice);
    formData.append("category", category);
    formData.append("subCategory", subCategory);
    formData.append(
      "sizes",
      JSON.stringify(Object.keys(sizes).filter((size) => sizes[size]))
    );
    formData.append("isPromotion", isPromotion);
    formData.append("isFeatured", isFeatured);

    try {
      await axios.put(
        `http://localhost:4000/api/productos/${productId}`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      await resetValues();
      Swal.fire("Éxito", "El Producto ha Sido Actualizado", "success");
      window.location.reload();
    } catch (error) {
      console.error("Error al actualizar el producto:", error);
      Swal.fire("Error", "El Producto no ha Sido Actualizado", "error");
    }
  };

  const handleSizeChange = (size) => {
    setSizes((prevSizes) => ({
      ...prevSizes,
      [size]: !prevSizes[size],
    }));
  };

  const handleProductsByCategory = (categoria) => {
    return productos.filter((productos) => productos.category === categoria);
  };

  const handleProductsSubByCategory = (subCategoria) => {
    return productos.filter(
      (productos) => productos.subCategory === subCategoria
    );
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
            <div className="col-md-4 mb-4" key={productos.id}>
              <div className="card h-100">
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
                <div className="card-body">
                  <h5 className="card-title">{productos.productTitle}</h5>
                  <p className="card-text">${productos.productPrice}</p>
                </div>
                <div className="card-footer">
                 <div className="col-md-3">
                 <button
                    type="button"
                    className="btn btn-primary btn-sm"
                    data-bs-toggle="modal"
                    data-bs-target="#ModalEditar"
                    onClick={() => handleEditProduct(productos)}
                  >
                    Editar
                  </button>
                  <button className="btn btn-danger"  onClick={() => handleDeleteProduct(productos)}>Eliminar</button>
                 </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    );
  };

  const handleEditProduct = (producto) => {
    setProductTitle(producto.productTitle);
    setProductDescription(producto.productDescription);
    setProductPrice(producto.productPrice);
    setCategory(producto.category);
    setSubCategory(producto.subCategory);
    setSizes({
      XS: producto.sizes.includes("XS"),
      S: producto.sizes.includes("S"),
      M: producto.sizes.includes("M"),
      L: producto.sizes.includes("L"),
      XL: producto.sizes.includes("XL"),
      XXL: producto.sizes.includes("XXL"),
    });
    setIsPromotion(producto.isPromotion);
    setIsFeatured(producto.isFeatured);
    setPreview(producto.rutaImagen); // Para mostrar la imagen actual
    setProductId(producto.id);
    setLoadImage(null); // O mantener la imagen previa si necesitas subir una nueva
  };

  const handleDeleteProduct = async (producto)=>{
    try {
      console.log("El id del producto es: ", producto.id)
      await axios.delete(`http://localhost:4000/api/productos/${producto.id}`)
    Swal.fire("Éxito", "El Producto ha Sido Eliminado", "success");
    window.location.reload();
    } catch (error) {
      console.error("Error al eliminar el producto:", error);
      Swal.fire("Error", "El Producto no ha Sido Eliminado", "error");
    }
    
  }

  return (
    <MainLayout>
      <div className="container">
        <h1>Administrar Productos</h1>

        {/* Inicio Modal Agregar Productos */}
        <section className="seccion-agregar-productos mt-4 mb-4">
          <div className="col-md-2">
            <button
              type="button"
              className="btn btn-primary btn-sm"
              data-bs-toggle="modal"
              data-bs-target="#exampleModal"
            >
              Publicar Productos
            </button>
          </div>

          <ProductModal
            modalId="exampleModal"
            title="Agregar un Producto"
            handleFormSubmit={handleAddProducts}
            handleLoadImage={handleLoadImage}
            handleSizeChange={handleSizeChange}
            setProductTitle={setProductTitle}
            setProductDescription={setProductDescription}
            setProductPrice={setProductPrice}
            setCategory={setCategory}
            setSubCategory={setSubCategory}
            setIsPromotion={setIsPromotion}
            setIsFeatured={setIsFeatured}
            sizes={sizes}
            productTitle={productTitle}
            productDescription={productDescription}
            productPrice={productPrice}
            category={category}
            subCategory={subCategory}
            isPromotion={isPromotion}
            isFeatured={isFeatured}
            preview={preview}
            error={error}
            subCategories={subCategories}
            handleAddProducts={handleAddProducts}
          />
        </section>
        {/* Fin Modal Agregar Productos */}

        {/* Inicio Modal Editar Productos */}
        <section className="seccion-agregar-productos mt-4 mb-4">
          <ModalEditar
            modalId="ModalEditar"
            title="Agregar un Producto"
            handleFormSubmit={handleAddProducts}
            handleLoadImage={handleLoadImage}
            handleSizeChange={handleSizeChange}
            setProductTitle={setProductTitle}
            setProductDescription={setProductDescription}
            setProductPrice={setProductPrice}
            setCategory={setCategory}
            setSubCategory={setSubCategory}
            setIsPromotion={setIsPromotion}
            setIsFeatured={setIsFeatured}
            sizes={sizes}
            productTitle={productTitle}
            productDescription={productDescription}
            productPrice={productPrice}
            category={category}
            subCategory={subCategory}
            isPromotion={isPromotion}
            isFeatured={isFeatured}
            preview={preview}
            error={error}
            subCategories={subCategories}
            handleUpdateProduct={handleUpdateProduct}
            loadImage={loadImage}
          />
        </section>
        {/* Fin Modal Editar Productos */}

        <section className="seccion-tab-productos">
          <ul className="nav nav-tabs mt-4" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="tab-camisetas"
                data-bs-toggle="tab"
                data-bs-target="#camisetas-tab-pane"
                type="button"
                role="tab"
                aria-controls="camisetas-tab-pane"
                aria-selected="true"
              >
                Camisetas
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="shorts-tab"
                data-bs-toggle="tab"
                data-bs-target="#shorts-tab-pane"
                type="button"
                role="tab"
                aria-controls="shorts-tab-pane"
                aria-selected="false"
              >
                Shorts
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="capris-tab"
                data-bs-toggle="tab"
                data-bs-target="#capris-tab-pane"
                type="button"
                role="tab"
                aria-controls="capris-tab-pane"
                aria-selected="false"
              >
                Capris
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="pantalon-tab"
                data-bs-toggle="tab"
                data-bs-target="#pantalon-tab-pane"
                type="button"
                role="tab"
                aria-controls="pantalon-tab-pane"
                aria-selected="false"
              >
                Pantalon
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="vestido-tab"
                data-bs-toggle="tab"
                data-bs-target="#vestido-tab-pane"
                type="button"
                role="tab"
                aria-controls="vestido-tab-pane"
                aria-selected="false"
              >
                Vestido
              </button>
            </li>
          </ul>
          <div className="tab-content" id="myTabContent">
            {/* inicio Contenido Camisetas */}
            <div
              className="tab-pane fade show active mt-4"
              id="camisetas-tab-pane"
              role="tabpanel"
              aria-labelledby="tab-camisetas"
              tabIndex="0"
            >
              {renderProducts(handleProductsByCategory("camisetas"))}
            </div>
            {/* fin Contenido Camisetas */}

            {/* inicio Contenido shorts */}
            <div
              className="tab-pane fade mt-4"
              id="shorts-tab-pane"
              role="tabpanel"
              aria-labelledby="shorts-tab"
              tabIndex="0"
            >
              {renderProducts(handleProductsSubByCategory("short"))}
            </div>
            {/* fin Contenido shorts */}

            {/* inicio Contenido capris */}
            <div
              className="tab-pane fade mt-4 "
              id="capris-tab-pane"
              role="tabpanel"
              aria-labelledby="capris-tab"
              tabIndex="0"
            >
              {renderProducts(handleProductsSubByCategory("capri"))}
            </div>
            {/* fin Contenido capris */}

            {/* inicio Contenido pantalon */}
            <div
              className="tab-pane fade mt-4"
              id="pantalon-tab-pane"
              role="tabpanel"
              aria-labelledby="pantalon-tab"
              tabIndex="0"
            >
              {renderProducts(handleProductsSubByCategory("pantalon"))}
            </div>
            {/* fin Contenido pantalon */}

            {/* inicio Contenido vestidos */}
            <div
              className="tab-pane fade mt-4"
              id="vestido-tab-pane"
              role="tabpanel"
              aria-labelledby="vestido-tab"
              tabIndex="0"
            >
              {renderProducts(handleProductsSubByCategory("vestido"))}
            </div>
            {/* fin Contenido vestidos */}
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Productos;
