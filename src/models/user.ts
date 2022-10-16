import { ObjectId } from 'mongodb';

import DatabaseHelper from '../utils/database.js';

import Product from './product.js';
import Cart from './cart.js';

const db = await DatabaseHelper.getInstance().getDBConnection();
const users = db.collection<User>('users');
const products = db.collection<Product>('products');

export default class User {
  constructor(
    public username: string,
    public email: string,
    public cart: Cart = { items: [] },
    public _id?: ObjectId
  ) {}

  static findById(userId: ObjectId) {
    return users.find({ _id: userId }).next();
  }

  async save() {
    const { _id, ...userDetails } = this;
    try {
      if (_id) {
        await users.updateOne({ _id }, { $set: userDetails });
      } else {
        await users.insertOne(this);
      }
    } catch (err) {
      console.log(err);
    }
  }

  /*
    This method will be called on a User object and I'll create that object
    with data that I fetch from the database. And therefore I am also going to
    accept 1 more argument in the User constructor and that's the Cart, so that
    I can store the cart in the JS object here which will be based on the data that
    I stored in the database.
  */

  async addToCart(product: Product) {
    // find the index of a product in that cart with the same ID as the product
    // that I'm try to add again
    const cartProductIndex = this.cart.items.findIndex(
      // converting both IDs to string as the product that will be passed as an
      // argument to this function won't be an actual Product object, and therefore
      // the _id it's going to have will be of type string
      (cartItem) => cartItem._productId.toString() === product._id!.toString()
    );
    let newQuantity = 1;

    // creating a new array that consists all the items from the cart so that
    // I can edit this array without touching the old array
    const updatedCartItems = [...this.cart.items];

    // if this product exist in the cart the increase its quantity by 1
    if (cartProductIndex != -1) {
      newQuantity = this.cart.items[cartProductIndex].quantity + 1;
      updatedCartItems[cartProductIndex].quantity = newQuantity;
    } else {
      // add this product in the updatedCartItems if it's not in there
      updatedCartItems.push({
        _productId: product._id!,
        quantity: newQuantity,
      });
    }

    /*
      create a new item in the cart in case of a new item,
      only storing the product's id and its quantity, however,
      I don't want to update by always overwriting items with a new array
      with exactly one object, instead I want to add a new object to that array
      if the product does not exist in there, or if it does exist in there, I want
      to update that one product
    */

    const updatedCart = {
      items: updatedCartItems,
    };

    try {
      // update the user in the DB to store the cart in there
      await users.updateOne({ _id: this._id }, { $set: { cart: updatedCart } });
    } catch (err) {
      console.log(err);
    }
  }

  async deleteItemFromCart(productId: ObjectId) {
    const updatedCartItems = this.cart.items.filter(
      (cartItem) => cartItem._productId.toString() !== productId.toString()
    );
    try {
      await users.updateOne(
        { _id: this._id },
        { $set: { cart: { items: updatedCartItems } } }
      );
    } catch (err) {
      console.log(err);
    }
  }

  /*
    Because getCart only exists on a user that has a cart property, this is the MongoDB
    way of thinking about relations, we don't need to reach out to a Cart collection
    because there is no such collection. Instead here, I can simply return the entire cart,
    but not just a cart with references to the product, but instead, a fully populated cart
    with all the product details
  */

  async getCart() {
    // construct an array that holds only the product id of all the items in the cart
    const productIds = this.cart.items.map((cartItem) => cartItem._productId);
    // fetch all the elements where the id is one of the ids mentioned in the productIds
    const cartProducts = await products
      .find({ _id: { $in: productIds } })
      .toArray();

    // add quantity back to every product and set it to the quantity that is stored
    // in the cart of this user
    return cartProducts.map((product) => ({
      ...product,
      quantity: this.cart.items.find(
        (cartItem) => cartItem._productId.toString() === product._id.toString()
      )!.quantity,
    }));
  }
}
