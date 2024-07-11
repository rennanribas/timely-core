import { Resolver, Query, Mutation, Args } from '@nestjs/graphql';
import { UserService } from './user.service';
import { CreateUserInput } from './dto/create-user.input';
import { UpdateUserInput } from './dto/update-user.input';
import { User } from './entities/user.entity';
import { NotFoundException } from '@nestjs/common';

@Resolver()
export class UserResolver {
  constructor(private readonly userService: UserService) {}

  @Mutation(() => User)
  async createUser(
    @Args('createUserInput', { nullable: false })
    createUserInput: CreateUserInput,
  ): Promise<User> {
    if (!createUserInput) {
      throw new Error('Create user input is required');
    }

    try {
      return await this.userService.create(createUserInput);
    } catch (error) {
      throw new Error(
        `Error occurred while creating a new user: ${error.message}`,
      );
    }
  }

  @Query(() => [User])
  async users(): Promise<User[]> {
    try {
      return await this.userService.findAll();
    } catch (error) {
      throw new Error(`Error occurred while fetching users: ${error.message}`);
    }
  }

  @Query(() => User)
  async user(@Args('id', { nullable: false }) id: number): Promise<User> {
    if (!id) {
      throw new Error('User ID is required');
    }
    try {
      const user = await this.userService.findOne(id);
      if (!user) {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      return user;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Error occurred while fetching user with ID ${id}: ${error.message}`,
        );
      } else {
        throw new Error(`Error occurred while fetching user with ID ${id}`);
      }
    }
  }

  @Mutation(() => User)
  async updateUser(
    @Args('updateUserInput', { nullable: false })
    updateUserInput: UpdateUserInput,
  ): Promise<User> {
    if (!updateUserInput) {
      throw new Error('Update user input is required');
    }

    const { id } = updateUserInput;
    if (!id) {
      throw new Error('User ID is required');
    }

    try {
      return await this.userService.update(id, updateUserInput);
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Error occurred while updating user with ID ${id}: ${error.message}`,
        );
      } else {
        throw new Error(`Error occurred while updating user with ID ${id}`);
      }
    }
  }

  @Mutation(() => Boolean)
  async removeUser(
    @Args('id', { nullable: false }) id: number,
  ): Promise<boolean> {
    try {
      await this.userService.remove(id);
      return true;
    } catch (error) {
      if (error instanceof Error) {
        throw new Error(
          `Error occurred while removing user with ID ${id}: ${error.message}`,
        );
      } else {
        throw new Error(`Error occurred while removing user with ID ${id}`);
      }
    }
  }
}
