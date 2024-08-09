const ModalEditar = ({
  handleUpdateProduct,
  handleLoadImage,
  handleSizeChange,
  setProductTitle,
  setProductDescription,
  setProductPrice,
  setCategory,
  setSubCategory,
  setIsPromotion,
  setIsFeatured,
  sizes,
  productTitle,
  productDescription,
  productPrice,
  category,
  subCategory,
  isPromotion,
  isFeatured,
  preview,
  error,
  subCategories,
  loadImage,
}) => {
  return (
    <div
      className="modal fade"
      id="ModalEditar"
      tabIndex="-1"
      aria-labelledby="ModalEditarLabel"
      aria-hidden="true"
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <div className="modal-header">
            <h1 className="modal-title fs-5" id="ModalEditarLabel">
              Editar un Producto
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
            <form onSubmit={handleUpdateProduct}>
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
                />
              </div>
              {preview && (
              <div>
                  <img src={preview} alt="Imagen del producto" style={{ width: "100px", height: "auto" }} />
                  <p>Imagen actual: {loadImage ? loadImage.name : "No hay nueva imagen seleccionada"}</p>
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

              {category === "pijamas" && (
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
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="isPromotion"
                    id="isPromotionYes"
                    checked={isPromotion}
                    onChange={() => setIsPromotion(true)}
                  />
                  <label className="form-check-label" htmlFor="isPromotionYes">
                    Promoción
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="isPromotion"
                    id="isPromotionNo"
                    checked={!isPromotion}
                    onChange={() => setIsPromotion(false)}
                  />
                  <label className="form-check-label" htmlFor="isPromotionNo">
                    No Promoción
                  </label>
                </div>
              </div>

              <div className="mb-3">
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="isFeatured"
                    id="isFeaturedYes"
                    checked={isFeatured}
                    onChange={() => setIsFeatured(true)}
                  />
                  <label className="form-check-label" htmlFor="isFeaturedYes">
                    Producto Destacado
                  </label>
                </div>
                <div className="form-check">
                  <input
                    className="form-check-input"
                    type="radio"
                    name="isFeatured"
                    id="isFeaturedNo"
                    checked={!isFeatured}
                    onChange={() => setIsFeatured(false)}
                  />
                  <label className="form-check-label" htmlFor="isFeaturedNo">
                    No Destacado
                  </label>
                </div>
              </div>

              <div className="modal-footer">
                {error && <div className="alert alert-danger">{error}</div>}
                <button
                  type="button"
                  className="btn btn-secondary"
                  data-bs-dismiss="modal"
                >
                  Cancelar
                </button>
                <button type="submit" className="btn btn-primary">
                  Guardar Cambios
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModalEditar;
