import { LoginUserDto, RegisterUserDto } from '../auth';
import { UserEntity } from '../entities/user.entity';

export abstract class AuthDatasource {
  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
  abstract login(loginUserDto: LoginUserDto): Promise<UserEntity>;
}
