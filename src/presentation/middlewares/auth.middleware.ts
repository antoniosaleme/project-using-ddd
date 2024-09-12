import { Request, Response, NextFunction } from 'express';
import { JwtAdapter } from '../../config';
import { UserModel } from '../../data/mongodb/models';


export class AuthMiddleware {
  static validateJWT = async (
    req: Request,
    res: Response,
    next: NextFunction,
  ) => {
    const authorization = req.header('Authorization');
    if (!authorization)
      return res.status(401).json({ error: 'Unauthorized, no token provided' });
    if (!authorization.startsWith('Bearer '))
      return res
        .status(401)
        .json({ error: 'Unauthorized, invalid Bearer token' });

    const token = authorization.split(' ').at(1) || '';

    try {
      const payload = await JwtAdapter.verifyToken<{ id: string }>(token);
      if (!payload)
        return res.status(401).json({ error: 'Unauthorized, invalid token' });

      const user = await UserModel.findById(payload.id);
      if (!user)
        return res.status(401).json({ error: 'Unauthorized, user not found' });

      req.body.user = user;

      next();
    } catch (error) {
      console.log(error); // TODO: use winston here
      return res.status(500).json({ error: 'Internal Server Error' });
    }
  };
}
