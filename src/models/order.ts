import { ObjectId } from 'mongodb';

import Product from './product.js';

/*
  Just like the Cart, order is also goning to have an items array, but it's also going 
  to store user data, like their id, name, and email. And here, I am duplicating data 
  simply because it ends up in the orders collection and the users collection, but I 
  don't care much about this because the data I have in here, the user data I have in 
  here, might change for sure, but it doesn't need to be updated on all the orders, 
  becuase if you had like processed and open orders, for all processed orders, you 
  wouldn't care too much if the user's email changes because you might need to touch 
  it there.

  Also, inside the items array that it's going to have, instead of just storing the product
  ids, I want to store more information about my products and also it's going to have date, 
  so the date when this order was created. And I am storing product data as the part of an
  order because I don't really care about that information changing, because if it should
  change, for orders, we need a snapshot anyways, if the price of a product changes, that
  doesn't affect the past order, so there I wouldn't want to update the price, even if it
  would change, so for orders, such a snapshot and therefore an embedded document is a great
  way of relating the order and the product because the product data might be duplicate but 
  it doesn't need to change in the orders collection, because there, we want the snapshot
*/

interface item extends Product {
  quantity: number;
}

export default class Order {
  public items!: item[];
  public user!: { _id: ObjectId; username: string };
  public createdAt!: number;
}
