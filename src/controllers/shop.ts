import { RequestHandler } from 'express';

import Product from '../models/product';
import Cart from '../models/cart';

export const getProducts: RequestHandler = async (_req, res, _next) => {
  const products = await Product.fetchAll();
  res.render('shop/product-list', {
    pageTitle: 'StoreSwap ― A shop for all your needs',
    path: '/',
    products,
  });
};

export const getProduct: RequestHandler<{ productId: string }> = async (
  req,
  res,
  _next
) => {
  const productId = req.params.productId;
  const product = await Product.find(productId);
  res.render('shop/product-detail', {
    pageTitle: product?.title,
    path: '/products',
    product,
  });
};

export const getCart: RequestHandler = (_req, res, _next) => {
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'My Cart',
  });
};

export const postCart: RequestHandler<unknown, unknown, Product> = async (
  req,
  res,
  _next
) => {
  const { id: productId } = req.body;
  const product = await Product.find(productId);
  if (product) {
    Cart.addProduct(productId, product.price);
  }
  res.redirect('/cart');
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
