import { Request, Response } from 'express';
import { AuthRepository } from '../../domain/repositories';
import { CustomError } from '../../domain/errors';
import { RegisterUserDto } from '../../domain/auth';
import { RegisterUser } from '../../domain/use-cases/auth';
import { UserModel } from '../../data/mongodb/models/user.model';

export class AuthController {
  constructor(private readonly authRepository: AuthRepository) {}

  private handleError = (error: unknown, res: Response) => {
    if (error instanceof CustomError) {
      return res.status(error.statusCode).json({ error: error.message });
    }
    console.log(error); // winston would be better here
    return res.status(500).json({ error: 'Internal Server Error' });
  };

  registerUser = async (req: Request, res: Response) => {
    try {
      const [error, registerUserDto] = RegisterUserDto.create(req.body);
      if (error) {
        return this.handleError(CustomError.BadRequest(error), res);
      }

      const data = await new RegisterUser(this.authRepository).execute(
        registerUserDto!,
      );
      return res.json(data);
    } catch (error) {
      return this.handleError(error, res);
    }
  };

  loginUser = (req: Request, res: Response): Response => {
    return res.json('Login route controller');
  };

  getUser = (req: Request, res: Response) => {
    UserModel.find()
      .then((users: (typeof UserModel)[]) => {
        return res.json({
          users,
          token: req.body.payload,
        });
      })
      .catch(() => res.status(500).json({ error: 'Internal Server Error' }));
  };
}
