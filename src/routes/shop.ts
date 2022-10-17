import { Router } from 'express';

import {
  getCart,
  getCheckout,
  getProducts,
  getOrders,
  getProduct,
  postCart,
  postCartDeleteProduct,
  postOrder,
} from '../controllers/shop.js';

const router = Router();

router.route('/').get(getProducts);

router.route('/products/:productId').get(getProduct);

router.route('/cart').get(getCart).post(postCart);

router.route('/cart-delete-item').post(postCartDeleteProduct);

router.route('/checkout').get(getCheckout);

router.route('/orders').get(getOrders);

router.route('/create-order').post(postOrder);

export default router;
