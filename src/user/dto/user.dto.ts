import { Field, ID, ObjectType } from "@nestjs/graphql";
import { UserType } from "../enum/user-type.enum";
import { BaseDTO } from "src/modules/bases/dto/base.dto";

@ObjectType('User')
export class UserDTO extends BaseDTO{
    @Field()
    name!: string;

    @Field()
    email!: string;

    @Field()
    role!: UserType;
}