import { Controller, Get, Post, UseGuards, Request, Body } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';
import { AuthService } from './auth/auth.service';
import { LocalAuthGuard } from './auth/local.auth.guard';
import { LoginDto } from './user/dto/login.dto';

@ApiTags("porDefecto")
@Controller()
export class AppController {
  // constructor(private readonly appService: AppService) {}
  constructor(private authService: AuthService) {}

  // @Post('login')
  // login(): any {
  //   return {
  //     msg: 'logged in'
  //   }
  // }

  // @Get()
  // getHello(): string {
  //   return this.appService.getHello();
  // }

  @Post('auth/login')
  async login(@Body() data: LoginDto ) {
    return this.authService.login(data);
  }
}
