const { request, response } = require('express');
const express = require('express')
const router = express.Router();

const ofertasController =require('../controllers/ofertas.controllers');
const productosController =require('../controllers/productos.controllers');
const usuariosController =require('../controllers/usuarios.controllers');
const videosController =require('../controllers/videos.controllers');

router.get("/api/v1", (request, response)=>{
    response.send("hola mundo")
});

router

    .get("/api/v1/ofertas", ofertasController.getOfertas)
    .post("/api/v1/ofertas", ofertasController.savetOfertas)
    .put("/api/v1/ofertas/:id", ofertasController.updateOfertas)
    .delete("/api/v1/ofertas/:id", ofertasController.deleteOfertas)

    .get("/api/v1/productos", productosController.getProductos)
    .post("/api/v1/productos", productosController.saveProductos)
    .put("/api/v1/productos/:id", productosController.updateProductos)
    .delete("/api/v1/productos/:id", productosController.deleteProductos)

    .get("/api/v1/usuarios", usuariosController.getUsuarios)
    .post("/api/v1/usuarios", usuariosController.saveUsuarios)
    .put("/api/v1/usuarios/:id", usuariosController.updateUsuarios)
    .delete("/api/v1/usuarios/:id", usuariosController.deleteUsuarios)

    .get("/api/v1/videos", videosController.getVideos)
    .post("/api/v1/videos", videosController.saveVideos)
    .put("/api/v1/videos/:id", videosController.updateVideos)
    .delete("/api/v1/videos/:id", videosController.deleteVideos);



module.exports = router;
