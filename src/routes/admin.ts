import { Router } from 'express';

import {
  getAddProduct,
  // getEditProduct,
  getProducts,
  postAddProduct,
  // postDeleteProduct,
  // postEditProduct,
} from '../controllers/admin.js';

const router = Router();

router.route('/add-product').get(getAddProduct).post(postAddProduct);

// using the post method since I want to work with query params
// and by default with get request, we can't use them, we have to
// use something like an input of type hidden when working with get
// requests

// reference: https://stackoverflow.com/questions/1116019/when-submitting-a-get-form-the-query-string-is-removed-from-the-action-url
// router.route('/edit-product/:productId').post(getEditProduct);

// router.route('/edit-product').post(postEditProduct);

// router.route('/delete-product/').post(postDeleteProduct);

router.route('/products').get(getProducts);

export default router;
