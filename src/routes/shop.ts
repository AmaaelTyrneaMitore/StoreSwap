import { Router } from 'express';

const router = Router();

router.route('/').get((req, res, next) => {
  res.send('Hello From Express!');
});

export default router;
