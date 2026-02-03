import { Args, Mutation, Resolver } from '@nestjs/graphql';
import { UserService } from './user.service';
import { UserDTO } from './dto/user.dto';
import { CreateUserInput } from './dto/create-user.input';
import { User } from './entities/user.entity';
import { Query } from '@nestjs/graphql';
import { UpdateUserInput } from './dto/update-user.input';

@Resolver(() => UserDTO)
export class UserResolver {
    constructor(
        private readonly userService: UserService
    ) {}

    @Mutation(() => UserDTO, { name: 'createUser' })
    async createUser(
        @Args('data') data: CreateUserInput
    ): Promise<User> {
        const user = await this.userService.create(data);
        return user;
    }

    @Mutation(() => UserDTO)
    async updateUser(
        @Args('id') id: string,
        @Args('data') data: UpdateUserInput, 
    ): Promise<User> {
        const updateUser = await this.userService.updateUser(id, data);
        return updateUser;
    }

    @Mutation(() => UserDTO)
    async deleteUser(@Args('id') id: string): Promise<User> {
        const deleteUser = await this.userService.deleteUser(id);
        return deleteUser;
    }

    @Query(() => [UserDTO])
    async users(): Promise<User[]> {
        const users = await this.userService.findAllUsers();
        return users;
    }

    @Query(() => UserDTO)
    async user(@Args('id') id: string): Promise<User> {
        const user = await this.userService.findById(id);
        return user;
    }

    @Query(() => UserDTO)
    async findUserByEmail(@Args('email') email: string): Promise<User> {
        const user = await this.userService.findByEmail(email);
        return user;
    }
}
