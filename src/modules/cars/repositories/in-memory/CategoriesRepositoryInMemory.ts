import { Category } from "@modules/cars/infra/typeorm/entities/Category";
import { ICategoriesRepository, ICreateCategoryDTO } from "../ICategoriesRepository";

class CategoriesRepositoryInMemory implements ICategoriesRepository {

    private repository: Category[] = [];

    async create({ name, description }: ICreateCategoryDTO): Promise<void> {
        const category = new Category();

        Object.assign(category, {
            name,
            description
        });

        await this.repository.push(category);
    }

    async list(): Promise<Category[]> {
        const categories = await this.repository;

        return categories;
    }

    async findByName(name: string): Promise<Category> {
        const category = this.repository.find(category => category.name === name);

        return category;
    }
};

export { CategoriesRepositoryInMemory };