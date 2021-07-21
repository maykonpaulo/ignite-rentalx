import { getRepository, Repository } from "typeorm";
import { ICreateUserDTO } from "../../dtos/ICreateUserDTO";
import { User } from "../../entities/User";
import { IUsersRepository } from "../IUsersRepository";


class UsersRepository implements IUsersRepository {

  private repository: Repository<User>;

  constructor() {
    this.repository = getRepository(User);
  }

  async create({ name, username, password, email, driver_license }: ICreateUserDTO): Promise<void> {
    const user = this.repository.create({
      name,
      username,
      password,
      email,
      driver_license
    });

    await this.repository.save(user);
  }

  async list(): Promise<User[]> {
    const users = await this.repository.find();

    return users;
  }

  async findByName(name: string): Promise<User> {
    const user = await this.repository.findOne({ name });

    return user;
  }

  async findByEmail(email: string): Promise<User> {
    const user = await this.repository.findOne({ email });

    return user;
  }
};

export { UsersRepository };