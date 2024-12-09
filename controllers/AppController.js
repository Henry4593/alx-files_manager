/* eslint-disable import/no-named-as-default */
import redisClient from "../utils/redis";
import dbClient from "../utils/db";

/**
 * Controller for application-related operations.
 */
export default class AppController {
  /**
   * Get the status of Redis and MongoDB clients.
   * @param {Request} req The Express request object.
   * @param {Response} res The Express response object.
   */
  static getStatus(req, res) {
    res.status(200).json({
      redis: redisClient.isAlive(),
      db: dbClient.isAlive(),
    });
  }

  /**
   * Get the statistics of the application, including user and file counts.
   * @param {Request} req The Express request object.
   * @param {Response} res The Express response object.
   */
  static getStats(req, res) {
    Promise.all([dbClient.nbUsers(), dbClient.nbFiles()]).then(
      ([usersCount, filesCount]) => {
        res.status(200).json({ users: usersCount, files: filesCount });
      },
    );
  }
}
