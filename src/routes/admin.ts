import { Router } from 'express';

const router = Router();

interface Product {
  title: string;
}

const products: Product[] = [];

router
  .route('/add-product')
  .get((_req, res, _next) => {
    res.render('add-product', {
      pageTitle: 'Add Product ― Store Swap',
      path: '/admin/add-product',
    });
  })
  .post((req, res, _next) => {
    products.push({ title: (req.body as { title: string }).title });
    res.redirect('/');
  });

export default {
  router,
  products,
};
