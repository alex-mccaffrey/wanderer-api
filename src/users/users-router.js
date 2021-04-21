const express = require("express");
const path = require("path");
const xss = require("xss");
const UsersService = require("./users-service");
const usersRouter = express.Router();
const jsonParser = express.json();

const serializeUser = (user) => ({
  id: user.id,
  username: xss(user.username),
  datecreated: user.datecreated,
});


usersRouter
  .route("/")
  .all((req, res, next) => {
    knexInstance = req.app.get("db");
    next()
  })

  .post(jsonParser, (req, res) => {
      const {password} = req.body
      const REGEX_UPPER_LOWER_NUMBER_SPECIAL = /(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#\$%\^&])[\S]+/;

      for (const field of ['username', 'password']){
          if(!req.body[field]){
              return res.status(400).json({
                  error: `Missing ${field}`
              })
          }
      }

      if(password.length<8){
        return res.status(400).json({
            error: `Password must be 8 or more characters`
      })
    }

    if(!REGEX_UPPER_LOWER_NUMBER_SPECIAL.test(password)) {
        return res.status(400).json({
            error: `Password must contain one upper case character, one lower case character, one number, and one special character`
        })
    }
    
    res.send("ok")
  });

module.exports = usersRouter;
