import { join } from 'path';
import { readFile, writeFile } from 'fs/promises';

import Product from './product';
import rootDir from '../utils/path';

const path = join(rootDir, 'data', 'cart.json');

interface CartProductInterface
  extends Omit<Product, 'save' | 'title' | 'price' | 'description'> {
  quantity: number;
}

interface CartItemInterface {
  products: CartProductInterface[];
  totalPrice: number;
}

export default class Cart {
  // This cart is not an object that should constantly be re-created.
  // You shouldn't add a new cart for every new product that is created.
  // Instead there should always be a cart that manages the products in there.
  // And that's why, instead of having a constructor, we
  static async addProduct(id: string, productPrice: number) {
    let cart: CartItemInterface = { products: [], totalPrice: 0 };
    let updatedProduct: CartProductInterface;

    try {
      // fetch the previous cart
      const fileContent = await readFile(path, { encoding: 'utf-8' });
      cart = JSON.parse(fileContent);
    } catch (err) {
      // if we have an error that means we don't have a cart yet
      console.log('[+] Existing cart not found, initializing a new one.');
    }

    // analyze the cart and find existing product
    const existingProductIndex = cart.products.findIndex(
      (product) => product.id === id
    );
    const existingProduct = cart.products[existingProductIndex];

    // add new product / increase quantiry in case of an existing product
    if (existingProduct) {
      updatedProduct = { ...existingProduct };
      updatedProduct.quantity++;
      // replace the old product (at existingProductIndex) with updatedProduct
      cart.products = [...cart.products];
      cart.products[existingProductIndex] = updatedProduct;
    } else {
      // add updatedProduct as a new item
      updatedProduct = { id, quantity: 1 };
      cart.products = [...cart.products, updatedProduct];
    }
    cart.totalPrice += productPrice;

    try {
      await writeFile(path, JSON.stringify(cart));
    } catch (err) {
      console.log(err);
    }
  }
}
