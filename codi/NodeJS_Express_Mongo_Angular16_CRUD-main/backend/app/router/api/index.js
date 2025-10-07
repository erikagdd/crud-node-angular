var router = require('express').Router();
const product_controller = require("../../controllers/products_controller");

router.get('/products', product_controller.getall_products);
router.get('/products/:slug', product_controller.getone_product);
router.post('/products', product_controller.create_product);
router.delete('/products/:slug', product_controller.delete_product);
router.put('/products/:slug', product_controller.update_product);

module.exports = router;
