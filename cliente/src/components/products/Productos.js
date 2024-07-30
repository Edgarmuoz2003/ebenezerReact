import { useState } from "react";
import MainLayout from "../layouts/MainLayout";
import './Productos.css';

const Productos = () => {
  const [loadImage, setLoadImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [productTitle, setProductTitle] = useState('');
  const [productDescription, setProductDescription] = useState('');
  const [productPrice, setProductPrice] = useState('');
  const [category, setCategory] = useState('');
  const [subCategory, setSubCategory] = useState('');
  const [sizes, setSizes] = useState({
    XS: false,
    S: false,
    M: false,
    L: false,
    XL: false,
    XXL: false
  });
  const [isPromotion, setIsPromotion] = useState(false);
  const [isFeatured, setIsFeatured] = useState(false);
  const [error, setError] = useState('');

  const subCategories = {
    pijamas: ["short", "capri", "vestido", "pantalon"],
    camisetas: []
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

  const validateForm = () => {
    if (!loadImage) {
      setError("Por favor, sube una foto del producto.");
      return false;
    }
    if (!Object.values(sizes).includes(true)) {
      setError("Por favor, selecciona al menos una talla disponible.");
      return false;
    }
    setError('');
    return true;
  };

  const handleAddProducts = async (event) => {
    event.preventDefault();
    if (!validateForm()) {
      return;
    }
    // Aquí iría la lógica para enviar los datos del producto al backend
  };

  const handleSizeChange = (size) => {
    setSizes((prevSizes) => ({
      ...prevSizes,
      [size]: !prevSizes[size]
    }));
  };

  return (
    <MainLayout>
      <div className="container">
        <h1>Administrar Productos</h1>

        {/* Inicio Modal Agregar Productos */}
        <section className="seccion-agregar-productos">
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

          <div
            className="modal fade"
            id="exampleModal"
            tabIndex="-1"
            aria-labelledby="exampleModalLabel"
            aria-hidden="true"
          >
            <div className="modal-dialog">
              <div className="modal-content">
                <div className="modal-header">
                  <h1 className="modal-title fs-5" id="exampleModalLabel">
                    Agregar un Producto
                  </h1>
                  <button
                    type="button"
                    className="btn-close"
                    data-bs-dismiss="modal"
                    aria-label="Close"
                  ></button>
                </div>
                <div className="modal-body">
                  {error && <div className="alert alert-danger">{error}</div>}
                  <form onSubmit={handleAddProducts}>
                    <div className="mb-3">
                      <label htmlFor="productImage" className="form-label">
                        Foto del Producto
                      </label>
                      <input
                        type="file"
                        className="form-control"
                        name="productImage"
                        id="productImage"
                        onChange={handleLoadImage}
                        required
                      />
                    </div>
                    {preview && (
                      <div className="form-group">
                        <img src={preview} alt="Preview" style={{ maxHeight: '300px' }} />
                      </div>
                    )}

                    <div className="mb-3">
                      <label htmlFor="productTitle" className="form-label">
                        Titulo de la publicación
                      </label>
                      <input
                        type="text"
                        className="form-control"
                        name="productTitle"
                        id="productTitle"
                        value={productTitle}
                        onChange={(e) => setProductTitle(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="productDescription" className="form-label">
                        Descripcion del Producto
                      </label>
                      <textarea
                        className="form-control"
                        name="productDescription"
                        id="productDescription"
                        value={productDescription}
                        onChange={(e) => setProductDescription(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="productPrice" className="form-label">
                        Precio del Producto
                      </label>
                      <input
                        type="number"
                        className="form-control"
                        name="productPrice"
                        id="productPrice"
                        value={productPrice}
                        onChange={(e) => setProductPrice(e.target.value)}
                        required
                      />
                    </div>

                    <div className="mb-3">
                      <label htmlFor="category" className="form-label">
                        Categoría del Producto
                      </label>
                      <select
                        className="form-control"
                        name="category"
                        id="category"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        required
                      >
                        <option value="">Seleccionar Categoría</option>
                        <option value="pijamas">Pijamas</option>
                        <option value="camisetas">Camisetas</option>
                      </select>
                    </div>

                    {category === 'pijamas' && (
                      <div className="mb-3">
                        <label htmlFor="subCategory" className="form-label">
                          Subcategoría de Pijamas
                        </label>
                        <select
                          className="form-control"
                          name="subCategory"
                          id="subCategory"
                          value={subCategory}
                          onChange={(e) => setSubCategory(e.target.value)}
                          required
                        >
                          <option value="">Seleccionar Subcategoría</option>
                          {subCategories.pijamas.map((subCat) => (
                            <option key={subCat} value={subCat}>
                              {subCat}
                            </option>
                          ))}
                        </select>
                      </div>
                    )}

                    <div className="mb-3">
                      <label className="form-label">Tallas Disponibles</label>
                      <div className="form-check">
                        {Object.keys(sizes).map((size) => (
                          <div key={size} className="form-check-inline">
                            <input
                              type="checkbox"
                              className="form-check-input"
                              id={size}
                              checked={sizes[size]}
                              onChange={() => handleSizeChange(size)}
                            />
                            <label className="form-check-label" htmlFor={size}>
                              {size}
                            </label>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Publicar como producto en Promoción?</label>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="isPromotion"
                          id="isPromotionYes"
                          value="yes"
                          checked={isPromotion === true}
                          onChange={() => setIsPromotion(true)}
                          required
                        />
                        <label className="form-check-label" htmlFor="isPromotionYes">
                          Sí
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="isPromotion"
                          id="isPromotionNo"
                          value="no"
                          checked={isPromotion === false}
                          onChange={() => setIsPromotion(false)}
                          required
                        />
                        <label className="form-check-label" htmlFor="isPromotionNo">
                          No
                        </label>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">Publicar como producto Destacado?</label>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="isFeatured"
                          id="isFeaturedYes"
                          value="yes"
                          checked={isFeatured === true}
                          onChange={() => setIsFeatured(true)}
                          required
                        />
                        <label className="form-check-label" htmlFor="isFeaturedYes">
                          Sí
                        </label>
                      </div>
                      <div className="form-check">
                        <input
                          type="radio"
                          className="form-check-input"
                          name="isFeatured"
                          id="isFeaturedNo"
                          value="no"
                          checked={isFeatured === false}
                          onChange={() => setIsFeatured(false)}
                          required
                        />
                        <label className="form-check-label" htmlFor="isFeaturedNo">
                          No
                        </label>
                      </div>
                    </div>

                    <div className="modal-footer">
                      <button
                        type="button"
                        className="btn btn-secondary"
                        data-bs-dismiss="modal"
                      >
                        Cerrar
                      </button>
                      <button type="submit" className="btn btn-primary">
                        Agregar Producto
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
        </section>
        {/* Fin Modal Agregar Productos */}
      </div>
    </MainLayout>
  );
};

export default Productos;
