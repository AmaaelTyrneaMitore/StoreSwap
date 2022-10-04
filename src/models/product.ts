import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';
import { randomUUID } from 'crypto';

import rootDir from '../utils/path';

const getProductsFromFile = async (): Promise<[] | Product[]> => {
  const path = join(rootDir, 'data', 'products.json');
  try {
    const fileContent = await readFile(path, { encoding: 'utf-8' });
    return JSON.parse(fileContent);
  } catch (err) {
    return [];
  }
};

const path = join(rootDir, 'data', 'products.json');

export default class Product {
  constructor(
    public title: string,
    public description: string,
    public price: number,
    public id?: string
  ) {}

  static async fetchAll() {
    return await getProductsFromFile();
  }

  static async find(id: string) {
    return (await getProductsFromFile()).find((product) => product.id === id);
  }

  async save() {
    let products: Product[] = [];
    try {
      products = await getProductsFromFile();
      // in case of exisiting product, update it with new data
      if (this.id) {
        const existingProductIndex = products.findIndex(
          (product) => product.id === this.id
        );
        const updatedProducts = [...products];
        updatedProducts[existingProductIndex] = this;
        await writeFile(path, JSON.stringify(updatedProducts));
      } else {
        // in case of a new product, simply add it and give it an id
        this.id = randomUUID();
        products.push(this);
        await writeFile(path, JSON.stringify(products));
      }
    } catch (err) {
      console.log(err);
    }
  }
}
