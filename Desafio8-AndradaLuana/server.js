const express = require('express');
const router  = express.Router();
const morgan = require('morgan')

const app = express();

//MIDD

app.use(morgan('tiny'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use('/api/productos', router);
app.use(express.static('public'));

const arrayProductos = [
    { 
        id: 1,
        titulo: "Lapiz",
        precio: 12,
        foto: "https://lapizdaris.files.wordpress.com/2012/11/lapiz.png"
    },
    { 
        id: 2,
        titulo: "Goma",
        precio: 3.60,
        foto: "https://tse3.mm.bing.net/th?id=OIP.RtExatM7iwM52zdMg69dwQHaFP&pid=Api&P=0&w=219&h=155"
    }
]

///SERVIDOR

const PORT = 7272
const server = app.listen(PORT, () => {
    console.log(
        ` Servidor escuchando en el puerto  ${PORT}`
    );
})
server.on("error", error => console.log(`Se detecto un error: ${error}`));


//RUTAS

router.get('/', (req, res) => {
    res.status(200).json({productos: arrayProductos});  
})

router.get('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    const indiceEnArray = arrayProductos.map(producto => producto.id).indexOf(id);
    if (isNaN(id)) {
        return res.status(200).json( { error: 'El valor ingresado no es un número' } );
    };
    if ( id < 1 || id > arrayProductos.length) {
        return res.status(200).json( { error: 'producto no encontrado'} );
    };
    res.status(200).json({producto: arrayProductos[indiceEnArray]});  
})


router.post('/', (req, res) => {
    const productoNuevo = {
        id: arrayProductos.length + 1,
        titulo: req.body.titulo,
        precio: req.body.precio,
        miniatura: req.body.miniatura
    }
    arrayProductos.push(productoNuevo);
    res.status(200).json({
        msg: "Se agrego exitosamente el producto: " + productoNuevo.titulo,
        productos: arrayProductos
    });
})


router.put('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(200).json( { error: 'Ingrese un ID válido' } );
    };
    if ( id < 1 || id > arrayProductos.length) {
        return res.status(200).json( { error: 'producto no encontrado'} );
    };
    const indiceEnArray = arrayProductos.map(producto => producto.id).indexOf(id);
    arrayProductos[indiceEnArray] = {
        id: id,
        titulo: req.body.titulo,
        precio: req.body.precio,
        miniatura: req.body.miniatura
    };
    res.status(200).json({
        msg: "Se modifico correctamente el producto: " + id,
        productoModificado: arrayProductos[id - 1],
        productos: arrayProductos
    });
})


router.delete('/:id', (req, res) => {
    const id = parseInt(req.params.id);
    if (isNaN(id)) {
        return res.status(200).json( { error: 'Ingrese un id válido' } );
    };
    if ( id < 1 || id > arrayProductos.length) {
        return res.status(200).json( { error: 'producto no encontrado'} );
    };
    const indiceEnArray = arrayProductos.map(producto => producto.id).indexOf(id);
    arrayProductos.splice(indiceEnArray, 1);
    res.status(200).json({
        msg: "Se eliminó el producto: " + id,
        productos: arrayProductos
    });
})