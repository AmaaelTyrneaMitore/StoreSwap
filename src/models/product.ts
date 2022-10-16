import { ObjectId } from 'mongodb';

import DatabaseHelper from '../utils/database.js';

const db = await DatabaseHelper.getInstance().getDBConnection();
const products = db.collection<Product>('products');

/*
  Returning promises for read/fetch query operations instead of awaiting them
  and sending the data they fetched and only awaiting inside command operations
  to ensure void is returned in order to enforce Command-Query Separation
*/
export default class Product {
  constructor(
    public title: string,
    public description: string,
    public price: number,
    public _userId: ObjectId,
    public _id?: ObjectId,
    public imageURL = 'http://test.com/img'
  ) {}

  static fetchAll() {
    return products.find().toArray();
  }

  static findById(productId: ObjectId) {
    return products.find({ _id: productId }).next();
  }

  static async destroy(productId: ObjectId) {
    try {
      await products.deleteOne({ _id: productId });
    } catch (err) {
      console.log(err);
    }
  }

  async save() {
    /* 
     I'm destructuring the object like this because if I do have an _id
     it will trigger the logic to update an product and there if I pass
     "this" to $set, it will also try to update _id property which is immutable
     and therefore to overcome this problem, I storing the _id and other product
     details in two separate constants insted of using a blacklist or a whitelist
     approach
    */
    const { _id, ...productDetails } = this;

    try {
      if (_id) {
        // update the product
        await products.updateOne({ _id: _id }, { $set: productDetails });
      } else {
        // insert a new product
        await products.insertOne(this);
      }
    } catch (err) {
      console.log(err);
    }
  }
}
