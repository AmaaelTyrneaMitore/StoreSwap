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
    public imageURL = 'http://test.com/img'
  ) {}

  static async fetchAll() {
    return products.find().toArray();
  }

  static async findById(productId: ObjectId) {
    return products.find({ _id: productId }).next();
  }

  async save() {
    try {
      await products.insertOne(this);
    } catch (err) {
      console.log(err);
    }
  }
}
