const jwt = require("jsonwebtoken");
const JWT_SECRET = process.env.JWT_SECRET;
const getProperties = require("../utils/handlePropertiesEngine")
const propertiesKey = getProperties()
/**
 * Pasamos el objecto del usario
 * @param {*} user
 */
const tokenSign = async (data) => {
  console.log(JSON.stringify(data))
  const sign = jwt.sign(
    {
      id: data.userID,
      rol: data.rol,
    },
    JWT_SECRET,
    {
      expiresIn: "2h", 
    }
  );
// return {}
  return sign
};

/**
 * Pasamos el token de session, el JWT
 * @param {*} tokenJwt 
 * @returns 
 */
const verifyToken = async (tokenJwt) => {
    try{
        return jwt.verify(tokenJwt, JWT_SECRET)
    }catch(e){
        return null
    }
};

module.exports = { tokenSign, verifyToken };
