const db = require("../database/conexion");
const productCtls = {};
const fs = require('fs');
const path = require('path');

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
    console.log("Datos recibidos para actualizar el producto:", req.body);

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

productCtls.GetOneProduct = async (req, res) => {
    const id = req.params.id;
    try {
        const [producto] = await db.execute('SELECT * FROM productos WHERE id = ?', [id]);
        if (producto.length === 0) {
            res.status(404).json({ error: 'No existe ningún producto con el ID suministrado' });
        } else {
            res.status(200).send(producto[0]);
        }
    } catch (error) {
        console.log(error);
        res.status(500).send(error);
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
    const productId = req.params.id;

    try {
        // Primero, obtenemos la ruta de la imagen del producto
        const [producto] = await db.execute('SELECT rutaImagen FROM productos WHERE id = ?', [productId]);

        if (producto.length === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        const rutaImagen = producto[0].rutaImagen;

        // Intentar eliminar el archivo de imagen del sistema de archivos
        const imagePath = path.join(__dirname, '..', rutaImagen);
        fs.unlink(imagePath, (err) => {
            if (err) {
                console.error('Error al eliminar la imagen:', err);
                // Aquí puedes decidir si quieres enviar una respuesta con error o continuar con la eliminación del producto.
            }
        });

        // Ahora eliminamos el registro del producto de la base de datos
        const [result] = await db.execute('DELETE FROM productos WHERE id = ?', [productId]);

        if (result.affectedRows === 0) {
            return res.status(404).json({ error: 'Producto no encontrado' });
        }

        res.status(200).json({ message: 'Producto e imagen eliminados con éxito' });
    } catch (error) {
        console.error('Error al eliminar el producto:', error);
        res.status(500).json({ error: 'Error al eliminar el producto' });
    }
};
module.exports = productCtls;
