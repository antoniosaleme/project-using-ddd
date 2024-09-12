import { Router } from 'express';
import { AuthController } from '../controllers';
import { AuthMiddleware } from '../middlewares';
import { AuthDatasourcesImpl } from '../../infrastructure/datasources';
import { AuthRepositoryImpl } from '../../infrastructure/repositories';


export class AuthRoutes {
  static get routes(): Router {
    const router = Router();

    const database = new AuthDatasourcesImpl();
    const authRepository = new AuthRepositoryImpl(database);
    const controller = new AuthController(authRepository);

    router.post('/login', controller.loginUser);
    router.post('/register', controller.registerUser);

    router.get('/', [AuthMiddleware.validateJWT], controller.getUser);

    return router;
  }
}
