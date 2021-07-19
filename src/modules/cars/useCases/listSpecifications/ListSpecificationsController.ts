import { Request, Response } from "express";
import { container } from "tsyringe";
import { ListSpecificationsUseCase } from "./ListSpecificationsUseCase";

class ListSpecificationsController {
    handle(request: Request, response: Response): Response {
        const listSpecificationsUseCase = container.resolve(ListSpecificationsUseCase);

        const all = listSpecificationsUseCase.execute();

        return response.status(201).json(all);
    }
}

export { ListSpecificationsController }