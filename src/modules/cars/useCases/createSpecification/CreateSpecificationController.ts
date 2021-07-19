import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateSpecificationUseCase } from "./CreateSpecificationUseCase";

class CreateSpecificationController {
    handle(request: Request, response: Response): Response {
        const { name, description } = request.body;

        const createSpecificationUseCase = container.resolve(CreateSpecificationUseCase);

        try {
            createSpecificationUseCase.execute({ name, description });
        }
        catch (error) {
            return response.status(400).json(error);
        }

        return response.status(201).send();
    }
}

export { CreateSpecificationController };