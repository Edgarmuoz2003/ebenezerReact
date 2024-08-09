const db = require("../database/conexion");
const productCtls = {};

productCtls.SaveProduct = async (req, res) => {
    const rutaImagen = req.file.path;
    const { productTitle, productDescription, productPrice, category, subCategory, sizes, isPromotion, isFeatured } = req.body;

    // Asegurarse de que sizes sea un array
    let sizesArray;
    try {
        sizesArray = JSON.parse(sizes);
    } catch (error) {
        return res.status(400).json({ error: 'El formato de tallas es incorrecto' });
    }

    // Convertir el array de tallas en un JSON string
    const sizesJson = JSON.stringify(sizesArray);

    const isPromotionBool = isPromotion === 'true';
    const isFeaturedBool = isFeatured === 'true';

    try {
        await db.execute(
            'INSERT INTO productos (rutaImagen, productTitle, productDescription, productPrice, category, subCategory, sizes, isPromotion, isFeatured) VALUES(?, ?, ?, ?, ?, ?, ?, ?, ?)',
            [rutaImagen, productTitle, productDescription, productPrice, category, subCategory, sizesJson, isPromotionBool, isFeaturedBool]
        );
        res.status(201).json({ message: 'Ok' });
    } catch (error) {
        console.error('Error al crear el producto:', error);
        res.status(500).json({ error: 'Error al crear el producto' });
    }
};

productCtls.UpdateProduct = async (req, res) => {
    const productId = req.params.id; // Asume que el ID del producto se pasa como parámetro en la URL
    const rutaImagen = req.file ? req.file.path : null; // Si hay una nueva imagen, se actualizará
    const { productTitle, productDescription, productPrice, category, subCategory, sizes, isPromotion, isFeatured } = req.body;

    // Asegurarse de que sizes sea un array
    let sizesArray;
    try {
        sizesArray = JSON.parse(sizes);
    } catch (error) {
        return res.status(400).json({ error: 'El formato de tallas es incorrecto' });
    }

    // Convertir el array de tallas en un JSON string
    const sizesJson = JSON.stringify(sizesArray);

    const isPromotionBool = isPromotion === 'true';
    const isFeaturedBool = isFeatured === 'true';

    try {
        // Actualizar la base de datos
        const query = `
            UPDATE productos 
            SET 
                productTitle = ?, 
                productDescription = ?, 
                productPrice = ?, 
                category = ?, 
                subCategory = ?, 
                sizes = ?, 
                isPromotion = ?, 
                isFeatured = ?
                ${rutaImagen ? ', rutaImagen = ?' : ''} 
            WHERE id = ?
        `;

        const values = [
            productTitle, 
            productDescription, 
            productPrice, 
            category, 
            subCategory, 
            sizesJson, 
            isPromotionBool, 
            isFeaturedBool
        ];

        if (rutaImagen) {
            values.push(rutaImagen);
        }
        
        values.push(productId);

        await db.execute(query, values);
        res.status(200).json({ message: 'Producto actualizado con éxito' });
    } catch (error) {
        console.error('Error al actualizar el producto:', error);
        res.status(500).json({ error: 'Error al actualizar el producto' });
    }
};


productCtls.GetProducts = async (req, res) => {
    try {
        const [productos] = await db.execute('SELECT * FROM productos');
        const productosConRutas = productos.map(producto => ({
            ...producto,
            rutaImagen: `http://localhost:4000/${producto.rutaImagen.replace(/\\/g, '/')}`, // Asegúrate de que sea accesible
            sizes: JSON.parse(producto.sizes) // Convertir el JSON string de tallas de vuelta a un array
        }));
        res.send(productosConRutas);
    } catch (error) {
        console.error('Error al obtener los productos:', error);
        res.status(500).json({ error: 'No se obtuvieron datos ' + error });
    }
};

productCtls.DeleteProduct = async (req, res) => {
    const productId = req.params.id; // Asume que el ID del producto se pasa como parámetro en la URL

    try {
        const result = await db.execute('DELETE FROM productos WHERE id = ?', [productId]);

        // Verificar si se eliminó algún producto
        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto eliminado con éxito' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};

module.exports = productCtls;
