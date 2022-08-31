import { Controller, Get, Post } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AppService } from './app.service';

@ApiTags("porDefecto")
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Post('login')
  login(): any {
    return {
      msg: 'logged in'
    }
  }

  @Get()
  getHello(): string {
    return this.appService.getHello();
  }
}
