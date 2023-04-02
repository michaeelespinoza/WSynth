const bcryptjs = require("bcryptjs");

/**
 * Contraseña sin encriptar: hola.01
 * @param {*} passwordPlain 
 */
const encrypt = async (passwordPlain) => {
    // Declaramos un 'hash' que vendria a ser la version
    // encriptada de un String, en este caso el password del User
    const hash = await bcryptjs.hash(passwordPlain, 10) // Al metodo hash() le pasamos la contraseña y el salt que vendria a ser el grado de aleatoriedad de encriptacion
    return hash
};

/**
 * Pasar contraseña sin encriptar y pasar contraseña encriptada
 * @param {*} passwordPlain 
 * @param {*} hashPassword 
 */
const compare = async (passwordPlain, hashPassword) => {
    return await bcryptjs.compare(passwordPlain, hashPassword)
};

module.exports = { encrypt, compare };
