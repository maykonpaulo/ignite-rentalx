import { getRepository, Repository } from "typeorm";
import { Specification } from "../../entities/Specification";
import { ISpecificationsRepository, ICreateSpecificationDTO } from "../ISpecificationsRepository";

class SpecificationsRepository implements ISpecificationsRepository {
    private repository: Repository<Specification>;

<<<<<<< HEAD
    constructor() {
        this.repository = getRepository(Specification);
=======
    private static INSTANCE: SpecificationsRepository;

    constructor() {
        this.specifications = [];
    }

    public static getInstance(): SpecificationsRepository {
        if (!SpecificationsRepository.INSTANCE) {
            SpecificationsRepository.INSTANCE = new SpecificationsRepository();
        }

        return SpecificationsRepository.INSTANCE;
>>>>>>> a80950a06b6f19542b3718702a3cfe7db95abaa3
    }

    async create({ name, description }: ICreateSpecificationDTO): Promise<void> {
        const specification = this.repository.create({
            name,
            description
        });

        await this.repository.save(specification);
    }

    async list(): Promise<Specification[]> {
        const specifications = await this.repository.find();

        return specifications;
    }

    async findByName(name: string): Promise<Specification> {
        const specification = await this.repository.findOne({ name });

        return specification;
    }
};

export { SpecificationsRepository };