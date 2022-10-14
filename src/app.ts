import express from 'express';
// import { join } from 'path';

// import adminRoutes from './routes/admin.js';
// import shopRoutes from './routes/shop.js';

// import { get404 } from './controllers/errors.js';

// import rootDir from './utils/path.js';
import { printNetworkIfaceNames } from './utils/net.js';
import DatabaseHelper from './utils/database.js';

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.set('view engine', 'ejs');
// app.set('views', join(rootDir, '..', 'src', 'views'));

// body parsing middleware
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(join(__dirname, '..', 'public')));

// route handling middlewares
// app.use('/admin', adminRoutes);
// app.use(shopRoutes);

// 404 route handling middleware
// app.use(get404);

try {
  const helper = DatabaseHelper.getInstance();
  const connection = await helper.getDBConnection();
  console.log(connection);
  app.listen(PORT, () => {
    console.log(`[+] Listening at PORT: ${PORT}`);
    printNetworkIfaceNames(PORT);
  });
} catch (err) {
  console.log(err);
}
