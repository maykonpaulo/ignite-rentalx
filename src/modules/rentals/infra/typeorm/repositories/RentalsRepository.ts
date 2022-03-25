import { getRepository, Repository } from "typeorm";

import { ICreateRentalDTO } from "@modules/rentals/dtos/ICreateRentalDTO";
import { Rental } from "@modules/rentals/infra/typeorm/entities/Rental";
import { IRentalsRepository } from "@modules/rentals/repositories/IRentalsRepository";

class RentalsRepository implements IRentalsRepository {
  private repository: Repository<Rental>;

  constructor() {
    this.repository = getRepository(Rental);
  }

  async findOpenRentalByCar(car_id: string): Promise<Rental> {
    return this.repository.createQueryBuilder().where(car_id).andWhere("end_date is not :end_date", { end_date: null }).getOne();
  }

  async findOpenRentalByUser(user_id: string): Promise<Rental> {
    return this.repository.createQueryBuilder().where(user_id).andWhere("end_date is not :end_date", { end_date: null }).getOne();
  }

  async create({ user_id, car_id, expected_return_date }: ICreateRentalDTO): Promise<Rental> {
    const rental = this.repository.create({
      car_id,
      user_id,
      expected_return_date,
      start_date: new Date()
    });

    await this.repository.save(rental);

    return rental;
  }

  async findById(id: string): Promise<Rental> {
    return await this.repository.findOne(id);
  }
}

export { RentalsRepository }