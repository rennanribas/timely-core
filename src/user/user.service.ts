import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<User>,
  ) {}

  async create(createUserInput: CreateUserInput): Promise<User> {
    if (!createUserInput) {
      throw new Error('Create user input is required');
    }

    const newUser = this.userRepository.create(createUserInput);
    try {
      return await this.userRepository.save(newUser);
    } catch (error) {
      throw new Error(
        `Error occurred while creating a new user: ${error.message}`,
      );
    }
  }

  async findAll(): Promise<User[]> {
    try {
      return await this.userRepository.find();
    } catch (error) {
      throw new NotFoundException('Error occurred while fetching users');
    }
  }

  async findOne(id: number): Promise<User> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }
    return user;
  }

  async update(id: number, updateUserInput: UpdateUserInput): Promise<User> {
    if (!updateUserInput) {
      throw new Error('Update user input is required');
    }

    const existingUser = await this.userRepository.findOne({ where: { id } });
    if (!existingUser) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    try {
      await this.userRepository.update({ id }, updateUserInput);
      return await this.userRepository.findOne({ where: { id } });
    } catch (error) {
      throw new Error(
        `Error occurred while updating user with ID ${id}: ${error.message}`,
      );
    }
  }

  async remove(id: number): Promise<void> {
    const user = await this.userRepository.findOne({ where: { id } });
    if (!user) {
      throw new NotFoundException(`User with ID ${id} not found`);
    }

    try {
      await this.userRepository.delete({ id });
    } catch (error) {
      throw new Error(
        `Error occurred while deleting user with ID ${id}: ${error.message}`,
      );
    }
  }
}
