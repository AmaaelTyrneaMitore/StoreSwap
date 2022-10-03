import { RequestHandler } from 'express';

import Product from '../models/product';

export const getProducts: RequestHandler = async (_req, res, _next) => {
  const products = await Product.fetchAll();
  res.render('shop/product-list', {
    pageTitle: 'StoreSwap ― A shop for all your needs',
    path: '/',
    products,
  });
};

export const getCart: RequestHandler = (_req, res, _next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'My Cart',
  });
};

export const getCheckout: RequestHandler = (_req, res, _next) => {
  res.render('shop/checkout', {
    path: '/checkout',
    pageTitle: 'Checkout',
  });
};

export const getOrders: RequestHandler = (_req, res, _next) => {
  res.render('shop/orders', {
    path: '/orders',
    pageTitle: 'My Orders',
  });
};
