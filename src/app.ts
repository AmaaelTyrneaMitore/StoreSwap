import express from 'express';
import { join } from 'path';
import appRootPath from 'app-root-path';
import { ObjectId } from 'mongodb';

import adminRoutes from './routes/admin.js';
import shopRoutes from './routes/shop.js';

import { get404 } from './controllers/errors.js';

import User from './models/user.js';

import { printNetworkIfaceNames } from './utils/net.js';
import DatabaseHelper from './utils/database.js';

/*
  Using module augmentation for patching the Request object
  and adding an user field to it which of type User
*/
declare module 'express-serve-static-core' {
  interface Request {
    user: User;
  }
}

const app = express();
const PORT = Number(process.env.PORT) || 3000;
const rootDir = appRootPath.toString();

app.set('view engine', 'ejs');
app.set('views', join(rootDir, 'src', 'views'));

// body parsing middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static(join(rootDir, 'public')));

// middleware for adding user to the request so that I can
// access it from anywhere inside my application
app.use(async (req, _res, next) => {
  try {
    // fetching a test user that I created behind the scenes
    // since I don't have any authentication flow yet
    const user = (await User.findById(
      new ObjectId('634a438d006e4dc30ed9126f')
    )) as User;
    req.user = user;
    next();
  } catch (err) {
    console.log(err);
    next();
  }
});

// route handling middlewares
app.use('/admin', adminRoutes);
app.use(shopRoutes);

// 404 route handling middleware
app.use(get404);

// establish connection to the DB so that I can use it
// throughout the application
DatabaseHelper.getInstance();

app.listen(PORT, () => {
  console.log(`[+] Listening at PORT: ${PORT}`);
  printNetworkIfaceNames(PORT);
});
