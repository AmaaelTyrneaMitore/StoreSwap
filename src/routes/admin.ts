import { Router } from 'express';

import {
  getAddProduct,
  getProducts,
  postAddProduct,
} from '../controllers/admin';

const router = Router();

router.route('/add-product').get(getAddProduct).post(postAddProduct);

router.route('/products').get(getProducts);

export default router;
