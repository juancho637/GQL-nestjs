import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { hash } from 'bcrypt';
import { User } from './entities';
import { CreateUserInput, UpdateUserInput } from './dto';
import { StatusFactory } from './factories/status.factory';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User)
    private readonly usersRepository: Repository<User>,
    private readonly statusFactory: StatusFactory,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    try {
      const hashedPassword = await hash(createUserInput.password, 10);

      const user = this.usersRepository.create({
        ...createUserInput,
        password: hashedPassword,
      });

      return await this.usersRepository.save(user);
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.usersRepository.find();
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async findOne(id: string): Promise<User> {
    const user = await this.usersRepository.findOne({
      where: { id },
    });

    if (!user) {
      throw new NotFoundException();
    }

    return user;
  }

  // async me(): Promise<User> {
  //   return;
  // }

  async findOneByEmail(email: string): Promise<User> {
    try {
      return await this.usersRepository.findOneByOrFail({ email });
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async update(id: string, updateUserInput: UpdateUserInput): Promise<User> {
    throw new BadRequestException();
  }

  async block(id: string): Promise<User> {
    throw new BadRequestException();
  }
}
