import { Router } from 'express';

import {
  getCart,
  getCheckout,
  getProducts,
  getOrders,
  getProduct,
  postCart,
} from '../controllers/shop';

const router = Router();

router.route('/').get(getProducts);

router.route('/products/:productId').get(getProduct);

router.route('/cart').get(getCart).post(postCart);

router.route('/checkout').get(getCheckout);

router.route('/orders').get(getOrders);

export default router;
