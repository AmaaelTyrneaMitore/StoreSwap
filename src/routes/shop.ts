import { Router } from 'express';

import {
  getCart,
  getCheckout,
  getProducts,
  getOrders,
} from '../controllers/shop';

const router = Router();

router.route('/').get(getProducts);

router.route('/cart').get(getCart);

router.route('/checkout').get(getCheckout);

router.route('/orders').get(getOrders);

export default router;
