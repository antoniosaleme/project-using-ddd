import jwt from 'jsonwebtoken';
import { envs } from '.';

const JWT_SEED = envs.JWT_SECRET;

export class JwtAdapter {
  static async generateToken(
    payload: Object,
    duration: string = '4h',
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      jwt.sign(payload, JWT_SEED, { expiresIn: duration }, (err, token) => {
        if (err || !token) {
          return reject(new Error('Token generation failed'));
        }
        resolve(token);
      });
    });
  }

  static async verifyToken<T>(token: string): Promise<T | null> {
    return new Promise((resolve, reject) => {
      jwt.verify(token, JWT_SEED, (err, decoded) => {
        if (err) {
          return reject(err);
        }
        resolve(decoded as T);
      });
    });
  }
}
