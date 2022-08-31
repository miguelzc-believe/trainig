import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards, ValidationPipe, Request } from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthenticatedGuard } from 'src/auth/authenticated.guard';
import { LocalAuthGuard } from 'src/auth/local.auth.guard';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';
import { UserService } from './user.service';

@ApiTags("user")
@ApiBearerAuth()
@Controller({version: "1", path: "user"})
export class UserController {
    constructor(private userService: UserService){}

    @Post()
    async createUser(@Body(new ValidationPipe()) data: CreateUserDto) {
        const bcrypt = require('bcrypt');
        const saltOrRounds = 10;
        const hashedPassword = await bcrypt.hash(data.password, saltOrRounds);
        data.password = hashedPassword;
        return this.userService.create(data)
    }

    @Get()
    getUsers() {
        return this.userService.getUsers();
    }

    // @Get(':id')
    // getUser(@Param('id') id: string) {
    //     return this.userService.getUser(+id);
    // }

    @Patch(':id')
    editUser(@Param('id') id: string, @Body(new ValidationPipe()) updateUserDto: UpdateUserDto) {
        return this.userService.editUser(+id, updateUserDto);
    }

    @Delete(':id')
    deleteUser(@Param('id') id: string) {
        return this.userService.deleteUser(+id);
    }

    @UseGuards(LocalAuthGuard)
    @Post('/login')
    login(@Request() req): any {
        return {
            User: req.user,
            msg: 'User logged in'
        };
    }

    // @UseGuards(LocalAuthGuard)
    // @Post('/login')
    // login(@Param('email') email: string, @Param('password') password: string): any {
    //     return {
    //         msg: 'User logged in'
    //     };
    // }

    // Get / protected
    @UseGuards(AuthenticatedGuard)
    @Get('/protected')
    getHello(@Request() req): string {
        return req.user;
    }

    @Get('/logout')
    logout(@Request() req): any {
        req.session.destroy();
        return { msg: 'The user session has ended' }
    }
}
