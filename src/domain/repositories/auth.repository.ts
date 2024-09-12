import { RegisterUserDto } from '../auth';
import { UserEntity } from '../entities/user.entity';

export abstract class AuthRepository {
  abstract register(registerUserDto: RegisterUserDto): Promise<UserEntity>;
}
