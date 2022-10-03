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
    public id = randomUUID()
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
      products.push(this);
      await writeFile(path, JSON.stringify(products));
    } catch (err) {
      console.log(err);
    }
  }
}
