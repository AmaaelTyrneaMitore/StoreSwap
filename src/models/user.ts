import { ObjectId } from 'mongodb';

import DatabaseHelper from '../utils/database.js';

const db = await DatabaseHelper.getInstance().getDBConnection();
const users = db.collection<User>('users');

export default class User {
  constructor(
    public username: string,
    public email: string,
    public _id?: ObjectId
  ) {}

  static async findById(userId: ObjectId) {
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
}
