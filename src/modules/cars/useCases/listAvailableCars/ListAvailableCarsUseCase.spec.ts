import { ICarsRepository } from "@modules/cars/repositories/ICarsRepository";
import { CarsRepositoryInMemory } from "@modules/cars/repositories/in-memory/CarsRepositoryInMemory";
import { ListAvailableCarsUseCase } from "./ListAvailableCarsUseCase";

let listAvailableCarsUseCase: ListAvailableCarsUseCase;
let carsRepository: ICarsRepository;

describe("List Cars", () => {
    beforeEach(() => {
        carsRepository = new CarsRepositoryInMemory();
        listAvailableCarsUseCase = new ListAvailableCarsUseCase(carsRepository);
    });

    it("Should be able to list all available cars", async () => {
        const car = await carsRepository.create({
            name: "Teste",
            description: "Teste",
            daily_rate: 0,
            license_plate: "TTT-0000",
            fine_amount: 0,
            brand: "Teste",
            category_id: "1323"
        });

        const cars = await listAvailableCarsUseCase.execute({});

        expect(cars[0]).toEqual(car);
    });

    it("Should be able to list all avalable cars by brand", async () => {
        const car = await carsRepository.create({
            name: "Teste",
            description: "Teste",
            daily_rate: 0,
            license_plate: "TTT-0000",
            fine_amount: 0,
            brand: "Teste",
            category_id: "1323"
        });

        const cars = await listAvailableCarsUseCase.execute({
            brand: "Teste"
        });

        expect(cars[0]).toEqual(car);
    });

    it("Should be able to list all avalable cars by name", async () => {
        const car = await carsRepository.create({
            name: "Teste",
            description: "Teste",
            daily_rate: 0,
            license_plate: "TTT-0000",
            fine_amount: 0,
            brand: "Teste",
            category_id: "1323"
        });

        const cars = await listAvailableCarsUseCase.execute({
            name: "Teste"
        });

        expect(cars[0]).toEqual(car);
    });
});