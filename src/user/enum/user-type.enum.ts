import { registerEnumType } from "@nestjs/graphql";

export enum UserType {
    CLIENT = 'client',
    PROFESSIONAL = 'professional',
}

registerEnumType(UserType, {
    name: 'UserType',
    description: 'Define o tipo de conta do usuário',
});