import { UserEntity } from '../../domain/entities';
import { CustomError } from '../../domain/errors';

export class UserMapper {
  static userEntityFromObject(obj: { [key: string]: any }) {
    const { id, _id, name, email, password, role } = obj;

    if (!id || !_id) throw CustomError.BadRequest('User id is required');
    if (!name) throw CustomError.BadRequest('User name is required');
    if (!email) throw CustomError.BadRequest('User email is required');
    if (!password) throw CustomError.BadRequest('User password is required');
    if (!role) throw CustomError.BadRequest('User role is required');

    return new UserEntity(id || _id, name, email, password, role);
  }
}
