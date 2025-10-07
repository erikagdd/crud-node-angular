const mongoose = require('mongoose');
const Product = mongoose.model('Product');

async function getall_products(req, res) {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }//end trycath
}//getall_products

async function getone_product(req, res) {
    try {
        const slug = req.params.slug
        const product = await Product.findOne({ slug: slug });
        if (!product) {
            res.status(404).json(FormatError("Product not found", res.statusCode));
        } else {
            res.json(product);
        };
    } catch (error) {
        if (error.kind === 'ObjectId') { res.status(404).json(FormatError("Product not found", res.statusCode)); }
        else { res.status(500).json(FormatError("An error has ocurred", res.statusCode)); }
    }
};//getone_product

async function create_product(req, res) {
    try {
        
        const product_data = {
            name: req.body.name || null,
            price: req.body.price || 0,
            description: req.body.description || null
        };
        const product = new Product(product_data);
        const new_product = await product.save();
        res.json(new_product);
    } catch (error) {
        res.status(500).json(FormatError("An error has ocurred", res.statusCode));
    }//end try cath
}//create_product

async function delete_product(req, res) {
    try {
        const slug = req.params.slug
        const product = await Product.findOneAndDelete({ slug: slug });
        if(product) {
            res.json(product)
        }
    } catch (error) {
        if (error.kind === 'ObjectId') { res.status(404).json(FormatError("Product not found", res.statusCode)); }
        else { res.status(500).json(FormatError("An error has ocurred", res.statusCode)); }
    }//end try catch
}//delete_product

async function update_product(req, res) {
    try {
        const slug = req.params.slug
        const old_product = await Product.findOne({ slug: slug });

        if (old_product.name !== req.body.name && req.body.name !== undefined) {
            old_product.slug = null;
        }//end if
        old_product.name = req.body.name || old_product.name;
        old_product.price = req.body.price || old_product.price;
        old_product.description = req.body.description || old_product.description;
        const update = await old_product.save();

        if (!update) { res.status(404).json(FormatError("Product not found", res.statusCode)); } else {
            res.json({ msg: "Product updated" })
        }
    } catch (error) {
        if (error.kind === 'ObjectId') { res.status(404).json(FormatError("Product not found", res.statusCode)); }
        else { res.status(500).json(FormatError("An error has ocurred", res.statusCode)); }
    }
}//update_product

const product_controller = {
    getall_products: getall_products,
    getone_product: getone_product,
    create_product: create_product,
    delete_product: delete_product,
    update_product: update_product
}

module.exports = product_controller