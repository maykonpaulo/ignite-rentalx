import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateCarUseCase } from "./CreateCarUseCase";

let createCarUseCase: CreateCarUseCase;
let carsRepository: CarsRepositoryInMemory;

describe("Create Car", () => {
  beforeEach(() => {
    carsRepository = new CarsRepositoryInMemory();
    createCarUseCase = new CreateCarUseCase(carsRepository);
  });

  it("Should be able to create a new car", async () => {
    const car = await createCarUseCase.execute({
      name: "",
      description: "",
      daily_rate: 0,
      license_plate: "",
      fine_amount: 0,
      brand: "",
      category_id: ""
    });

    expect(car).toHaveProperty("id");
  });

  it("Should not be able to create a car with exists license plate", () => {
    expect(async () => {
      await createCarUseCase.execute({
        name: "car 1",
        description: "",
        daily_rate: 0,
        license_plate: "ABC1234",
        fine_amount: 0,
        brand: "",
        category_id: ""
      });

      await createCarUseCase.execute({
        name: "car 2",
        description: "",
        daily_rate: 0,
        license_plate: "ABC1234",
        fine_amount: 0,
        brand: "",
        category_id: ""
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create an available car", async () => {
    const car = await createCarUseCase.execute({
      name: "car 1",
      description: "",
      daily_rate: 0,
      license_plate: "ABC1234",
      fine_amount: 0,
      brand: "",
      category_id: ""
    });

    expect(car.available).toBe(true);
  });
});