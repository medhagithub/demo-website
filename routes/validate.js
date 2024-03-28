const { check } = require("express-validator")
const usersRepo = require("../repsository/userRepository")
module.exports = {
    requireTitle: check('title')
    .trim()
    .isLength({ min: 1, max: 100 })
    .withMessage('Must be between 1 and 100 characters'),
  requirePrice: check('price')
    .trim()
    .toInt()
    .isInt({ min: 1 })
    .withMessage('Must be a number greater than 1'),
    requireQuantity: check('quantity')
    .trim()
    .toInt({ min : 1}),

    requireEmail: check('email')
    .trim()
    .normalizeEmail()
    .isEmail()
    .withMessage('Must be a valid email')
    .custom(async email => {
      const existingUser = await usersRepo.getOneBy({ email });
      if (existingUser) {
        throw new Error('Email in use');
      }
    }),
  requirePassword: check('password')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Must be between 4 and 20 characters'),
  requirePasswordConfirmation: check('passwordConfirmation')
    .trim()
    .isLength({ min: 4, max: 20 })
    .withMessage('Must be between 4 and 20 characters')
    .custom(async (passwordConfirmation, { req }) => {
      if (passwordConfirmation !== req.body.password) {
        throw new Error('Passwords must match');
      }
    }),
     signInEmail: check("email")
    .trim()
    .isEmail()
    .normalizeEmail()
    .withMessage('Please enter valid email')
    .custom( async email =>{
        const user = await usersRepo.getOneBy({email})
        if(!user){
            throw new Error('Email not found!')
        }
    }),
    signINPassword: check("password").trim()
    .custom( async (password, {req}) =>{
        const user = await usersRepo.getOneBy({email: req.body.email})
        const validPassword = await usersRepo.comparePasswords(user.password,password);
        if(!user){
            throw new Error('Invalid password');
        } 
        if (!validPassword) {
            throw new Error('Invalid password');
          }
        
    })
}