import { RentalsRepositoryInMemory } from "@modules/rentals/repositories/in-memory/RentalsRepositoryInMemory";
import { AppError } from "@shared/errors/AppError";
import { CreateRentalUseCase } from "./CreateRentalUseCase";

let createRentalUseCase: CreateRentalUseCase;
let rentalsRepository: RentalsRepositoryInMemory;

describe("Create Rental", () => {
  beforeEach(() => {
    rentalsRepository = new RentalsRepositoryInMemory();
    createRentalUseCase = new CreateRentalUseCase(rentalsRepository);
  });

  it("Should be able to create a new rental", async () => {
    const rental = await createRentalUseCase.execute({
      user_id: "54698",
      car_id: "45454687",
      expected_return_date: new Date()
    });

    expect(rental).toHaveProperty("id");
    expect(rental).toHaveProperty("start_date");
  });

  it("Should not be able to create a new rental if there is another open to same user", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "54698",
        car_id: "45454687343",
        expected_return_date: new Date()
      });

      await createRentalUseCase.execute({
        user_id: "54698",
        car_id: "45454687",
        expected_return_date: new Date()
      });
    }).rejects.toBeInstanceOf(AppError);
  });

  it("Should not be able to create a new rental if there is another open to same car", async () => {
    expect(async () => {
      await createRentalUseCase.execute({
        user_id: "324325436546",
        car_id: "45454687343",
        expected_return_date: new Date()
      });

      await createRentalUseCase.execute({
        user_id: "54698",
        car_id: "45454687343",
        expected_return_date: new Date()
      });
    }).rejects.toBeInstanceOf(AppError);
  });
});