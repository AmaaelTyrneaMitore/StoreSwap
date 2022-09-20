import express from 'express';

import adminRoutes from './routes/admin';
import shopRoutes from './routes/shop';

const app = express();
const PORT = 3000;

// body parsing middleware
app.use(express.urlencoded({ extended: true }));

// route handling middlewares
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 route handling middleware
app.use((req, res, next) => {
  res.status(404).send('<h1>Page Not Found!</h1>');
});

app.listen(PORT, () => {
  console.clear();
  console.log(`[+] Listening at PORT: ${PORT}`);
  console.log(`[+] Visit http://localhost:${PORT}`);
});
