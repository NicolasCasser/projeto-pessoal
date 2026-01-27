import { BaseEntity } from "../../modules/bases/entities/base.entity";
import { Column, Entity } from "typeorm";
import { UserType } from "../enum/user-type.enum";

@Entity()
export class User extends BaseEntity {
    @Column()
    name!: string;

    @Column({ unique: true })
    email!: string;

    @Column()
    role!: UserType;
    
    @Column()
    password!: string;
}