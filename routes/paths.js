const express = require("express")
const { check, validationResult} = require('express-validator')
const usersRepo = require("../repsository/userRepository")
const route = express.Router()
const signUpPage =require("../views/signup")
const signInPage =require("../views/signin")
const {requireEmail,
     requirePassword, 
     requirePasswordConfirmation,
     signInEmail,
      signINPassword}= require("./validate")

route.get('/signup', (req, res) =>{
    res.send(signUpPage({req}))
});
// const bodyfrme is a middleware, ab ye tu globally use nhi kr sakta...
// toh iske liye ek lib use krte h ye readymade ho jate hai...
// const bodyFrame = (req, res ,next)=>{
//     if(req.method ==="POST"){
//         req.on('data',(data)=>{
//             const parse =data.toString('utf8').split('&')
//             const formData ={};
//             for( let pair of parse){
//                 const [key, value] = pair.split('=');
//                 formData [key]= value;
//                 req.body = formData;
//                 next();
//             }
//         })  
//     } else{
//         next();
//     }
// }


//sign up
route.get('/signup', (req, res) => {
    res.send(signupTemplate({ req }));
  });
  
  route.post(
    '/signup',
    [requireEmail, requirePassword, requirePasswordConfirmation],
    async (req, res) => {
        const errors = validationResult(req)
       console.log(errors)
if(!errors.isEmpty()){
   return res.send(signUpPage({ req, errors}))
}
      const { email, password } = req.body;
      const user = await usersRepo.create({ email, password });
  
      req.session.userId = user.id;
  
      res.redirect('/admin/products');
    }
  );
  

route.get('/signout', (req,res)=>{
    req.session = null;
    res.send("You have been logged out")
})
route.get("/signin", (req,res)=>{
    res.send(signInPage({req}))
})


route.post("/signin", [
    signInEmail,
    signINPassword
],
async (req, res) => {
    const error = validationResult(req)
    console.log(error)
    const { email, password } = req.body;
  
    const user = await usersRepo.getOneBy({ email });
  
    if (!user) {
      return res.send('Email not found');
    }
  

    req.session.userId = user.id;
  
    res.redirect('/admin/products')

  });
// route.post('/signin', async (req, res) => {
//     const { email, password } = req.body;
  
//     const user = await usersRepo.getOneBy({ email });
  
//     if (!user) {
//       return res.send('Email not found');
//     }
  
//     const validPassword = await usersRepo.compare(
//       user.password,
//       password
//     );
//     if (!validPassword) {
//       return res.send('Invalid password');
//     }
  
//     req.session.userId = user.id;
  
//     res.send('You are signed in!!!');
//   });
  
  module.exports = route