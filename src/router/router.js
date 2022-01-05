const express = require('express');

const registerProductsUserLogged = require('../controllers/products/registerProductsUserLogged');
const detailProductsUserLogged = require('../controllers/products/detailProductsUserLogged');
const productLoggedInUser = require('../controllers/products/productLoggedInUser');
const deleteProductUserLogged = require('../controllers/products/deleteProductUserLogged');
const UpdateProductUserLogged= require('../controllers/products/UpdateProductUserLogged');

const registerUser = require('../controllers/users/registerUser');
const login = require('../controllers/users/login');
const detailUser = require('../controllers/users/detailUser');
const updateUser = require('../controllers/users/updateUser');

const verifyLogin = require('../middleware/verifyLogin');

const router = express();

router.post("/usuario", registerUser);
router.post("/login", login);

router.use(verifyLogin);

router.get("/usuario", detailUser);
router.put("/usuario", updateUser);

router.get("/produtos", productLoggedInUser);
router.get("/produtos/:id", detailProductsUserLogged);
router.post("/produtos", registerProductsUserLogged);
router.put("/produtos/:id", UpdateProductUserLogged);
router.delete("/produtos/:id", deleteProductUserLogged);

module.exports = router;