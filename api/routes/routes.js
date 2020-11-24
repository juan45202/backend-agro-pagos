const { request, response } = require('express');
const express = require('express')
const router = express.Router();

const ofertasController =require('../controllers/ofertas.controllers');
const productosController =require('../controllers/productos.controllers');
const usuariosController =require('../controllers/usuarios.controllers');
const videosController =require('../controllers/videos.controllers');
const autenticacionController =require('../controllers/autenticacion.controllers');
const otrosController =require('../controllers/otros.controllers');
const ofertaAgriController =require('../controllers/ofertaAgri.controllers');


router.get("/api/v1", (request, response)=>{
    response.send("Api agro-pagos")
});

/**
 * Endpoints
 */

router
    //.get("/api/v1/productos", productosController.getProductoUpdate)

    .get("/api/v1/usuarios/:id", usuariosController.getUsuarios)

    .post("/api/v1/login", autenticacionController.loginUsuario)
    .post("/api/v1/usuarios", usuariosController.saveUsuarios)

    .post("/api/v1/productos", productosController.saveProductos)
    .get("/api/v1/productos/:id", productosController.getProducto)
    .get("/api/v1/productos", productosController.getProductos)
    
    .delete("/api/v1/productos/:id", productosController.deleteProductos)

    .get("/api/v1/otros/:id", otrosController.getOfertaUsuario)

    
    .get("/api/v1/usuarioTransporte", usuariosController.getUsuarioTransporte)


    .get("/api/v1/ofertaAgri/:id", ofertaAgriController.getOfertasAceptadas)
    
    .get("/api/v1/ofertas/:id", ofertasController.getOfertas)
    .post("/api/v1/ofertas", ofertasController.savetOfertas)
    .put("/api/v1/ofertas", ofertasController.updateOfertas)
    .delete("/api/v1/ofertas/:id", ofertasController.deleteOfertas)

    
    
    .put("/api/v1/productos/:id", productosController.updateProductos)
    .delete("/api/v1/productos/:id", productosController.deleteProductos)

    .get("/api/v1/usuarios", usuariosController.getUsuarios)
    
    .put("/api/v1/usuarios/:id", usuariosController.updateUsuarios)
    .delete("/api/v1/usuarios/:id", usuariosController.deleteUsuarios)

    .get("/api/v1/videos", videosController.getVideos)
    .post("/api/v1/videos", videosController.saveVideos)
    .put("/api/v1/videos/:id", videosController.updateVideos)
    .delete("/api/v1/videos/:id", videosController.deleteVideos)


    .use('/', autenticacionController.middleware)
    .get("/api/v1/validacion", autenticacionController.autenToken)

    .use('/', autenticacionController.notFound);

module.exports = router;
