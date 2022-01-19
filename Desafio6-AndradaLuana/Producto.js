const fs = require('fs');

class Contenedor {

    constructor(url){
        this.url = url

    }

    obtenerContenido() {    

        let contenido = fs.readFileSync(this.url, 'utf-8', (err, resp) =>{
            if(err){
                console.error("Se frenó la ejecución")
            } else {
                return JSON.parse(resp, null, 2)
            }
        })
        return contenido
    }

    obtenerProductoRandom() {
        const listaProductos = JSON.parse(this.obtenerContenido(), null, 2);
        const posicionRandom =  Math.round(Math.random()*listaProductos.length);
        return listaProductos[posicionRandom];
      
    }
}

let prueba = new Contenedor('./productos.txt')

prueba.obtenerProductoRandom();
module.exports = Contenedor;