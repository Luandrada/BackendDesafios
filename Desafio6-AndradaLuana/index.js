const express = require('express');
const app = express();

const Contenedor = require('./Producto');
const objContenedor = new Contenedor('./productos.txt');

app.get('/productos', async (req, res) => {
    let listaProductos = objContenedor.obtenerContenido();
    res.send( await listaProductos);
})

app.get('/productoRandom', async (req, res) => {
    res.send( await objContenedor.obtenerProductoRandom());
})

const conectedServer = app.listen(8080 , () => {
    console.log('Servidor escuchando en el puerto 8080');
})

conectedServer.on('error', error => {console.log("ocurrió un error inesperado")});