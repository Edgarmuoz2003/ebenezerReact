const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
require('dotenv').config();

console.log(process.env.MESSAGE);

const App = express();

//configuraciones
App.set('port', process.env.PORT || 5000);

//midlewares
App.use(morgan('dev'))
App.use(cors({
    origin: "localhost:3000"
}))
App.use(express.json())
App.use('/api', require('./routes/auth.routes'))



//puerto de Escucha
App.listen(App.get('port'), () =>{
    console.log('Servidor corriendo en el puerto ', App.get('port'))
})