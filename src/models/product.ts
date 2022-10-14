import DatabaseHelper from '../utils/database.js';

const db = await DatabaseHelper.getInstance().getDBConnection();
const products = db.collection('products');

export default class Product {
  constructor(
    public title: string,
    public description: string,
    public price: number,
    public imageURL = 'http://test.com/img'
  ) {}

  async save() {
    return products.insertOne(this);
  }
}
