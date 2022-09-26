import express from 'express';
import { join } from 'path';

import admin from './routes/admin';
import shopRoutes from './routes/shop';

import rootDir from './utils/path';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', join(rootDir, '..', 'src', 'views'));

// body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, '..', 'public')));

// route handling middlewares
app.use('/admin', admin.router);
app.use(shopRoutes);

// 404 route handling middleware
app.use((_req, res, _next) => {
  res
    .status(404)
    .render('404', { pageTitle: '404 ― Page not found!', path: '' });
});

app.listen(PORT, () => {
  // console.clear();
  console.log(`[+] Listening at PORT: ${PORT}`);
  console.log(`[+] Visit http://localhost:${PORT}`);
});
