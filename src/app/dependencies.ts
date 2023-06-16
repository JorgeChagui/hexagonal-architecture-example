// For simpler implementation we are using this manual approach for the Dependency Injection
// But there are various dependency injection frameworks and libraries available for TypeScript and Node.js,
// Such as InversifyJS, Awilix, or tsyringe.


import dotenv from "dotenv";
import { UserFinder } from "../users/application/UserFinder";
import { UserController } from "../users/infrastructure/UserController";
import { InMemoryUserRepository } from "../users/infrastructure/InMemoryUserRepository";
import { UserRepository } from "../users/domain/UserRepository";
import { MyFakeSQLUserRepository } from "../users/infrastructure/MyFakeSQLUserRepository";

dotenv.config();

// Here is were we create the concrete objects that have the implementation of the interfaces. We basically set the functionality here.
const userRepo: UserRepository = process.env.repository_type === 'myfakesql'? new MyFakeSQLUserRepository(): new InMemoryUserRepository();
export const userFinder = new UserFinder(userRepo);
export const userController = new UserController(userFinder);