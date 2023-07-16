const { matchedData } = require("express-validator");
const { encrypt, compare } = require("../utils/handlePassword");
const { tokenSign } = require("../utils/handleJwt");
const { handleHttpError } = require("../utils/handleError");
const { usersModel } = require("../models");
const bcryptjs = require("bcryptjs");

/**
 * Este controlador es el encargado de registrar un usuario
 * @param {*} req 
 * @param {*} res 
 */
const registerCtrl = async (req, res) => {
  try {
    console.log(req.body);
    req_ = matchedData(req);
    const password = await encrypt(req_.passwd);
    const body = { ...req_, passwd: password, rol: 'user' };
    console.log(body)
    const dataUser = await usersModel.create(body)
    dataUser.set("passwd", undefined, { strict: false });

    const data = {
      token: await tokenSign(dataUser),
      user: dataUser,
    };

    console.log(data);

    res.status(201)
    res.send({data});  
  } catch (e) {  
    console.log(e)
    handleHttpError(res, "ERROR_REGISTER_USER")
  }
};

/**
 * Este controlador es el encargado de logear a una persona
 * @param {*} req 
 * @param {*} res 
 */
const loginCtrl = async (req, res) => {
  try {  
    req = matchedData(req);
    const user = await usersModel.findOne({ where: { correo: req.correo } });
    const passwd = req.passwd;

    if (!user) {
      handleHttpError(res, "USER_NOT_EXISTS", 404);
      return
    }

    const hashPassword = user.get('passwd');

    const check = await compare(passwd, hashPassword);
    //const check = await bcrypt.compare(passwd, hashPassword);

    if (!check) {
      handleHttpError(res, "PASSWORD_INVALID", 401);
      return
    }

    user.set('passwd', undefined, { strict: false })
    const data = {
      token: await tokenSign(user), 
      user
    }

    console.log(data)

    res.send({ data })
    


  } catch (e) {
      console.log(e)
      handleHttpError(res, "ERROR_LOGIN_USER")
  }
}

module.exports = { registerCtrl, loginCtrl }; 
