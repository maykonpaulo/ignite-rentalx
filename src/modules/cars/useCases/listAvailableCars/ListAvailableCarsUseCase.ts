import { inject, injectable } from "tsyringe";

import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository"

interface IRequest {
    category_id?: string;
    brand?: string;
    name?: string;
}

@injectable()
class ListAvailableCarsUseCase {
    constructor(
        @inject("CarsRepository")
        private carsRepository: ICarsRepository
    ) { }

    async execute(data?: IRequest): Promise<Car[]> {
        const { category_id, brand, name } = data;

        const cars = await this.carsRepository.findAvailable(brand, category_id, name);

        return cars;
    }
}

export { ListAvailableCarsUseCase }