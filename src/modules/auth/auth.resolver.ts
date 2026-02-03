import { Args, Mutation, Resolver } from "@nestjs/graphql";
import { AuthInput } from "./dto/auth.input";
import { AuthDTO } from "./dto/auth.dto";
import { AuthService } from "./auth.service";
import { UserService } from "src/user/user.service";

@Resolver()
export class AuthResolver {
    constructor(
        private authService: AuthService,
        private userService: UserService
    ) {}
    
    @Mutation(() => AuthDTO)
    public async login(
        @Args('data') data: AuthInput,
    ): Promise<AuthDTO> {
        return this.authService.login(data);
    }
}