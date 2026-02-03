import { Field, InputType } from "@nestjs/graphql";
import { IsEmail, IsNotEmpty, IsString } from "class-validator";

@InputType()
export class AuthInput {
    @IsNotEmpty({ message: 'O campo de email não foi preenchido' })
    @IsEmail({}, { message: 'Formato de email inválido' })
    @Field()
    email!: string;
    
    @IsNotEmpty({ message: 'O campo de senha não foi preenchido' })
    @IsString({ message: 'O senha precisa ser uma string válida' })
    @Field()
    password!: string;
}