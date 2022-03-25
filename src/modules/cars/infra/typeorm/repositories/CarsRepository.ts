import { getRepository, Repository } from "typeorm";
import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { ICreateCarDTO } from "@modules/cars/dtos/ICreateCarDTO";
import { Car } from "../entities/Car";


class CarsRepository implements ICarsRepository {

    private repository: Repository<Car>;

    constructor() {
        this.repository = getRepository(Car);
    }

    async create({ name, description, daily_rate, license_plate, fine_amount, brand, category_id, specifications, id }: ICreateCarDTO): Promise<Car> {
        const car = this.repository.create({
            name,
            description,
            daily_rate,
            license_plate,
            fine_amount,
            brand,
            category_id,
            specifications,
            id
        });

        await this.repository.save(car);

        return car;
    }

    async findById(car_id: string): Promise<Car> {
        const car = await this.repository.findOne({ where: { id: car_id } });

        return car;
    }

    async findByLicensePlate(license_plate: string): Promise<Car> {
        const car = await this.repository.findOne({ where: { license_plate } });

        return car;
    }

    async findAvailable(brand?: string, category_id?: string, name?: string): Promise<Car[]> {
        const cars = await this.repository
            .createQueryBuilder()
            .where("available= :available", { available: true });

        if (brand) {
            cars.andWhere("brand = :brand", { brand });
        }

        if (category_id) {
            cars.andWhere("category_id = :category_id", { category_id });
        }

        if (name) {
            cars.andWhere("name = :name", { name });
        }

        return await cars.getMany();
    }

    async updateAvailable(car_id: string, available: boolean): Promise<void> {
        const car = await this.repository.findOne({ where: { id: car_id } });

        car.available = available;

        this.repository.save(car);
    }
};

export { CarsRepository };