import { Injectable, NotAcceptableException } from '@nestjs/common';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
    constructor(private usersService: UserService ) {}
    async validateUser(email: string, password: string): Promise<any> {
        const bcrypt = require('bcrypt');
        const user = await this.usersService.getByEmail(email);
        const passwordValid = await bcrypt.compare(password, user.password)
        if (!user) {
            throw new NotAcceptableException('Usuario no encontrado');
        }
        if (user && passwordValid) {
            return user;
        }
        return null
    }
}
