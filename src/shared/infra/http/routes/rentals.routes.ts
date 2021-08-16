import { Router } from "express";

import { ensureAuthenticated } from "../middlewares/ensureAuthenticated";
import { ensureAdmin } from "../middlewares/ensureAdmin";
import { CreateRentalController } from "@modules/rentals/useCases/createRental/CreateRentalController";

const rentalsRoutes = Router();

const createRentalController = new CreateRentalController();

rentalsRoutes.post("/", ensureAuthenticated, ensureAdmin, createRentalController.handle);

export { rentalsRoutes }