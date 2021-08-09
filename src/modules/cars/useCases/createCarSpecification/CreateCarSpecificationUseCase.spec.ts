import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { SpecificationsRepositoryInMemory } from "@modules/cars/repositories/in-memory/SpecificationsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarSpecificationUseCase } from "./CreateCarSpecificationUseCase";

let createCarSpecificationUseCase: CreateCarSpecificationUseCase;
let carsRepository: CarsRepositoryInMemory;
let specificationsRepository: SpecificationsRepositoryInMemory;

describe("Create Car Specification", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    specificationsRepository = new SpecificationsRepositoryInMemory();
    createCarSpecificationUseCase = new CreateCarSpecificationUseCase(carsRepository, specificationsRepository);
  });

  it("Should not be able to add a new specification to a non-exist car", async () => {
    expect(async () => {
      const car_id = "123";
      const specifications_id = ["23434"];

      await createCarSpecificationUseCase.execute({ car_id, specifications_id });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should be able to add a new specification to a car", async () => {
    const car = await carsRepository.create({
      name: "car 1",
      description: "",
      daily_rate: 0,
      license_plate: "ABC1234",
      fine_amount: 0,
      brand: "",
      category_id: ""
    });

    await specificationsRepository.create({
      name: "Teste",
      description: "Teste"
    });

    const car_id = car.id;
    const specifications_id = [(await specificationsRepository.findByName("Teste")).id];

    const specificationsCars = await createCarSpecificationUseCase.execute({ car_id, specifications_id });

    expect(specificationsCars).toHaveProperty("specifications");

    expect(specificationsCars.specifications.length).toBe(1);
  });
});