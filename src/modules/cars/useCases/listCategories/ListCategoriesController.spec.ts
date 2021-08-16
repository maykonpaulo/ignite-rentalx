import request, { Response } from "supertest";
import { Connection } from "typeorm";
import { hash } from "bcryptjs";
import { v4 as uuidV4 } from 'uuid';

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
let responseToken: Response;

describe("List Category Controller", () => {

    beforeAll(async () => {
        connection = await createConnection();

        await connection.runMigrations();

        const id = uuidV4();

        const password = await hash("admin", 8);

        await connection.query(
            `INSERT INTO USERS (id, name, email, password, "isAdmin", created_at, driver_license) 
      values ('${id}', 'admin', 'admin@rentx', '${password}', true, 'now()', 'XXXXXXXXX')`
        );

        responseToken = await request(app).post("/sessions")
            .send({
                email: "admin@rentx",
                password: "admin"
            });
    });

    afterAll(async () => {
        await connection.dropDatabase();
        await connection.close();
    });

    it("Should be able to list all categories", async () => {
        const { token } = responseToken.body;

        await request(app).post("/categories")
            .send({
                name: "Teste",
                description: "Teste"
            })
            .set({
                Authorization: `Bearer ${token}`
            });

        await request(app).post("/categories")
            .send({
                name: "Teste 2",
                description: "Teste 2"
            })
            .set({
                Authorization: `Bearer ${token}`
            });

        const response = await request(app).get("/categories");

        expect(response.status).toBe(201);
        expect(response.body.length).toBe(2);
        expect(response.body[0]).toHaveProperty("id");
        expect(response.body[0].name).toEqual("Teste");
        expect(response.body[1]).toHaveProperty("id");
        expect(response.body[1].name).toEqual("Teste 2");
    });
});