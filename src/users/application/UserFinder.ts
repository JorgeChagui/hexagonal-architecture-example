import { UserRepository } from "../domain/UserRepository";

export class UserFinder {
    // Check here that we are using as an attribute the interface UserRepository that belongs to the domain layer (inner layer)
    // Right now we don't know the implementation of it, but on the dependency file, we inject the right concrete dependency
    constructor(private readonly userRepository: UserRepository) {

    }
    async run(userId: string) {
        const user = await this.userRepository.getById(userId);

        if (!user) {
            throw new Error(`User not found ${userId}`);
            
        }

        return user;
    }
}