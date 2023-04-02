const express = require("express");
const fs = require("fs")
const router = express.Router();

const PATH_ROUTES = __dirname;

const removeExtension = (fileName) => {
    //TODO tracks.js [tracks, js]
    return fileName.split('.').shift() // con split separamos el string donde encuentre un punto
}                                      // y con shift nos quedamos solamente con el primer elemento, en este caso con el nombre del archivo sin la extensión 

fs.readdirSync(PATH_ROUTES).filter((file) => {
    const name = removeExtension(file)//TODO users, storage, tracks
    if(name !== 'index'){
        console.log(`Cargando ruta ${name}`)
        router.use(`/${name}`,require(`./${file}`)) //TODO http://localhost:3000/api/tracks
    }
})

module.exports = router