const express = require('express');
const { validationResult } = require('express-validator');
const multer = require('multer');

const productsRepo = require('../repsository/ProductsRepository');
const productsNewTemplate = require('../views/newproduct/new');
const productDispaly= require("../views/newproduct/indexProduct")
const editTemplate = require("../views/newproduct/editPage")
const { requireTitle, requirePrice ,requireQuantity } = require('./validate');

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

router.get('/admin/products',
     async (req, res) => {
        if(!req.session.userId){
            return res.redirect('/signin')
        }
     const product = await productsRepo.getAll()
     res.send(productDispaly({product}))
});

router.get('/admin/products/new', (req, res) => {
    if(!req.session.userId){
        return res.redirect('/signin')
    }
  res.send(productsNewTemplate({}));
});

router.post(
  '/admin/products/new',
  upload.single('image'),
  [requireTitle, requirePrice , requireQuantity],
  async (req, res) => {
    if(!req.session.userId){
        return res.redirect('/signin')
    }
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.send(productsNewTemplate({ errors }));
    }
    const image = req.file.buffer.toString('base64');
    const { title, price , quantity } = req.body;
    await productsRepo.create({ title, price, image , quantity });

    res.redirect('/admin/products');
  }
);


router.get('/admin/products/:id/edit', 
   async(req, res)=>{
    if(!req.session.userId){
        return res.redirect('/signin')
    }
  
    const product = await productsRepo.getOne(req.params.id);
    if(!product){
        return res.send("Product not found")
    }
    return res.send(editTemplate({product}))
})
router.post('/admin/products/:id/edit', 
    upload.single('image'),
    [requireTitle, requirePrice],
   async(req, res , dataCallback)=>{
    if(!req.session.userId){
        return res.redirect('/signin')
    }
    const errors = validationResult(req);
    const product = await productsRepo.getOne(req.params.id);
    if (!errors.isEmpty()) {
        let data ={}
        if(dataCallback){
            data = await dataCallback(req)
        }
      return res.send(productsNewTemplate({ errors , ...data }));
    }
    const change = req.body;
     if(req.file){
        change.image = req.file.buffer.toString("base64");

     }
     try{
     await productsRepo.update(req.params.id, change)
     }catch(err){
       return res.send("could not find the object")
     }
     res.redirect('/admin/products');
     return {product}
    
    })
    router.post('/admin/products/:id/delete',
     async (req, res) => {
      if(!req.session.userId){
        return res.redirect('/signin')
    }
      await productsRepo.delete(req.params.id);
    
      res.redirect('/admin/products');
    });
    
module.exports = router;