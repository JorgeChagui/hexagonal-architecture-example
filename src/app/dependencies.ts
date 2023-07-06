// For simpler implementation we are using this manual approach for the Dependency Injection
// But there are various dependency injection frameworks and libraries available for TypeScript and Node.js,
// Such as InversifyJS, Awilix, or tsyringe.


import { UserFinder } from "../users/application/UserFinder";
import { UserController } from "../users/infrastructure/UserController";
import { InMemoryUserRepository } from "../users/infrastructure/InMemoryUserRepository";
import { UserRepository } from "../users/domain/UserRepository";
import { MyFakeSQLUserRepository } from "../users/infrastructure/MyFakeSQLUserRepository";
import config from "./config";
import { repositoryType } from "./constants";

// Here is were we create the concrete objects that have the implementation of the interfaces. We basically set the functionality here.
const userRepo: UserRepository = config.app.repositoryType === repositoryType.MyFakeSQL? new MyFakeSQLUserRepository(): new InMemoryUserRepository();
export const userFinder = new UserFinder(userRepo);
export const userController = new UserController(userFinder);

// We can also create the objects for the repository db connection,
// and inject here the credentials using the config object
// https://www.freecodecamp.org/news/using-environment-variables-the-right-way/