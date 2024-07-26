const db = require("../database/conexion");
const bcrypt = require('bcrypt');

const authCtls = {};

authCtls.createUser = async (req, res) =>{
    const { nombre, email, contrasenia } = req.body

    try {
        const hashedContrasenia = await bcrypt.hash(contrasenia, 10)

        await db.execute('INSERT INTO usuarios (nombre, email, contrasenia) VALUES (?, ?, ?)', [nombre, email, hashedContrasenia])
        res.status(201).json({ message: 'Usuario creado exitosamente' });
    } catch (error) {
        console.error('Error al crear el usuario:', error);
        res.status(500).json({ message: 'Error al crear el usuario' });
    }

    

}
authCtls.login = async (req, res) => {
    const { email, contrasenia } = req.body

    if (!email || !contrasenia) {
        return res.status(400).json({ error: 'Se requiere email y contraseña' });
    }

    try {
        const [response] = await db.execute('SELECT * FROM usuarios WHERE email = ?', [email]);

        if(response.length === 0){
            return res.status(401).json({error: "no hay ningun usuario con esos datos, verifique e intente nuevamente"})
        }

        const usuario = response[0]

        bcrypt.compare(contrasenia, usuario.contrasenia, (err, isMatch) => {
            if(err){
                return res.status(500).json({ error: "Ocurrio un error al intentar comparar las contraseñas" })
            }
            
            if(!isMatch){
                return res.status(401).json({ error: "Contraseña Incorrecta" })
            } else {
                const exitoso = true;
                const nombre = usuario.nombre;

                res.status(200).send({ exitoso, nombre })
            }
        })
    } catch (error) {
        console.log("Error en el consulta SQL ", error)
    }

    
}


module.exports = authCtls;