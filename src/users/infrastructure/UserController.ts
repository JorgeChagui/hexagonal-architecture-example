import { Request, Response } from "express";
import { UserFinder } from "../application/UserFinder";

export class UserController {
    // On the controller we use the Use Case as the attribute, we will get this object also on the dependency file.
    constructor(private readonly userFinder: UserFinder) {
        
    }

    async getUser(req: Request, res: Response) {
        const userId = req.params.id;

        try {
            const result = await this.userFinder.run(userId);
            res.send({name: result.name});
            
        } catch (error: any) {
            res.status(500).send({message: error.message})
        }
    }
}