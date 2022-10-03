import { readFile, writeFile } from 'fs/promises';
import { join } from 'path';

import rootDir from '../utils/path';

interface ProductInterface {
  title: string;
}

const getProductsFromFile = async (): Promise<[] | ProductInterface[]> => {
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
    public price: number
  ) {}

  static async fetchAll() {
    return await getProductsFromFile();
  }

  async save() {
    let products: ProductInterface[] = [];
    try {
      products = await getProductsFromFile();
      products.push(this);
      await writeFile(path, JSON.stringify(products));
    } catch (err) {
      console.log(err);
    }
  }
}
