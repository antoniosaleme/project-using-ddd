### Overview

This Express app follows a clean architecture with a well-structured organization into separate layers, making it highly maintainable, scalable, and testable. The project is divided into multiple folders, each with a specific responsibility, following the principles of Domain-Driven Design (DDD) and Clean Architecture.

The application uses Express for the server, MongoDB with Mongoose for database management, and Docker to run MongoDB locally, making it easier to manage during development. 

### Folder Structure

/src

This is the root folder that contains all the source code of the application. All code related to the logic of the project is housed here.

/config

This folder contains the configuration files, including environment variables, database connections, and other general settings that the application depends on.

/data

The data folder contains logic related to data access and persistence. It interacts with databases or other storage mechanisms, abstracting the data operations. This allows the rest of the app to remain agnostic of the specific data source being used.

/presentation

This folder is where the application interacts with the outside world, typically through HTTP requests and responses. It contains the controllers and routes that handle the incoming API requests and return the appropriate responses.

/domain

The domain layer contains the core business logic and rules of the application. It includes domain models and services that are central to the business and should be as independent as possible from the technical details of other layers.

/infrastructure

The infrastructure layer deals with external systems like databases, APIs, or messaging queues. It serves as the layer that bridges the domain logic with the outside world by handling low-level technical operations.


```bash
npm i -D prettier
npm install env-var
npm install express
npm install --save-dev @types/express
npm install jsonwebtoken
npm install --save-dev @types/jsonwebtoken
npm install bcryptjs
npm install --save-dev @types/bcryptjs
npm install dotenv
npm install mongoose
```# project-using-ddd
