import { Specification } from "@modules/cars/infra/typeorm/entities/Specification";
import { ISpecificationsRepository, ICreateSpecificationDTO } from "@modules/cars/repositories/ISpecificationsRepository";

class SpecificationsRepositoryInMemory implements ISpecificationsRepository {
    repository: Specification[] = [];

    constructor() {
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification = new Specification();

        Object.assign(specification, {
            name,
            description
        });

        this.repository.push(specification);
    }

    async list(): Promise<Specification[]> {
        const specifications = this.repository;

        return specifications;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = this.repository.find(specification => specification.name === name);

        return specification;
    }

    async findByIds(ids: string[]): Promise<Specification[]> {
        const specifications = await this.repository.filter(specification => ids.includes(specification.id));

        return specifications;
    }
};

export { SpecificationsRepositoryInMemory };