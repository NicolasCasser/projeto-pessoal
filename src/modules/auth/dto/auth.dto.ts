import { Field, ObjectType } from "@nestjs/graphql";
import { UserDTO } from "src/user/dto/user.dto";
import { User } from "src/user/entities/user.entity";

@ObjectType()
export class AuthDTO {
    @Field(() => UserDTO, { nullable: true })
    user?: User;

    @Field({ nullable: true })
    acessToken?: string;
}