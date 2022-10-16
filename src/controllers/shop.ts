import { RequestHandler } from 'express';
import { ObjectId } from 'mongodb';

import Product from '../models/product.js';

export const getProducts: RequestHandler = async (_req, res, _next) => {
  try {
    const products = await Product.fetchAll();
    res.render('shop/product-list', {
      pageTitle: 'StoreSwap ― A shop for all your needs',
      path: '/',
      products,
    });
  } catch (err) {
    console.log(err);
  }
};

export const getProduct: RequestHandler<{ productId: string }> = async (
  req,
  res,
  _next
) => {
  try {
    const productId = new ObjectId(req.params.productId);
    const product = await Product.findById(productId);
    if (product) {
      return res.render('shop/product-detail', {
        pageTitle: product.title,
        path: '/products',
        product,
      });
    }
    return res.redirect('/');
  } catch (err) {
    console.log(err);
  }
};

export const getCart: RequestHandler = async (req, res, _next) => {
  const products = await req.user.getCart();
  res.render('shop/cart', {
    path: '/cart',
    pageTitle: 'My Cart',
    products: products,
  });
};

export const postCart: RequestHandler<
  unknown,
  unknown,
  { _id: string }
> = async (req, res, _next) => {
  const { _id } = req.body;
  // fetch the product that I want to add
  const product = await Product.findById(new ObjectId(_id));
  if (product) {
    req.user.addToCart(product);
  }
  res.redirect('/cart');
};

// export const postCartDelete: RequestHandler<
//   unknown,
//   unknown,
//   { id: string }
// > = async (req, res, _next) => {
//   const { id: productId } = req.body;
//   const product = await Product.find(productId);
//   if (product) await Cart.deleteProduct(productId, product.price);
//   res.redirect('/cart');
// };

// export const getCheckout: RequestHandler = (_req, res, _next) => {
//   res.render('shop/checkout', {
//     path: '/checkout',
//     pageTitle: 'Checkout',
//   });
// };

// export const getOrders: RequestHandler = (_req, res, _next) => {
//   res.render('shop/orders', {
//     path: '/orders',
//     pageTitle: 'My Orders',
//   });
// };
