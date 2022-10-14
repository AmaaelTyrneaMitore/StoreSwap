import { RequestHandler } from 'express';

import Product from '../models/product.js';
// import Cart from '../models/cart.js';

export const getProducts: RequestHandler = async (_req, res, _next) => {
  const products = (await Product.fetchAll()) as Product[];
  res.render('shop/product-list', {
    pageTitle: 'StoreSwap ― A shop for all your needs',
    path: '/',
    products,
  });
};

// export const getProduct: RequestHandler<{ productId: string }> = async (
//   req,
//   res,
//   _next
// ) => {
//   const productId = req.params.productId;
//   const product = await Product.find(productId);
//   res.render('shop/product-detail', {
//     pageTitle: product?.title,
//     path: '/products',
//     product,
//   });
// };

// export const getCart: RequestHandler = async (_req, res, _next) => {
//   const cart = await Cart.getCart();
//   const products = await Product.fetchAll();
//   const cartProducts = [];

//   for (const product of products) {
//     // check if the given product is stored in the cart
//     const cartProductData = cart?.products.find(
//       (prod) => prod.id === product.id
//     );

//     if (cartProductData) {
//       // if it is then, simply add the product and it's quantity (from Cart) as an object
//       // to the cartProduct array so that we can pass it to the view that we wanna render
//       cartProducts.push({
//         productData: product, // products stored in Products.json file, don't have quantity
//         quantity: cartProductData.quantity, // we get quantiry from the cart
//       });
//     }
//   }

//   res.render('shop/cart', {
//     path: '/cart',
//     pageTitle: 'My Cart',
//     products: cartProducts,
//   });
// };

// export const postCart: RequestHandler<
//   unknown,
//   unknown,
//   { id: string }
// > = async (req, res, _next) => {
//   const { id: productId } = req.body;
//   const product = await Product.find(productId as string);
//   if (product) {
//     Cart.addProduct(productId as string, product.price);
//   }
//   res.redirect('/cart');
// };

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
