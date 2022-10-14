import { RequestHandler } from 'express';

import Product from '../models/product.js';

export const getAddProduct: RequestHandler = (_req, res, _next) => {
  res.render('admin/edit-product', {
    pageTitle: 'Add Product ― StoreSwap',
    path: '/admin/add-product',
    editing: false,
  });
};

export const postAddProduct: RequestHandler<
  unknown,
  unknown,
  Omit<Product, 'id' | 'save'>
> = async (req, res, _next) => {
  const { title, price, description } = req.body;
  try {
    await new Product(title, description, Number(price)).save();
    res.redirect('/');
  } catch (err) {
    console.log(err);
  }
};

// export const getEditProduct: RequestHandler<
//   { productId: string },
//   unknown,
//   unknown,
//   { [key: string]: string | unknown }
// > = async (req, res, _next) => {
//   if (req.query.edit !== 'true' && req.query.edit !== 'false') {
//     return res.redirect('/');
//   }

//   const editMode = req.query.edit === 'true';

//   const { productId } = req.params;
//   const product = await Product.find(productId);

//   if (!product) {
//     return res.redirect('/');
//   }

//   res.render('admin/edit-product', {
//     pageTitle: 'Edit Product - StoreSwap',
//     path: '/admin/edit-product',
//     editing: editMode,
//     product,
//   });
// };

// export const postEditProduct: RequestHandler<
//   unknown,
//   unknown,
//   Omit<Product, 'save'>
// > = async (req, res, _next) => {
//   // fetch information for the product
//   const {
//     id: productId,
//     title: updatedTitle,
//     price: updatedPrice,
//     description: updatedDescription,
//   } = req.body;
//   // create a new product instance and populate it with that info and then call save on it
//   new Product(updatedTitle, updatedDescription, updatedPrice, productId).save();
//   res.redirect('/admin/products');
// };

// export const postDeleteProduct: RequestHandler<
//   unknown,
//   unknown,
//   { id: string }
// > = async (req, res, _next) => {
//   const { id: productId } = req.body;
//   await Product.delete(productId);
//   res.redirect('/admin/products');
// };

// export const getProducts: RequestHandler = async (_req, res, _next) => {
//   const products = await Product.fetchAll();
//   res.render('admin/product-list', {
//     pageTitle: 'Manage Products',
//     path: '/admin/products',
//     products,
//   });
// };
