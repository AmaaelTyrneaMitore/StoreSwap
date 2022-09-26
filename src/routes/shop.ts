import { Router } from 'express';

import admin from '../routes/admin';

const router = Router();

router.route('/').get((_req, res, _next) => {
  const { products } = admin;
  res.render('shop', {
    pageTitle: 'StoreSwap ― A shop for all your needs',
    path: '/',
    products,
  });
});

export default router;
