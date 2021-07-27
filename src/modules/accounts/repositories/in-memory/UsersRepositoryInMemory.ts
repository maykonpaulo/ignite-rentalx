import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";


class UsersRepositoryInMemory implements IUsersRepository {

  private repository: User[] = [];

  async create({ name, password, email, driver_license }: ICreateUserDTO): Promise<void> {
    const user = new User();

    Object.assign(user, {
      name,
      password,
      email,
      driver_license
    });

    await this.repository.push(user);
  }

  async list(): Promise<User[]> {
    const users = await this.repository;

    return users;
  }

  async findByName(name: string): Promise<User> {
    const user = await this.repository.find(user => user.name === name);

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.find(user => user.email === email);

    return user;
  }

  async findById(id: string): Promise<User> {
    const user = await this.repository.find(user => user.id === id);

    return user;
  }
};

export { UsersRepositoryInMemory };