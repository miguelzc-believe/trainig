import { Injectable, NotAcceptableException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { JwtPayload } from './jwt-payload';
import { compare } from 'bcrypt';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService, private jwtService: JwtService ) {}
    async validateUser(email: string, password: string): Promise<any> {
        const user = await this.usersService.getByEmail(email);
        if (!user) {
            throw new NotAcceptableException('Usuario no encontrado');
        }
        const passwordValid = await compare(password, user.password)
        if (user && passwordValid) {
            return user;
        }
        return null
    }

    async createToken(user: any) {
        let userToken: JwtPayload = { id: user.id, name: user.name, email: user.email }
        const token = await this.jwtService.sign(userToken)
        return token;
    }

    // async validateToken() {}

    async login(user: any) {
        // const payload = { username: user.username, sub: user.userId };
        // return {
        //     access_token: this.jwtService.sign(payload),
        // };
        let login = await this.validateUser(user.email, user.password)
        if (login !== null ) {
            let token = await this.createToken(login)
            return {user: login, token: token}
        }
        return login
    }
}
