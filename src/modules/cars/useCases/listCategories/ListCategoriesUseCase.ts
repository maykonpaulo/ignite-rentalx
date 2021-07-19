import { inject, injectable } from "tsyringe";
import { Category } from "../../model/Category";
import { ICategoriesRepository } from "../../repositories/ICategoriesRepository"

@injectable()
class ListCategoriesUseCase {
    constructor(
        @inject("CategoriesRepository")
        private categoriesRepository: ICategoriesRepository
    ) { }

    execute(): Category[] {
        const categories = this.categoriesRepository.list();

        return categories;
    }
}

export { ListCategoriesUseCase }