import mongodb from "mongodb";
// eslint-disable-next-line no-unused-vars
import Collection from "mongodb/lib/collection";
import envLoader from "./env_loader";

/**
 * Class representing a MongoDB client.
 */
class DBClient {
  /**
   * Initialize a new DBClient instance.
   */
  constructor() {
    envLoader();
    const host = process.env.DB_HOST || "localhost";
    const port = process.env.DB_PORT || 27017;
    const database = process.env.DB_DATABASE || "files_manager";
    const dbURL = `mongodb://${host}:${port}/${database}`;

    this.client = new mongodb.MongoClient(dbURL, { useUnifiedTopology: true });
    this.client.connect();
  }

  /**
   * Verify if the MongoDB client is connected.
   * @returns {boolean} Connection status.
   */
  isAlive() {
    return this.client.isConnected();
  }

  /**
   * Count the number of users in the database.
   * @returns {Promise<Number>} The total number of users.
   */
  async nbUsers() {
    return this.client.db().collection("users").countDocuments();
  }

  /**
   * Count the number of files in the database.
   * @returns {Promise<Number>} The total number of files.
   */
  async nbFiles() {
    return this.client.db().collection("files").countDocuments();
  }

  /**
   * Get the reference to the `users` collection.
   * @returns {Promise<Collection>} The users collection.
   */
  async usersCollection() {
    return this.client.db().collection("users");
  }

  /**
   * Get the reference to the `files` collection.
   * @returns {Promise<Collection>} The files collection.
   */
  async filesCollection() {
    return this.client.db().collection("files");
  }
}

export const dbClient = new DBClient();
export default dbClient;
