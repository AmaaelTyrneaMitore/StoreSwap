import { RequestHandler } from 'express';

import Product from '../models/product';

export const getAddProduct: RequestHandler = (_req, res, _next) => {
  res.render('admin/add-product', {
    pageTitle: 'Add Product ― Store Swap',
    path: '/admin/add-product',
  });
};

export const postAddProduct: RequestHandler<unknown, unknown, Product> = (
  req,
  res,
  _next
) => {
  const { title, price, description } = req.body;
  new Product(title, description, price).save();
  res.redirect('/');
};

export const getProducts: RequestHandler = async (_req, res, _next) => {
  const products = await Product.fetchAll();
  res.render('admin/product-list', {
    pageTitle: 'Manage Products',
    path: '/admin/products',
    products,
  });
};
