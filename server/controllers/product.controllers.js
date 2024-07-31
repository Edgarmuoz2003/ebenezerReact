const db = require("../database/conexion");
const productCtls = {}

productCtls.SaveProduct = async (req, res) => {
    const rutaImagen = req.file.path;
    const { productTitle, productDescription, productPrice, category, subCategory, sizes, isPromotion, isFeatured } = req.body;

    // Convertir el array de tallas en un JSON string
    const sizesJson = JSON.stringify(sizes);

    const isPromotionBool = isPromotion === 'true';
    const isFeaturedBool = isFeatured === 'true';
    

    try {
        await db.execute(
            'INSERT INTO productos (rutaImagen, productTitle, productDescription, productPrice, category, subCategory, sizes, isPromotion, isFeatured) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)', 
            [rutaImagen, productTitle, productDescription, productPrice, category, subCategory, sizesJson, isPromotionBool, isFeaturedBool ]
        );
        res.status(201).json({ message: 'Ok' });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ error: 'Error al crear el producto' });
    
    }
}

productCtls.GetProducts = async (req, res) => {
    try {
        const [productos] = await db.execute('SELECT * FROM productos')
        res.send(productos)
    } catch (error) {
        res.status(500).json({error: "No se obtuvieron datos " + error})
    }
}

module.exports = productCtls;
