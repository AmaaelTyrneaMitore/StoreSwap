import express from 'express';
import { join } from 'path';

import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';

import { get404 } from './controllers/errors';

import rootDir from './utils/path';
import { printNetworkIfaceNames } from './utils/net';

const app = express();
const PORT = 3000;

app.set('view engine', 'ejs');
app.set('views', join(rootDir, '..', 'src', 'views'));

// body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(__dirname, '..', 'public')));

// route handling middlewares
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 route handling middleware
app.use(get404);

app.listen(PORT, () => {
  console.log(`[+] Listening at PORT: ${PORT}`);
  printNetworkIfaceNames(PORT);
});
