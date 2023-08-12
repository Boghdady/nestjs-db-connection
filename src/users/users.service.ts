import { Injectable, NotFoundException } from '@nestjs/common';
import { User } from './user.entity';
import { UpdateUserDto } from './dtos/update-user.dto';
import { CreateUserDto } from './dtos/create-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
  ) {}

  async findUsers(): Promise<User[]> {
    return await this.userRepository.find();
  }

  async findUserById(id: number): Promise<User> {
    const user = await this.userRepository.findOneBy({ id });
    if (!user) {
      throw new NotFoundException(`Not found user for this id :  ${id}`);
    }
    return user;
  }

  async createUser(createUserDto: CreateUserDto): Promise<User> {
    const newUser = await this.userRepository.save(createUserDto);
    return newUser;
  }

  async updateUser(id: number, updateUserDto: UpdateUserDto): Promise<User> {
    // 1) find user to update
    const userToUpdate = await this.findUserById(id);
    if (!userToUpdate) {
      throw new NotFoundException(`Not found user for this id :  ${id}`);
    }

    // 2) update the element
    const updatedUser = { ...userToUpdate, ...updateUserDto };

    return this.userRepository.save(updatedUser);
  }

  async deleteUser(id: number): Promise<void> {
    await this.userRepository.delete({ id });
  }
}
