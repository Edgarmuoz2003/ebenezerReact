const db = require("../database/conexion");
const productCtls = {}

productCtls.SaveProduct = async (req, res) => {
    const rutaImagen = req.file.path;
    const { productTitle, productDescription, productPrice, category, subCategory, sizes, isPromotion, isFeatured } = req.body;

    // Convertir el array de tallas en un JSON string
    const sizesJson = JSON.stringify(sizes);

    try {
        await db.execute(
            'INSERT INTO productos (rutaImagen, productTitle, productDescription, productPrice, category, subCategory, sizes, isPromotion, isFeatured) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [rutaImagen, productTitle, productDescription, productPrice, category, subCategory, sizesJson, isPromotion ? 1 : 0, isFeatured ? 1 : 0]
        );
        res.status(201).json({ message: 'Ok' });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ error: 'Error al crear el producto' });
    
    }
}

module.exports = productCtls;