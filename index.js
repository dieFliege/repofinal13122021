const express = require('express');
const app = express();

require('./arranque/rutas')(app);
require('./arranque/bd')();

const puerto = process.env.PORT || 3000;
app.listen(puerto, () => console.log(`Escuchando en el puerto ${puerto}...`));