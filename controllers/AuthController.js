/* eslint-disable import/no-named-as-default */
import { v4 as uuidv4 } from "uuid";
import redisClient from "../utils/redis";

/**
 * Controller for authentication-related operations.
 */
export default class AuthController {
  /**
   * Handle user connection and generate an authentication token.
   * @param {Request} req The Express request object.
   * @param {Response} res The Express response object.
   */
  static async getConnect(req, res) {
    const { user } = req;
    const token = uuidv4();

    await redisClient.set(`auth_${token}`, user._id.toString(), 24 * 60 * 60);
    res.status(200).json({ token });
  }

  /**
   * Handle user disconnection by deleting the authentication token.
   * @param {Request} req The Express request object.
   * @param {Response} res The Express response object.
   */
  static async getDisconnect(req, res) {
    const token = req.headers["x-token"];

    await redisClient.del(`auth_${token}`);
    res.status(204).send();
  }
}
