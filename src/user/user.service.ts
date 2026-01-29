import { ConflictException, Injectable, InternalServerErrorException, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { User } from "./entities/user.entity";
import { Repository } from "typeorm";
import { CreateUserInput } from "./dto/create-user.input";
import { UpdateUserInput } from "./dto/update-user.input";

@Injectable()
export class UserService {
    constructor(
        @InjectRepository(User)
        private userRepository: Repository<User>,
    ) {}

    async create(data: CreateUserInput): Promise<User> {
        const emailExists = await this.userRepository.findOne({ where: { email: data.email } })
        
        if(emailExists) {
            throw new ConflictException('Email já cadastrado')
        }
        
        const userData = this.userRepository.create(data);
        
        try {
            const newUser = await this.userRepository.save(userData);
            return newUser;
        } catch (error) {
            throw new InternalServerErrorException('Erro ao criar usuário');
        }
    }

    async findAllUsers(): Promise<User[]> {
        const users = await this.userRepository.find();

        if(!users) {
            throw new InternalServerErrorException('Nenhum usuário encontrado')
        }

        return users;
    }

    async findById(id: string): Promise<User> {
        const user = await this.userRepository.findOne({where: { id }});

        if(!user) {
            throw new NotFoundException(`Usuário com id ${id} não encontrado`);
        }

        return user;
    }

    async updateUser(id: string, data: UpdateUserInput): Promise<User> {
        const user = await this.findById(id);

        if(!user) {
            throw new NotFoundException(`Usuário com id ${id} não encontrado`);
        }

        Object.assign(user, data);

        return await this.userRepository.save(user);
    }

    async deleteUser(id: string): Promise<User> {
        const user = await this.findById(id);

        if(!user) {
            throw new NotFoundException(`Usuário com id ${id} não encontrado`);
        }

        await this.userRepository.delete(id);

        return user;
    }
}