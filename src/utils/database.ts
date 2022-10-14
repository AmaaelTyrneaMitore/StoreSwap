import { Db, MongoClient, ServerApiVersion } from 'mongodb';

const { MONGO_USER, MONGO_PASS, MONGO_DEFAULT_DB } = process.env;
const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

/*
    Using singleton pattern here so that I only have one instance of this DB Handler
    class because inside its constructor, I am connecting to my MongoDB server. And
    after it gets connected, I can then use the getDBConnection method on the instantiated
    object to retrieve that connection so that I can use it to work with my DB

    Inside the getDBConnection method, I am using recursion to make sure it only returns 
    the connection which is of type Db. Inside it, I am using the sleep function with a 
    timeout of 1000ms to make sure it waits for a second before moving on to the next iteration
    as it can take a couple of seconds for MongoDBCleint to establish the connection and I want to
    make sure that I don't get a RangeError saying that my maximum call stack size exceeded
*/

export default class DatabaseHelper {
  private db!: Db;
  private static _instance: DatabaseHelper;

  private constructor() {
    new MongoClient(
      `mongodb+srv://${MONGO_USER}:${MONGO_PASS}@storeswap.6p055x4.mongodb.net/?retryWrites=true&w=majority`,
      {
        serverApi: ServerApiVersion.v1,
      }
    )
      .connect()
      .then((client) => {
        console.log(`[+] Connection to MongoDB established successfully`);
        this.db = client.db(MONGO_DEFAULT_DB);
        if (MONGO_DEFAULT_DB) {
          console.log(`[+] Connected to the ${MONGO_DEFAULT_DB} database`);
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static getInstance() {
    if (this._instance) return this._instance;
    this._instance = new DatabaseHelper();
    return this._instance;
  }

  public async getDBConnection(): Promise<Db> {
    if (DatabaseHelper._instance) {
      if (this.db !== undefined) {
        return this.db;
      } else {
        await sleep(1000);
        return await this.getDBConnection();
      }
    } else {
      throw new Error('No database found!');
    }
  }
}
