import { RegisterUserDto } from '../../domain/auth';
import { AuthDatasource } from '../../domain/datasources';
import { UserEntity } from '../../domain/entities';
import { AuthRepository } from '../../domain/repositories';

export class AuthRepositoryImpl extends AuthRepository {
  constructor(private readonly authDatasource: AuthDatasource) {
    super();
  }
  register(registerUserDto: RegisterUserDto): Promise<UserEntity> {
    return this.authDatasource.register(registerUserDto);
  }
}
