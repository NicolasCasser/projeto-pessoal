import { Module } from "@nestjs/common";
import { JwtModule } from "@nestjs/jwt";
import { UserModule } from "src/user/user.module";
import { AuthService } from "./auth.service";
import { AuthResolver } from "./auth.resolver";

@Module({
    imports: [
        UserModule,
        JwtModule.register({
            secret: 'chave-super-secreta',
            signOptions: {expiresIn: '1h'},
        }),
    ],
    providers: [AuthService, AuthResolver],
})
export class AuthModule {}