import { User } from "../domain/User";
import { UserRepository } from "../domain/UserRepository";

const users: User[] = [
    {
        id: "1",
        name: "Jorge"
    },
    {
        id: "2",
        name: "Mafe"
    },
];

export class InMemoryUserRepository implements UserRepository {
    async getById(userId: string): Promise<User | null> {
        const userFound = users.find(user => user.id === userId);
        console.log("🤡 FROM IN-MEMORY USER REPO", userFound)

        if (!userFound) {
            return null;
        }

        return new User(userFound.id, userFound.name);
    }
    
}