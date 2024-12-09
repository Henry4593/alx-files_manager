import { promisify } from "util";
import { createClient } from "redis";

/**
 * Class representing a Redis client.
 */
class RedisClient {
  /**
   * Instantiate a new RedisClient.
   */
  constructor() {
    this.client = createClient();
    this.isClientConnected = true;
    this.client.on("error", (err) => {
      console.error(
        "Error: Redis client connection failed:",
        err.message || err.toString(),
      );
      this.isClientConnected = false;
    });
    this.client.on("connect", () => {
      this.isClientConnected = true;
    });
  }

  /**
   * Check the connectivity status of the Redis client.
   * @returns {boolean} Connection status.
   */
  isAlive() {
    return this.isClientConnected;
  }

  /**
   * Retrieve the value associated with a specified key.
   * @param {String} key The key for the value to be retrieved.
   * @returns {Promise<String | Object>} The value stored in Redis.
   */
  async get(key) {
    return promisify(this.client.GET).bind(this.client)(key);
  }

  /**
   * Store a key-value pair in Redis with an expiration time.
   * @param {String} key The key under which the value is stored.
   * @param {String | Number | Boolean} value The value to be stored.
   * @param {Number} duration The time-to-live (TTL) for the key in seconds.
   * @returns {Promise<void>}
   */
  async set(key, value, duration) {
    await promisify(this.client.SETEX).bind(this.client)(key, duration, value);
  }

  /**
   * Delete the value associated with a specified key.
   * @param {String} key The key for which the value should be deleted.
   * @returns {Promise<void>}
   */
  async del(key) {
    await promisify(this.client.DEL).bind(this.client)(key);
  }
}

export const redisClient = new RedisClient();
export default redisClient;
