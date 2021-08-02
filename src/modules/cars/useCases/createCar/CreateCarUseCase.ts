import { Car } from "@modules/cars/infra/typeorm/entities/Car";
import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { AppError } from "@shared/errors/AppError";
import { inject, injectable } from "tsyringe";

interface IRequest {
  name: string;
  description: string;
  daily_rate: number;
  license_plate: string;
  fine_amount: number;
  brand: string;
  category_id: string;
}

@injectable()
class CreateCarUseCase {

  constructor(
    @inject("CarsRepository")
    private repository: ICarsRepository
  ) { }

  async execute({ name, description, daily_rate, license_plate, fine_amount, brand, category_id }: IRequest): Promise<Car> {
    const carAlreadyExists = await this.repository.findByLicensePlate(license_plate);

    if (carAlreadyExists) {
      throw new AppError("Car already exists!");
    }

    const car = await this.repository.create({
      name,
      description,
      daily_rate,
      license_plate,
      fine_amount,
      brand,
      category_id
    });

    return car;
  }
}

export { CreateCarUseCase }