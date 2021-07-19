import { inject, injectable } from "tsyringe";
import { Specification } from "../../model/Specification";
import { ISpecificationsRepository } from "../../repositories/ISpecificationsRepository"

@injectable()
class ListSpecificationsUseCase {
    constructor(
        @inject("SpecificationsRepository")
        private specificationsRepository: ISpecificationsRepository
    ) { }

    execute(): Specification[] {
        const specifications = this.specificationsRepository.list();

        return specifications;
    }
}

export { ListSpecificationsUseCase }