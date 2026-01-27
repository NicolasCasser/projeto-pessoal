import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsEnum, IsNotEmpty, MinLength } from "class-validator";
import { UserType } from "../enum/user-type.enum";

@InputType()
export class CreateUserInput {
    @Field()
    @IsNotEmpty({ message: 'O nome não pode estar vazio' })
    name!: string;

    @Field()
    @IsEmail()
    @IsNotEmpty({ message: 'O campo de email é obrigatório' })
    email!: string;

    @Field()
    @MinLength(6, { message: 'A senha deve conter pelo menos 6 caracteres' })
    password!: string;

    @Field(() => UserType)
    @IsEnum(UserType)
    @IsNotEmpty({ message: 'Tipo de usuário é obrigatório'} )
    role: UserType;
}