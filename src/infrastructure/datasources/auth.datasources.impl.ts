
import { BcryptAdapter } from '../../config';
import { UserModel } from '../../data/mongodb/models';
import { RegisterUserDto } from '../../domain/auth';
import { AuthDatasource } from '../../domain/datasources';
import { UserEntity } from '../../domain/entities';
import { CustomError } from '../../domain/errors';
import { UserMapper } from '../mappers';


type HashFunction = (password: string) => string;
type compareFunction = (password: string, hashedPassword: string) => boolean;

export class AuthDatasourcesImpl implements AuthDatasource {
  constructor(
    private readonly hashPassword: HashFunction = BcryptAdapter.hash,
    private readonly comparePassword: compareFunction = BcryptAdapter.compare
  ) {}

  async register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    const { name, email, password } = registerUserDto;

    try {
      const userExist = await UserModel.findOne({ email });
      if (userExist) throw CustomError.BadRequest('User already exists');

      const user = await UserModel.create({
        name,
        email,
        password: this.hashPassword(password),
      });
      await user.save();

      return UserMapper.userEntityFromObject(user);
    } catch (error) {
      if (error instanceof CustomError) {
        throw error;
      }
      throw CustomError.InternalServerError();
    }
  }
}
