import { ObjectId } from 'mongodb';
/*
  For every user I have, I wanna store a cart. That user will have a cart
  and that cart will hold the products, and here, because I have a strict 
  one-to-one relationship between a user and a cart, instead of using ID references,
  I am going to use MongoDB's document embedding to handle this relationship.

  I am also going to modify my User model to store cart-items for every user by
  adding an addToCart method.
*/

export default class Cart {
  public items!: { _productId: ObjectId; quantity: number }[];
}
