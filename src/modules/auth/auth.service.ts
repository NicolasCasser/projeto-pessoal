import { Injectable, UnauthorizedException } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { UserService } from "src/user/user.service";
import * as bcrypt from 'bcrypt';
import { AuthInput } from "./dto/auth.input";
import { AuthDTO } from "./dto/auth.dto";

@Injectable()
export class AuthService {
    constructor(
        private userService: UserService,
        private jwtService: JwtService,
    ) {}

    async login(data: AuthInput): Promise<AuthDTO> {
        const { email, password } = data;

        const user = await this.userService.findByEmail(email);

        if(!user) {
            throw new UnauthorizedException('Email ou senha inválidos');
        }

        const passwordMatch = await bcrypt.compare(password, user.password);

        if (!passwordMatch) {
            throw new UnauthorizedException('Email ou senha inválidos');
        }

        const payload = { sub: user.id, email: user.email };
        const acessToken = await this.jwtService.signAsync(payload);

        return {
            user,
            acessToken
        };
    }
};