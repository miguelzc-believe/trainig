import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable, UnauthorizedException } from '@nestjs/common';

import { AuthService } from './auth.service';
import { UserService } from 'src/user/user.service';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private authService: AuthService, private userService: UserService) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: 'secretKey',
    });
}

async validate(payload: any) {
    console.log(payload)
//   const user = await this.userService.getByEmail(payload.email);
//   if (!user) {
//     throw new UnauthorizedException({
//       message: 'Token Sesion Invalido',
//       status: 401,
//     });
//   }
  return payload;
}
}