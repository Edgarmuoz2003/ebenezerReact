const ProductModal = ({
    handleAddProducts,
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
  }) => {
    return (
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
                        <img
                          src={preview}
                          alt="Preview"
                          style={{ maxHeight: "300px" }}
                        />
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
                      <label
                        htmlFor="productDescription"
                        className="form-label"
                      >
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
                      <label className="form-label">
                        Publicar como producto en Promoción?
                      </label>
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
                        <label
                          className="form-check-label"
                          htmlFor="isPromotionYes"
                        >
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
                        <label
                          className="form-check-label"
                          htmlFor="isPromotionNo"
                        >
                          No
                        </label>
                      </div>
                    </div>

                    <div className="mb-3">
                      <label className="form-label">
                        Publicar como producto Destacado?
                      </label>
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
                        <label
                          className="form-check-label"
                          htmlFor="isFeaturedYes"
                        >
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
                        <label
                          className="form-check-label"
                          htmlFor="isFeaturedNo"
                        >
                          No
                        </label>
                      </div>
                    </div>

                    <div className="modal-footer">
                      {error && (
                        <div className="alert alert-danger">{error}</div>
                      )}
                      <button type="submit" className="btn btn-primary">
                        Agregar Producto
                      </button>
                    </div>
                  </form>
                </div>
              </div>
            </div>
          </div>
    )
  }

  export default ProductModal;