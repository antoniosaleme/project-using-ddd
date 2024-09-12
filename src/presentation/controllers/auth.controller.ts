import { Request, Response } from 'express';
import { AuthRepository } from '../../domain/repositories';
import { CustomError } from '../../domain/errors';
import { LoginUserDto, RegisterUserDto } from '../../domain/auth';
import { LoginUser, RegisterUser } from '../../domain/use-cases/auth';
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

      const registerUseCase = new RegisterUser(this.authRepository);
      const data = await registerUseCase.execute(registerUserDto!);
      return res.json(data);
    } catch (error) {
      return this.handleError(error, res);
    }
  };

  loginUser = async (req: Request, res: Response): Promise<Response> => {
    try {
      const [error, loginUserDto] = LoginUserDto.create(req.body);
      if (error) {
        return this.handleError(CustomError.BadRequest(error), res);
      }

      const loginUseCase = new LoginUser(this.authRepository);
      const data = await loginUseCase.execute(loginUserDto!);
      return res.json(data);
    } catch (error) {
      return this.handleError(error, res);
    }
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
