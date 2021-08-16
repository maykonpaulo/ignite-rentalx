import request, { Response } from "supertest";
import { Connection } from "typeorm";
import { hash } from "bcryptjs";
import { v4 as uuidV4 } from 'uuid';

import { app } from "@shared/infra/http/app";
import createConnection from "@shared/infra/typeorm";

let connection: Connection;
let responseToken: Response;

describe("Create Category Controller", () => {

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

  it("Should be able to create a new category", async () => {
    const { token } = responseToken.body;

    const response = await request(app).post("/categories")
      .send({
        name: "Teste",
        description: "Teste"
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(response.status).toBe(201);
  });

  it("Should not be able to create a new category with name exists", async () => {
    const { token } = responseToken.body;

    const response = await request(app).post("/categories")
      .send({
        name: "Teste",
        description: "Teste"
      })
      .set({
        Authorization: `Bearer ${token}`
      });

    expect(response.status).toBe(400);
  });
});