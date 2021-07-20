import { Request, Response } from "express";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationsController {
    constructor(private listSpecificationsUseCase: ListSpecificationsUseCase) {

    }

    async handle(request: Request, response: Response): Promise<Response> {
        const all = await this.listSpecificationsUseCase.execute();

        return response.status(201).json(all);
    }
}

export { ListSpecificationsController }