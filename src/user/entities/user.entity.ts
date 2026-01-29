import { BaseEntity } from "../../modules/bases/entities/base.entity";
import { BeforeInsert, BeforeUpdate, Column, Entity } from "typeorm";
import { UserType } from "../enum/user-type.enum";
import * as bcrypt from 'bcrypt';


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

    @BeforeInsert()
    @BeforeUpdate()
    async hashPassword() {
        if (this.password) {
            this.password = await bcrypt.hash(this.password, 10);
        }
    }
}