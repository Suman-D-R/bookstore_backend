import HttpStatus from 'http-status-codes';
import jwt from 'jsonwebtoken';

/**
 * Middleware to authenticate if user has a valid Authorization token
 * Authorization: Bearer <token>
 *
 * @param {Object} req
 * @param {Object} res
 * @param {Function} next
 */

export const userAuth = async (req, res, next) => {
  try {
    let bearerTokenArray = req.header('Authorization');
    if (!bearerTokenArray)
      throw {
        code: HttpStatus.BAD_REQUEST,
        message: 'Authorization token is required'
      };

    bearerTokenArray = bearerTokenArray.split(' ');
    var bearerToken;
    bearerTokenArray.length > 1
      ? (bearerToken = bearerTokenArray[1])
      : (bearerToken = bearerTokenArray[0]);
    const user = await jwt.verify(bearerToken, process.env.SECRET_KEY);
    req.body.user_id = user._id;
    next();
  } catch (error) {
    next(error);
  }
};
