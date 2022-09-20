import { Router } from 'express';

const router = Router();

router
  .route('/add-product')
  .get((req, res, next) => {
    res.send(
      '<form action="/admin/add-product" method="POST"><input type="text" name="title" /><button type="submit">Add Product</button></form>'
    );
  })
  .post((req, res, next) => {
    console.log(req.body);
    res.redirect('/');
  });

export default router;
